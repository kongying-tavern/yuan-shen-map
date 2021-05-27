// @ts-nocheck
/*
 * (c) 2021 ZengJia
 * @Author       : (*^_^*)
 * @LastEditTime: 2021-05-27 15:50:38
 * @Description  : Kongying Tavern Genshin Map front-end analytics SDK(RUM)
 */

"use strict";

!(function (n) {
  "use strict";
  function d(n, t) {
    var r = (65535 & n) + (65535 & t);
    return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
  }
  function f(n, t, r, e, o, u) {
    return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r);
    var c, f;
  }
  function l(n, t, r, e, o, u, c) {
    return f((t & r) | (~t & e), n, t, o, u, c);
  }
  function v(n, t, r, e, o, u, c) {
    return f((t & e) | (r & ~e), n, t, o, u, c);
  }
  function g(n, t, r, e, o, u, c) {
    return f(t ^ r ^ e, n, t, o, u, c);
  }
  function m(n, t, r, e, o, u, c) {
    return f(r ^ (t | ~e), n, t, o, u, c);
  }
  function i(n, t) {
    var r, e, o, u;
    (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
    for (
      var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0;
      h < n.length;
      h += 16
    )
      (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
        (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
        (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
        (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
        (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
        (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
        (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
        (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
        (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
        (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
        (i = l(i, a, c, f, n[h + 10], 17, -42063)),
        (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
        (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
        (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
        (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
        (c = v(
          c,
          (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
          i,
          a,
          n[h + 1],
          5,
          -165796510
        )),
        (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
        (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
        (f = v(f, i, a, c, n[h], 20, -373897302)),
        (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
        (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
        (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
        (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
        (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
        (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
        (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
        (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
        (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
        (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
        (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
        (c = g(
          c,
          (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
          i,
          a,
          n[h + 5],
          4,
          -378558
        )),
        (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
        (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
        (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
        (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
        (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
        (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
        (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
        (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
        (a = g(a, c, f, i, n[h], 11, -358537222)),
        (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
        (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
        (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
        (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
        (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
        (c = m(
          c,
          (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
          i,
          a,
          n[h],
          6,
          -198630844
        )),
        (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
        (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
        (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
        (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
        (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
        (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
        (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
        (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
        (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
        (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
        (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
        (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
        (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
        (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
        (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
        (c = d(c, r)),
        (f = d(f, e)),
        (i = d(i, o)),
        (a = d(a, u));
    return [c, f, i, a];
  }
  function a(n) {
    for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8)
      t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
    return t;
  }
  function h(n) {
    var t = [];
    for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1) t[e] = 0;
    for (var r = 8 * n.length, e = 0; e < r; e += 8)
      t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
    return t;
  }
  function e(n) {
    for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1)
      (t = n.charCodeAt(o)), (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
    return e;
  }
  function r(n) {
    return unescape(encodeURIComponent(n));
  }
  function o(n) {
    return a(i(h((t = r(n))), 8 * t.length));
    var t;
  }
  function u(n, t) {
    return (function (n, t) {
      var r,
        e,
        o = h(n),
        u = [],
        c = [];
      for (
        u[15] = c[15] = void 0,
          16 < o.length && (o = i(o, 8 * n.length)),
          r = 0;
        r < 16;
        r += 1
      )
        (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
      return (
        (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
      );
    })(r(n), r(t));
  }
  function t(n, t, r) {
    return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
  }
  "function" == typeof define && define.amd
    ? define(function () {
        return t;
      })
    : "object" == typeof module && module.exports
    ? (module.exports = t)
    : (n.md5 = t);
})(this);

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

;(function () {
  window.wees = {};
  Object.defineProperty(window, "wees", {
    value: {
      NAMESPACE: `${(
        window.location.pathname.substring(1) || "index.html"
      ).toLocaleUpperCase()}@ERRORLOG`,
      DACTYLOGRAM_NAMESPACE: "DACTYLOGRAM",
      SDK_VERSION: `1.0.2_Beta`,
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });

  function storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  // Core Functions
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
    performance.onresourcetimingbufferfull = this.buffer_full;
    this.timing();
    this.memory();
    this.navigator();
    saveItem("experience", {
      type: "assets",
      data: window.performance.getEntries(), // 资源加载数据
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
    const p = window.performance.getEntries();
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

  function injectDactylogram(hash, rawData) {
    if (!hash || hash === "") return false;
    let result;
    onload(function () {
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.src = rawData;
      img.style.display = "none";
      p.innerText = hash;
      p.style =
        "cursor: grab;z-index: 99999;position:fixed;bottom: 8%;left: 5%;color: #fff;font-size:14px;opacity: .015;letter-spacing: 1.2px;font-weight:bold;font-family:sans-serif;background-color:#ff1f1f;user-select: none;";
      p.id = "browser-dactylogram";
      p.dir = "ltr";
      p.setAttribute("itemprop", "browser-dactylogram");
      p.setAttribute("aria-hidden", "true");
      document.body.appendChild(p);
      document.body.appendChild(img);
      result = {
        img,
        p,
      };
    });
    return result;
  }

  function throttle(callback, wait) {
    let previous = 0,
      timer = null;
    return function (...params) {
      let now = +Date.now(),
        remaining = wait - (now - previous);
      if (remaining <= 0) {
        clearTimeout(timer);
        timer = null;
        previous = now;
        callback.call(this, ...params);
      } else if (!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          previous = +new Date();
          callback.call(this, ...params);
        }, remaining);
      }
    };
  }

  function blackScreen(
    filtrationElement,
    emptyPointsCount,
    blankPointThreshold
  ) {
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

  /**
   * @description: 是否在游戏类平台 (不知道有没有用
   * @param {*}
   * @return {boolean}
   */
  function inGame() {
    const ua = navigator.userAgent.toLowerCase();
    if (
      (["15d60", "msdk", "16A366", "tiem", "ingame"].some((val) =>
        ua.includes(val)
      ) ||
        "undefined" != typeof pandora) &&
      ua.indexOf("gamehelper") == -1
    )
      return true;
    return false;
  }

  function exportJSON(data, filename, retract) {
    if (!data) throw new TypeError("The data cannot be empty!");
    if (!filename) filename = "download.json";
    if (!retract) retract = 2;
    const a = document.createElement("a");
    a.download = filename;
    a.style.display = "none";
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, retract)], { type: "text/json" })
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return filename;
  }

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
          } else if (
            element.className &&
            typeof element.className === "string"
          ) {
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
    ["click", "touchstart", "mousedown", "keydown", "mouseover"].forEach((eventType) => {
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
      for (
        var e = document.cookie.split(";"), b = 0, c = e.length;
        b < c;
        b++
      ) {
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

  function saveItem(key, value, level) {
    // 每次存入时检查, 距离上一次存超过三十分钟就删除
    deleteOverdueItem(1000 * 60 * 30);
    let storage = window.localStorage.getItem(wees.NAMESPACE);
    const LEVEL_MAP = ["S", "A", "C", "D", "E", "F"];
    if (!storage) {
      storage = {
        [key]: [],
      };
    } else {
      storage = JSON.parse(storage);
      storage = storage.storage;
      if (!storage[key]) storage[key] = [];
    }
    if (level == void 0) level = "C0";
    if (!LEVEL_MAP.includes(level.substring(0, 1)))
      throw new TypeError(
        `The value of level must be ${LEVEL_MAP.toString()} One of the`
      );
    storage[key].push({
      id: goodid(8),
      level: level,
      href: window.location.href,
      title: document.title,
      data: {
        ...filtration(value),
      },
      UTC: new Date().toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "UTC",
      }),
    });
    window.localStorage.setItem(
      wees.NAMESPACE,
      JSON.stringify({
        storage,
        dataLastUpdatedTime: new Date(),
      })
    );
  }

  function deleteOverdueItem(expirationDate) {
    if (expirationDate == void 0) expirationDate = 1000 * 60 * 30;
    for (let i = 0; i < localStorage.length; i++) {
      if (!localStorage.key(i).toLocaleUpperCase().includes("ERRORLOG"))
        continue;
      const name = localStorage.key(i);
      const { dataLastUpdatedTime } = JSON.parse(localStorage.getItem(name));
      const date = new Date(
        dataLastUpdatedTime == void 0
          ? new Date(1970, 1, 1)
          : dataLastUpdatedTime
      );
      if (
        Math.floor(new Date(new Date().getTime() - date.getTime())) >=
        expirationDate
      ) {
        window.localStorage.removeItem(name);
        console.log(
          `delete errorlog succeed\nlastSavedDate: ${date.toLocaleString()}\nname: ${name}`
        );
      }
    }
  }

  function exportData(name) {
    if (!name) name = wees.NAMESPACE;
    let data = localStorage.getItem(name);
    const { hash, rawData } = JSON.parse(
      window.localStorage.getItem(wees.DACTYLOGRAM_NAMESPACE)
    );
    if (data == null) return false;
    data = JSON.parse(data);
    console.log(data);
    return {
      ...data,
      sdk_version: wees.SDK_VERSION,
      downloadDate: new Date().toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "UTC",
      }),
      browserData: {
        hash: hash,
        rawData: rawData,
        userAgent: window.navigator.userAgent,
      },
      pageData: {
        href: window.location.href,
        title: document.title,
        inIframe: self != top,
        cookie: navigator.cookieEnabled,
      },
      screenData: {
        ...getScreenInfo(),
      },
    };
  }

  function downloadAllItem() {
    for (let i = 0; i < localStorage.length; i++) {
      if (!localStorage.key(i).toLocaleUpperCase().includes("@ERRORLOG"))
        continue;
      const data = exportData(localStorage.key(i));
      if (!data) continue;
      exportJSON(data, localStorage.key(i) + ".json", 2);
    }
  }

  function downloadItem(name, filename, retract) {
    if (!name) name = wees.NAMESPACE;
    if (!filename) filename = name;
    if (!retract) retract = 2;
    const data = exportData(name);
    console.log(name, data);
    if (!data) return false;
    return exportJSON(data, filename + ".json", retract);
  }

  const getWebglCanvas = function () {
    var canvas = document.createElement("canvas");
    var gl = null;
    try {
      gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
      /* squelch */
    }
    if (!gl) {
      gl = null;
    }
    return gl;
  };

  function webGLDactylogram() {
    var gl;
    var fa2s = function (fa) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      return "[" + fa[0] + ", " + fa[1] + "]";
    };
    var maxAnisotropy = function (gl) {
      var ext =
        gl.getExtension("EXT_texture_filter_anisotropic") ||
        gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
        gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
      if (ext) {
        var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        if (anisotropy === 0) {
          anisotropy = 2;
        }
        return anisotropy;
      } else {
        return null;
      }
    };

    gl = getWebglCanvas();
    if (!gl) {
      return null;
    }
    // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
    // First it draws a gradient object with shaders and convers the image to the Base64 string.
    // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
    // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
    var result = [];
    var vShaderTemplate =
      "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
    var fShaderTemplate =
      "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    var vertices = new Float32Array([
      -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    vertexPosBuffer.itemSize = 3;
    vertexPosBuffer.numItems = 3;
    var program = gl.createProgram();
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vShaderTemplate);
    gl.compileShader(vshader);
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fShaderTemplate);
    gl.compileShader(fshader);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
    program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
    gl.enableVertexAttribArray(program.vertexPosArray);
    gl.vertexAttribPointer(
      program.vertexPosAttrib,
      vertexPosBuffer.itemSize,
      gl.FLOAT,
      !1,
      0,
      0
    );
    gl.uniform2f(program.offsetUniform, 1, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
    try {
      result.push(gl.canvas.toDataURL());
    } catch (e) {
      /* .toDataURL may be absent or broken (blocked by extension) */
    }

    return {
      hash: md5(result[0]),
      rawData: result[0],
    };
  }

  function getScreenInfo() {
    let innerW = document.documentElement.clientWidth,
      innerH = document.documentElement.clientHeight,
      sreenW = window.screen.width,
      sreenH = window.screen.height,
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
      availPatio: `${window.screen.availWidth} * ${window.screen.availHeight}`, // 可用分辨率
      colorDepth:
        typeof screen.colorDepth !== "undefined"
          ? `${screen.colorDepth}`
          : null, //目标设备或缓冲器上的调色板的比特深度
      pixelDepth:
        typeof screen.pixelDepth !== "undefined"
          ? `${screen.pixelDepth}`
          : null, //显示屏幕的颜色分辨率（比特每像素）
      state: `${getOrientationState() || null}`, //屏幕横竖状态
    });
  }

  function getOrientationState() {
    let orientationStatus;
    if (window.matchMedia("(orientation: portrait)")) {
      return (orientationStatus = "vertical");
    }
    return (orientationStatus = "cross");
  }

  function log(title, description, data) {
    const myTitle = title || "原神地图";
    const myDescription = description || "";
    const myData = data || [];

    console.group(
      `%c${myTitle}${myDescription === "" ? "" : "%c" + myDescription}`,
      "background:#35495e; padding: 2px 4px; border-radius: 3px 0 0 3px; color: #fff;font-family: sans-serif;",
      "background:#41b883 ; padding: 2px 4px; border-radius: 0 3px 3px 0;  color: #fff; font-family: sans-serif;"
    );

    myData.forEach((val) => {
      for (const prop in val) {
        if (val.hasOwnProperty(prop)) {
          console.log(
            `%c${prop}${"\u0020".repeat(18 - prop.length)}: %c${val[prop]}`,
            "font-size:13px;",
            "font-size:13px;color: #45B744;"
          );
        }
      }
    });
    console.groupEnd();
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

  function core() {
    if (!storageAvailable("localStorage")) {
      return console.warn("Too bad, no localStorage for us");
    }
    if (localStorage.getItem(wees.DACTYLOGRAM_NAMESPACE) == null) {
      const data = webGLDactylogram();
      localStorage.setItem(wees.DACTYLOGRAM_NAMESPACE, JSON.stringify(data));
    }
    let { hash, rawData } = JSON.parse(
      localStorage.getItem(wees.DACTYLOGRAM_NAMESPACE)
    );
    if (localStorage.getItem("user"))
      hash = `${hash}^${JSON.parse(localStorage.getItem("user")).id}`;
    injectDactylogram(hash, rawData);
    injecJsError(); // 捕获Js错误包含promise
    injectFetch(); // 捕获Fetch错误
    injectXhr(); // 捕获Ajax错误
    blackScreen(); // 捕获白屏错误
    injectNetWork(); // 捕获网络连接状态
    injectConsole("error", "warn", "assert", "info"); // 捕获console的值
    new MyPerformance(); // 性能指标
    log("原神地图", "analytics", [
      {
        version: wees.SDK_VERSION,
        namespace: wees.NAMESPACE,
        browserHash: hash,
      },
    ]);
  }
  core();

  window.wees.exportData = exportData;
  window.wees.downloadItem = downloadItem;
  window.wees.downloadAllItem = downloadAllItem;
})();