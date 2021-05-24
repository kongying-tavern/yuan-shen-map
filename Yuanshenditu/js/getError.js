// @ts-nocheck
/*
 * @Author       : (*^_^*)
 * @LastEditTime: 2021-05-24 22:14:08
 * @Description  : Kongying Tavern Genshin Map front-end analytics SDK(RUM)
 */

"use strict";
const NAMESPACE = `${(
  window.location.pathname.substring(1) || "index.html"
).toLocaleUpperCase()}@ERRORLLOG`;
const SDK_VERSION = `1.0.1_Beta`;

function injecJsError() {
  window.addEventListener(
    "error",
    function (event) {
      let lastEvent = getLastEvent();
      if (event.target && (event.target.src || event.target.href)) {
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        const { downlink, effectiveType, rtt } = connection;
        saveItem("stability", {
          type: "resourceError",
          message: event.message,
          filename: event.target.src || event.target.href,
          tagNmae: event.target.tagName,
          isTrusted: event.isTrusted,
          selector: getSelector(event.path || event.target),
          timeStamp: event.timeStamp,
          deepPath: event.deepPath,
          eventPhase: event.eventPhase,
          effectiveType,
          downlink,
          rtt,
        });
      } else {
        saveItem("stability", {
          type: "JsError",
          message: event.message,
          filename: event.filename,
          position: `${event.lineno || 0}:${event.colno || 0}`,
          state: getLines(event.error.stack),
          name: event.error.name,
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : null,
        });
      }
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      let lastEvent = getLastEvent();
      let message;
      let filename;
      let line = 0;
      let column = 0;
      let stack = "";
      if (typeof event.reason === "string") {
        message = event.reason;
      } else if (typeof event.reason === "object") {
        message = event.reason.message;
      }
      let reason = event.reason;
      if (typeof reason === "object") {
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = getLines(reason.stack);
      }
      saveItem("stability", {
        type: "promiseError",
        message,
        filename,
        stack,
        position: `${line}:${column}`,
        selector: lastEvent
          ? getSelector(lastEvent.path || lastEvent.target)
          : null,
      });
    },
    true
  );
}

function injectConsole(...value) {
  value.forEach((val) => {
    const consoleError = window.console[val];
    window.console[val] = function (...args) {
      saveItem("stability", {
        type: `Console${firstUpperCase(val)}`,
        ...args,
      });
      consoleError && consoleError.apply(window, arguments);
    };
  });
}

function injectXhr() {
  let XMLHttpRequset = window.XMLHttpRequest;
  let oldSend = XMLHttpRequset.prototype.send;
  XMLHttpRequset.prototype.send = function (body) {
    if (this.logData) {
      let startTime;
      startTime = Date.now();
      let handler = (type) => (event) => {
        let duration = Date.now() - startTime;
        let status = this.status;
        let stateText = this.statusText;
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        const { downlink, effectiveType, rtt } = connection;
        saveItem("stability", {
          type: "xhrError",
          eventType: type,
          pathname: this.logData.url,
          status: status + "-" + stateText,
          duration,
          pesponse: this.response
            ? `${JSON.stringify(this.response)}`.length >= 99
              ? JSON.stringify(this.response).substr(0, 99) + "..."
              : JSON.stringify(this.response)
            : "",
          params: body || "",
          downlink,
          effectiveType,
          rtt,
        });
      };
      this.addEventListener("load", handler("load"), false);
      this.addEventListener("error", handler("error"), false);
      this.addEventListener("abort", handler("abort"), false);
    }
    return oldSend.apply(this, arguments);
  };
}

function injectFetch() {
  if (!window.fetch) return;
  let _oldFetch = window.fetch;
  window.fetch = function () {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const { downlink, effectiveType, rtt } = connection;
    return _oldFetch
      .apply(this, arguments)
      .then((res) => {
        if (!res.ok) {
          saveItem("stability", {
            type: "fetchStateError",
            url: res.url,
            requestType: res.type,
            redirected: res.redirected,
            status: res.status,
            text: res.statusText,
            downlink,
            effectiveType,
            rtt,
          });
        }
        return res;
      })
      .catch((error) => {
        console.dir(error);
        saveItem("stability", {
          type: "fetchError",
          message: error.message,
          position: `${error.lineno || 0}:${error.colno || 0}`,
          state: getLines(error.stack),
          name: error.name,
          downlink,
          effectiveType,
          rtt,
        });
        throw error;
      });
  };
}

function injectNetWork() {
  if (typeof window.navigator.onLine === "undefined") return;
  window.addEventListener(
    "offline",
    function (e) {
      saveItem("stability", {
        type: "netWork",
        isOnline: false,
        timeStamp: e.timeStamp,
      });
    },
    false
  );

  window.addEventListener(
    "online",
    function (e) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      const {
        downlink,
        downlinkMax,
        effectiveType,
        onchange,
        ontypechange,
        rtt,
        saveData,
        type,
      } = connection;
      saveItem("stability", {
        type: "netWork",
        isOnline: true,
        timeStamp: e.timeStamp,
        netWorktype: type,
        downlink,
        downlinkMax,
        effectiveType,
        onchange,
        ontypechange,
        rtt,
        saveData,
      });
    },
    false
  );
}

// 以下构造函数为性能数据指标收集类, 以下注释为相关参数解释
// @LastEditTime: 2021/5/24
// [FP  First Paint(首次绘制)]	                  => 包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻
// [FCP	First Content Paint(首次内容绘制)]        =>	是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG等,这其实就是白屏时间
// [FMP	First Meaningful Paint(首次有意义绘制)]   =>	页面有意义的内容渲染的时间
// [LCP	Largest Contentful Paint)(最大内容渲染)]  =>	代表在viewport中最大的页面元素加载的时间
// [DCL	DomContentLoaded)(DOM加载完成)]          =>	当 HTML 文档被完全加载和解析完成之后,DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载
// [L	(onLoad)]                                 =>	当依赖的资源全部加载完毕之后才会触发
// [TTI	(Time to Interactive)]                  => 可交互时间	用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点
// [FID	First Input Delay(首次输入延迟)]         =>	用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间
// [TTFB time to first byte(首字节时间)]         =>	是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间
// [LT (longTask)]                              => 为超过100ms的长任务
// navigationStart	        初始化页面，在同一个浏览器上下文中前一个页面unload的时间戳，如果没有前一个页面的unload,则与fetchStart值相等
// redirectStart	          第一个HTTP重定向发生的时间,有跳转且是同域的重定向,否则为0
// redirectEnd	            最后一个重定向完成时的时间,否则为0
// fetchStart	              浏览器准备好使用http请求获取文档的时间,这发生在检查缓存之前
// domainLookupStart        DNS域名开始查询的时间,如果有本地的缓存或keep-alive则时间为0
// domainLookupEnd	        DNS域名结束查询的时间
// connectStart	            TCP开始建立连接的时间,如果是持久连接,则与fetchStart值相等
// secureConnectionStart	  https 连接开始的时间,如果不是安全连接则为0
// connectEnd	              TCP完成握手的时间，如果是持久连接则与fetchStart值相等
// requestStart	            HTTP请求读取真实文档开始的时间,包括从本地缓存读取
// requestEnd	              HTTP请求读取真实文档结束的时间,包括从本地缓存读取
// responseStart	          返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳
// responseEnd	            返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳
// unloadEventStart	        前一个页面的unload的时间戳 如果没有则为0
// unloadEventEnd	          与unloadEventStart相对应，返回的是unload函数执行完成的时间戳
// domLoading	               返回当前网页DOM结构开始解析时的时间戳,此时document.readyState变成loading,并将抛出readyStateChange事件
// domInteractive	          返回当前网页DOM结构结束解析、开始加载内嵌资源时时间戳,document.readyState 变成interactive，并将抛出readyStateChange事件(注意只是DOM树解析完成,这时候并没有开始加载网页内的资源)
// domContentLoadedEventStart网页domContentLoaded事件发生的时间
// domContentLoadedEventEnd	网页domContentLoaded事件脚本执行完毕的时间,domReady的时间
// domComplete	            DOM树解析完成,且资源也准备就绪的时间,document.readyState变成complete.并将抛出readystatechange事件
// loadEventStart	          load事件发送给文档，也即load回调函数开始执行的时间
// loadEventEnd	            load回调函数执行完成的时间
function MyPerformance() {
  if (!window.performance)
    return console.error("Browsers do not support performance!");
  if (!window.performance.memory)
    console.warn("Browsers do not support performance.memory!");
  if (!window.requestIdleCallback)
    console.warn("Browsers do not support requestIdleCallback!");
  if (!window.performance.clearMarks)
    console.warn("Browsers do not support performance.clearMarks!");
  if (!window.performance.clearMeasures)
    console.warn("Browsers do not support performance.clearMeasures!");
  this.performance = window.performance;
  this.performanceGetEntries = window.performance.getEntries();
  performance.onresourcetimingbufferfull = this.buffer_full;
  this.timing();
  this.memory();
  this.navigator();
  saveItem("experience", {
    type: "assets",
    data: this.performanceGetEntries, // 资源加载数据
  });
}

MyPerformance.prototype.buffer_full = function () {
  console.warn("Resource Timing Buffer is FULL!");
  performance.setResourceTimingBufferSize(200);
};

MyPerformance.prototype.memory = function () {
  const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } =
    performance.memory;
  saveItem("experience", {
    type: "memory",
    jsHeapSizeLimit,
    totalJSHeapSize,
    usedJSHeapSize,
  });
};

MyPerformance.prototype.timing = function () {
  let FMP, LCP;
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect();
  }).observe({ entryTypes: ["element"] });

  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries();
    const lastEntry = perfEntries[perfEntries.length - 1];
    LCP = lastEntry;
    observer.disconnect();
  }).observe({ entryTypes: ["largest-contentful-paint"] });

  new PerformanceObserver(function (entryList, observer) {
    let lastEvent = getLastEvent();
    const firstInput = entryList.getEntries()[0];
    if (firstInput) {
      let inputDelay = firstInput.processingStart - firstInput.startTime; //处理延迟
      let duration = firstInput.duration; //处理耗时
      if (firstInput > 0 || duration > 0) {
        saveItem("experience", {
          type: "firstInputDelay",
          inputDelay: inputDelay ? formatTime(inputDelay) : 0,
          duration: duration ? formatTime(duration) : 0,
          startTime: firstInput.startTime,
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : "",
        });
      }
    }
    observer.disconnect();
  }).observe({ type: "first-input", buffered: true });

  onload(() => {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domainLookupStart,
        domainLookupEnd,
        unloadEventStart,
        unloadEventEnd,
        redirectEnd,
        redirectStart,
        secureConnectionStart,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = performance.timing;
      saveItem("experience", {
        type: "timing",
        unloadTime: unloadEventEnd - unloadEventStart, // 前一个页面卸载耗时
        redirectTime: redirectEnd - redirectStart, // 重定向耗时
        connectTime: connectEnd - connectStart, //TCP连接耗时
        sslTime: connectEnd - secureConnectionStart, // 	SSL 安全连接耗时
        dnsTime: domainLookupEnd - domainLookupStart, // DNS 解析耗时
        appCache: domainLookupStart - fetchStart, // 读取缓存的时间
        domAnalysisTime: domInteractive - responseEnd, // dom解析耗时
        ttfbTime: responseStart - requestStart, // Time to First Byte(TTFB)网络请求耗时
        firstRenderTime: responseEnd - fetchStart, // 首次渲染耗时
        responseTime: responseEnd - responseStart, //Response响应耗时
        parseDOMTime: loadEventStart - domLoading, //DOM解析渲染耗时
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart, //DOMContentLoaded事件回调耗时
        timeToInteractive: domInteractive - fetchStart, //首次可交互时间
        loadTime: loadEventStart - fetchStart, //完整的加载时间
        jsLoadTime: this.jsLoadTime(), // js加载时间
        timeOrigin: window.performance.timeOrigin,
      });
      const FP = performance.getEntriesByName("first-paint")[0];
      const FCP = performance.getEntriesByName("first-contentful-paint")[0];

      saveItem("experience", {
        type: "paint",
        firstPaint: FP ? formatTime(FP.startTime) : 0,
        firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
        firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
        largestContentfulPaint: LCP
          ? formatTime(LCP.renderTime || LCP.loadTime)
          : 0,
      });
    }, 3000);
  });
};

MyPerformance.prototype.navigator = function () {
  if (!window.performance.navigator) return;
  const { type, redirectCount } = window.performance.navigator;
  saveItem("experience", {
    type: "navigator",
    navigatorType: type,
    redirectCount,
  });
};

MyPerformance.prototype.jsLoadTime = function () {
  const p = this.performanceGetEntries;
  let cssR = p.filter((ele) => ele.initiatorType === "script");
  return (
    Math.max(...cssR.map((ele) => ele.responseEnd)) -
    Math.min(...cssR.map((ele) => ele.startTime))
  );
};

MyPerformance.prototype.longTask = function () {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent();
        requestIdleCallback(() => {
          saveItem("experience", {
            type: "longTask",
            eventType: lastEvent.type,
            startTime: formatTime(entry.startTime), // 开始时间
            duration: formatTime(entry.duration), // 持续时间
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : "",
          });
        });
      }
    });
  }).observe({
    entryTypes: ["longtask"],
  });
};

function blackScreen(filtrationElement, emptyPointsCount, blankPointThreshold) {
  const wrapperElements = filtrationElement || ["html", "body"]; //过滤元素数组
  const myBlankPointThreshold = blankPointThreshold || 16;
  let myEmptyPointsCount = emptyPointsCount || 9;
  if (myBlankPointThreshold >= myEmptyPointsCount * 2)
    throw new TypeError(
      "BlankPointThreshold cannot be greater than twice the emptyPointsCount"
    );
  let emptyPoints = 0;

  function isWrapper(element) {
    let selector = getSelector(element);
    if (wrapperElements.includes(selector)) emptyPoints++;
  }
  onload(function () {
    let yElements, xElements;
    for (let i = 1; i <= myEmptyPointsCount - 1; i++) {
      //以网页中心做轴获取X轴和Y轴十个点,判断是否是空白点
      xElements = document.elementFromPoint(
        (window.innerWidth * i) / myEmptyPointsCount,
        window.innerHeight / 2
      );
      yElements = document.elementFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / myEmptyPointsCount
      );
      isWrapper(xElements);
      isWrapper(yElements);
    }
    if (emptyPoints >= myBlankPointThreshold) {
      //空白点阀值
      let centerElements = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      saveItem("stability", {
        type: "blackScreen",
        emptyPoints,
        selector: getSelector(centerElements[0]),
        ...getScreenInfo(),
      });
    }
  });
}

// Utils Function

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.goodid = factory());
})(this, function () {
  "use strict";
  var defaultAlphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var defaultStartTime = new Date(2018, 9, 1).getTime();
  var defaultLength = 16;
  var defaultPrefix = "";

  function genRandom(length, alphabet) {
    alphabet = alphabet || defaultAlphabet;
    length = length || 1;
    var id = "";
    while (length-- > 0) {
      id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id;
  }

  function genTimestamp() {
    var timeArr = Math.round((Date.now() - defaultStartTime) / 1000)
      .toString(36)
      .split("");
    var count = 3;
    var index = 0;
    while (count-- > 0) {
      index = (Math.random() * timeArr.length) | 0;
      timeArr[index] = timeArr[index].toUpperCase();
    }
    return timeArr.join("");
  }

  function goodid(length, prefix, alphabet) {
    length = length || defaultLength;
    prefix = prefix || defaultPrefix;
    if (length <= prefix.length)
      throw new Error(
        "The length parameter cannot be less than the length of the prefix."
      );
    var time = genTimestamp();
    if (length < 16 || alphabet) {
      return [prefix, genRandom(length - prefix.length, alphabet)].join("");
    } else {
      return [
        prefix,
        time,
        genRandom(length - prefix.length - time.length),
      ].join("");
    }
  }
  goodid.defaults = {
    length: defaultLength,
    prefix: defaultPrefix,
    alphabet: defaultAlphabet,
    startTime: defaultStartTime,
  };
  goodid.config = function (options) {
    options = options || goodid.defaults;
    defaultLength = options.length || defaultLength;
    defaultPrefix = options.prefix || defaultPrefix;
    defaultAlphabet = options.alphabet || defaultAlphabet;
    defaultStartTime = options.startTime || defaultStartTime;
  };
  goodid.create = function () {
    return goodid.apply(this, arguments);
  };
  return goodid;
});

function getSelector(pathsOrTarget) {
  const getMySelector = function (path) {
    return path
      .reverse()
      .filter(function (element) {
        return element !== window && element !== document;
      })
      .map(function (element) {
        var selector;
        if (element.id) {
          selector = `#${element.id}`;
        } else if (element.className && typeof element.className === "string") {
          selector =
            "." +
            element.className
              .split(" ")
              .filter(function (item) {
                return !!item;
              })
              .join(".");
        } else {
          selector = element.nodeName;
        }
        return selector;
      })
      .join(" ");
  };

  if (Array.isArray(pathsOrTarget)) {
    return getMySelector(pathsOrTarget);
  } else {
    var paths = [];
    var element = pathsOrTarget;
    while (element) {
      paths.push(element);
      element = element.parentNode;
    }
    return getMySelector(paths);
  }
}

function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

function formatTime(time) {
  return `${time}`.split(".")[0];
}

function getLastEvent() {
  let lastEvent = "";
  const str = ["click", "touchstart", "mousedown", "keydown", "mouseover"];
  str.forEach((eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event;
      },
      {
        capture: true,
        passive: true,
      }
    );
  });
  return lastEvent;
}

function getSession(a) {
  if (window.sessionStorage) return sessionStorage.getItem(a);
  else {
    a += "=";
    for (var e = document.cookie.split(";"), b = 0, c = e.length; b < c; b++) {
      for (var d = e[b]; " " == d.charAt(0); ) d = d.substring(1, d.length);
      if (0 == d.indexOf(a)) return unescape(d.substring(a.length, d.length));
    }
    return !1;
  }
}

function getLines(stack) {
  if (!stack) return "";
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("^");
}

function getParameterByName(name) {
  name = name.toLowerCase().replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regexS = "[\\?&]" + name + "=([^&#]*)";
  let regex = new RegExp(regexS);
  let results = regex.exec(window.location.search.toLowerCase());
  if (results == null) return "";
  else return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function onload(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}

function saveItem(key, value) {
  let storage = window.localStorage.getItem(NAMESPACE);
  if (!storage) {
    storage = {
      [key]: [],
    };
  } else {
    storage = JSON.parse(storage);
    const date = new Date(storage.date);
    storage = storage.storage;
    if (!storage[key]) storage[key] = [];
    const timeDifference = Math.floor(
      new Date(new Date().getTime() - date.getTime())
    );
    // 每次存入时检查, 距离上一次存超过三十分钟就删除
    if (timeDifference >= 1000 * 60 * 30) {
      window.localStorage.removeItem(NAMESPACE);
      console.log(
        `delete errorlog succeed\nlastSavedDate: ${date.toLocaleString()}`
      );
    }
  }
  storage[key].push({
    id: goodid(8),
    data: {
      ...filtration(value),
    },
    date: new Date().toLocaleString("zh-CN", {
      hour12: false,
      timeZone: "UTC",
    }),
  });
  window.localStorage.setItem(
    NAMESPACE,
    JSON.stringify({
      storage,
      date: new Date(),
    })
  );
}

function getScreenInfo() {
  let innerW = document.documentElement.clientWidth,
    innerH = document.documentElement.clientHeight,
    sreenW = window.screen.width,
    sreenH = window.screen.height;
  ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  if (isMobile()) {
    let tempW1 = window.screen.width,
      tempW2 = innerW,
      tempH1 = window.screen.height,
      sreenW = "",
      sreenH = "";
    if (Math.max(tempW1, tempH1) == tempW2) {
      (sreenW = tempW1), (sreenH = tempH1);
    } else {
      sreenH = (innerW / tempW1) * tempH1;
      sreenW = tempW2;
    }
    if (sreenW > sreenH) {
      let t1 = sreenH;
      sreenH = sreenW;
      sreenW = t1;
    }
    if (innerW > innerH) {
      let t2 = innerH;
      innerH = innerW;
      innerW = t2;
    }
  } else {
    (sreenW = window.screen.width), (sreenH = window.screen.height);
  }
  return filtration({
    pixelRatio: `${parseInt(sreenW * ratio)}*${parseInt(sreenH * ratio)}`, //物理分辨率
    viewPixelRatio: `${parseInt(innerW * ratio)}*${parseInt(innerH * ratio)}`, //逻辑分辨率
    colorDepth:
      typeof screen.colorDepth !== "undefined" ? `${screen.colorDepth}` : null, //目标设备或缓冲器上的调色板的比特深度
    pixelDepth:
      typeof screen.pixelDepth !== "undefined" ? `${screen.pixelDepth}` : null, //显示屏幕的颜色分辨率（比特每像素）
    state: `${getOrientationState() || null}`, //屏幕横竖状态
  });
}

function getOrientationState() {
  if (window.matchMedia("(orientation: portrait)")) {
    return (orientationStatus = "vertical");
  }
  return (orientationStatus = "cross");
}

function isMobile() {
  const info = navigator.userAgent;
  const agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPod",
    "iPad",
  ];
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true;
  }
  return false;
}

function filtration(object) {
  for (const item in object)
    if (typeof object[item] === "undefined" || object[item] === null)
      delete object[item];
  return object;
}

injecJsError(); // 捕获Js错误
injectFetch(); // 捕获Fetch错误
injectXhr(); // 捕获Ajax错误
blackScreen(); // 捕获白屏错误
injectNetWork(); // 捕获网络连接状态
injectConsole("error", "warn", "assert", "info"); // 捕获console的值
new MyPerformance(); // 性能指标
