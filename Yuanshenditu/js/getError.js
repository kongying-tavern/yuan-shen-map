/*
 * @Author       : (*^_^*)
 * @LastEditTime : 2021-05-21 6:49 PM
 * @Description  : SaveErrorLog
 */

  "use strict";
  const NAMESPACE = `${window.location.pathname.substring(1).toLocaleUpperCase()}@ERRORLLOG`;
  
  injecJsError(); // 捕获Js错误
  injectFetch();  // 捕获Fetch错误
  injectXhr();    // 捕获Ajax错误
  blackScreen();  // 捕获白屏错误

  function core() {

  }

  function injecJsError() {
    window.addEventListener("error", function (event) {
      let lastEvent = getLastEvent();
      if (event.target && (event.target.src || event.target.href)) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const {
          downlink,
          effectiveType,
          rtt,
        } = connection;
        saveItem({
          type: "resourceError",
          message: event.message,
          filters: event.target.src || event.target.href,
          tagNmae: event.target.tagName,
          selector: getSelector(event.target),
          effectiveType,
          downlink,
          rtt,
        });
      } else {
        saveItem({
          type: "JsError",
          message: event.message,
          filters: event.filename,
          position: `${event.lineno}:${event.colno}`,
          state: getLines(event.error.stack),
          name: event.error.name,
          selector: lastEvent ? getSelector(lastEvent.path) : ""
        });
      }
    }, true);

    window.addEventListener("unhandledrejection", (event) => {
      let lastEvent = getLastEvent();
      let message;
      let filename;
      let line = 0;
      let column = 0;
      let stack = "";
      let reason = event.reason;
      if (typeof reason === "string") {
        message = reason;
      } else if (typeof reason === "object") {
        message = reason.message;
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        stack = getLines(reason.stack);
      }
      saveItem({
        type: "PromiseError",
        message,
        filename,
        stack,
        position: `${ line}:${column}`,
        stack: getLines(event.error.stack),
        selector: lastEvent ? getSelector(lastEvent.path) : ""
      })
    }, true);
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
          const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const {
            downlink,
            effectiveType,
            rtt,
          } = connection;
          saveItem({
            type: "xhrError",
            eventType: type,
            pathname: this.logData.url,
            status: status + "-" + stateText,
            duration,
            pesponse: this.response ? `${JSON.stringify(this.response)}`.length >= 99 ? JSON.stringify(this.response).substr(0, 99) + "..." : JSON.stringify(this.response) : "",
            params: body || "",
            downlink,
            effectiveType,
            rtt,
          })
        }
        this.addEventListener("load", handler("load"), false);
        this.addEventListener("error", handler("error"), false);
        this.addEventListener("abort", handler("abort"), false);
      }
      return oldSend.apply(this, arguments);
    }
  }

  function injectFetch() {
    if (!window.fetch) return;
    let _oldFetch = window.fetch;
    window.fetch = function () {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const {
        downlink,
        effectiveType,
        rtt,
      } = connection;
      return _oldFetch.apply(this, arguments)
        .then(res => {
          if (!res.ok) { 
            saveItem({
              type: "fetchStateError",
              url: res.url,
              redirected: res.redirect,
              requestType: res.type,
              status: res.status,
              text: res.statusText,
              downlink,
              effectiveType,
              rtt,
            });
          }
          return res;
        })
        .catch(error => {
          saveItem({
            type: "fetchError",
            url: res.url,
            requestType: res.type,
            redirected: res.redirect,
            status: res.status,
            text: res.statusText,
            downlink,
            effectiveType,
            rtt,
          });
          throw error;
        })
    }
  }

  function blackScreen(filtrationElement, emptyPointsCount, blankPointThreshold) {
    const wrapperElements = filtrationElement || ["html", "body"]; //过滤元素数组
    const myBlankPointThreshold = blankPointThreshold || 16;
    let myEmptyPointsCount = emptyPointsCount || 9;
    if (myBlankPointThreshold >= myEmptyPointsCount * 2) throw new TypeError("BlankPointThreshold cannot be greater than twice the emptyPointsCount");
    let emptyPoints = 0;

    function isWrapper(element) {
      let selector = getSelector(element);
      if (wrapperElements.includes(selector)) emptyPoints++;
    }
    onload(function () {
      let yElements, xElements;
      for (let i = 1; i <= myEmptyPointsCount - 1; i++) { //以网页中心做轴获取X轴和Y轴十个点,判断是否是空白点
        xElements = document.elementFromPoint(
          window.innerWidth * i / myEmptyPointsCount, window.innerHeight / 2);
        yElements = document.elementFromPoint(
          window.innerWidth / 2, window.innerHeight * i / myEmptyPointsCount);
        isWrapper(xElements);
        isWrapper(yElements);
      }
      if (emptyPoints >= myBlankPointThreshold) { //空白点阀值
        let centerElements = document.elementFromPoint(
          window.innerWidth / 2, window.innerHeight / 2
        );
        saveItem({
          type: "blackScreen",
          emptyPoints,
          selector: getSelector(centerElements[0]),
          ...getScreenInfo()
        })
      }
    })
  }
  // Utils Function

  function getSelector(element) {
    let selector;
    if (typeof element === "undefined") return "unknown";
    if (typeof element.id !== "undefined" && element.id !== "") {
      selector = `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
      selector = '.' + element.className.split(' ').filter(function (item) {
        return !!item
      }).join('.');
    } else {
      selector = element.nodeName.toLowerCase();
    }
    return selector;
  }

  function getLastEvent() {
    let lastEvent = "";
    const str = ["click", "touchstart", "mousedown", "keydown", "mouseover"];
    str.forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        lastEvent = event;
      }, {
        capture: true,
        passive: true
      });
    });
    return lastEvent;
  }

  function getSession(a) {
    if (window.sessionStorage) return sessionStorage.getItem(a);
    else {
      a += "=";
      for (var e = document.cookie.split(";"), b = 0, c = e.length; b < c; b++) {
        for (var d = e[b];
          " " == d.charAt(0);) d = d.substring(1, d.length);
        if (0 == d.indexOf(a)) return unescape(d.substring(a.length, d.length))
      }
      return !1
    }
  }

  function getLines(stack) {
    return stack.split("\n").slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^");
  }

  function getParameterByName(name) {
    name = name.toLowerCase().replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    let regexS = "[\\?&]" + name + "=([^&#]*)";
    let regex = new RegExp(regexS);
    let results = regex.exec(window.location.search.toLowerCase());
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  function onload(callback) {
    if (document.readyState === "complete") {
      callback();
    } else {
      window.addEventListener("load", callback);
    }
  }

  function saveItem(value) {
    let storage = window.localStorage.getItem(NAMESPACE);
    if (!storage) {
      storage = [];
    } else {
      storage = JSON.parse(storage);
      const date = new Date(storage.date);
      storage = storage.storage;
      // 每次存入时检查, 距离上一次存超过三十分钟就删除
      if (new Date().getTime() - new Date(date).getTime() >= 60 * 30000) {
        window.localStorage.removeItem(NAMESPACE);
        console.log(`delete errorlog succeed\nLastSavedDate: ${new Date(date).toLocaleString()}`);
      }
    }
    storage.push({
      id: goodid(8),
      data: {
        ...value,
      },
      date: new Date().toLocaleString('zh-CN')
    });
    window.localStorage.setItem(NAMESPACE, JSON.stringify({
      storage,
      date: new Date()
    }));
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
        sreenW = tempW1, sreenH = tempH1;
      } else {
        sreenH = innerW / tempW1 * tempH1;
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
      sreenW = window.screen.width,
        sreenH = window.screen.height;
    }
    return filtration({
      pixelRatio: `${parseInt(sreenW * ratio)}*${parseInt(sreenH * ratio)}`, //物理分辨率
      viewPixelRatio: `${parseInt(innerW * ratio)}*${parseInt(innerH * ratio)}`, //逻辑分辨率
      colorDepth: typeof screen.colorDepth !== "undefined" ? `${screen.colorDepth}` : null, //目标设备或缓冲器上的调色板的比特深度
      pixelDepth: typeof screen.pixelDepth !== "undefined" ? `${screen.pixelDepth}` : null, //显示屏幕的颜色分辨率（比特每像素）
      state: `${getOrientationState()}`, //屏幕横竖状态 
    })
  }

  function getOrientationState() {
    if (window.matchMedia("(orientation: portrait)")) {
      return orientationStatus = "vertical";
    }
    return orientationStatus = "cross";
  }
  
	function isMobile() {
	  const info = navigator.userAgent;
	  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
	  for (let i = 0; i < agents.length; i++) {
	    if (info.indexOf(agents[i]) >= 0) return true;
	  }
	  return false;
	}

	function filtration(object) {
	  for (const item in object)
	    if (typeof object[item] === "undefined" || object[item] === null) delete object[item];
	  return object;
	}
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.goodid = factory())
  }(this, (function () {
    'use strict';
    var defaultAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var defaultStartTime = new Date(2018, 9, 1).getTime();
    var defaultLength = 16;
    var defaultPrefix = '';

    function genRandom(length, alphabet) {
      alphabet = alphabet || defaultAlphabet;
      length = length || 1;
      var id = '';
      while (length-- > 0) {
        id += alphabet[Math.random() * alphabet.length | 0]
      }
      return id
    }

    function genTimestamp() {
      var timeArr = Math.round((Date.now() - defaultStartTime) / 1000).toString(36).split('');
      var count = 3;
      var index = 0;
      while (count-- > 0) {
        index = Math.random() * timeArr.length | 0;
        timeArr[index] = timeArr[index].toUpperCase()
      }
      return timeArr.join('')
    }

    function goodid(length, prefix, alphabet) {
      length = length || defaultLength;
      prefix = prefix || defaultPrefix;
      if (length <= prefix.length) throw new Error('The length parameter cannot be less than the length of the prefix.');
      var time = genTimestamp();
      if (length < 16 || alphabet) {
        return [prefix, genRandom(length - prefix.length, alphabet)].join('')
      } else {
        return [prefix, time, genRandom(length - prefix.length - time.length)].join('')
      }
    }
    goodid.defaults = {
      length: defaultLength,
      prefix: defaultPrefix,
      alphabet: defaultAlphabet,
      startTime: defaultStartTime
    };
    goodid.config = function (options) {
      options = options || goodid.defaults;
      defaultLength = options.length || defaultLength;
      defaultPrefix = options.prefix || defaultPrefix;
      defaultAlphabet = options.alphabet || defaultAlphabet;
      defaultStartTime = options.startTime || defaultStartTime
    };
    goodid.create = function () {
      return goodid.apply(this, arguments)
    };
    return goodid
  })));
