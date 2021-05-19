/*
 * @Author       : (*^_^*)
 * @LastEditTime : 2021-05-19 7:33 PM
 * @Description  : SaveErrorLog
 */

  "use strict";
  const NAMESPACE = `indexPage-ErrorLog`;

  injecJsError(); // 捕获Js错误
  injectFetch(); // 捕获Fetch错误
  injectXhr(); // 捕获Ajax错误
  blackScreen(); // 捕获白屏错误

  function injecJsError() {
    window.addEventListener("error", function (event) {
      let lastEvent = getLastEvent();
      if (event.target && (event.target.src || event.target.href)) {
        saveItem({
          type: "resourceError",
          message: event.message,
          filters: event.target.src || event.target.href,
          tagNmae: event.target.tagName,
          selector: getSelector(event.target)
        });
      } else {
        saveItem({
          type: "JsError",
          message: event.message,
          filters: event.filename,
          position: `${event.lineno}:${event.colno}`,
          state: getLines(event.error.stack),
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
          saveItem({
            type: "xhrError",
            eventType: type,
            pathname: this.logData.url,
            status: status + "-" + stateText,
            duration,
            pesponse: this.response ? `${JSON.stringify(this.response)}`.length >= 99 ? JSON.stringify(this.response).substr(0, 99) + "..." : JSON.stringify(this.response) : "",
            params: body || "",
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
      return _oldFetch.apply(this, arguments)
        .then(res => {
          if (!res.ok) { // True if status is HTTP 2xx
            saveItem({
              type: "fetchError",
              url: res.url,
              redirected: res.redirect,
              type: res.type,
              status: res.status,
              text: res.statusText,
            });
          }
          return res;
        })
        .catch(error => {
          saveItem({
            type: "fetchError2",
            url: res.url,
            type: res.type,
            redirected: res.redirect,
            status: res.status,
            text: res.statusText,
          });
          throw error;
        })
    }
  }

  function blackScreen() {
    let wrapperElements = ["html", "body"]; //过滤元素数组
    let emptyPoints = 0;

    function isWrapper(element) {
      let selector = getSelector(element);
      if (wrapperElements.includes(selector)) {
        emptyPoints++;
      }
    }
    onload(function () {
      let yElements, xElements;
      for (let i = 1; i <= 9; i++) { //以网页中心做轴获取X轴和Y轴十个点,判断是否是空白点
        xElements = document.elementFromPoint(
          window.innerWidth * i / 10, window.innerHeight / 2);
        yElements = document.elementFromPoint(
          window.innerWidth / 2, window.innerHeight * i / 10);
        isWrapper(xElements);
        isWrapper(yElements);
      }
      if (emptyPoints >= 16) { //空白点阀值
        let centerElements = document.elementFromPoint(
          window.innerWidth / 2, window.innerHeight / 2
        );
        saveItem({
          type: "blackScreen",
          emptyPoints,
          selector: getSelector(centerElements[0]),
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

  function filtration(object) {
    for (const item in object)
      if (typeof object[item] === "undefined" || object[item] === null || object[item] === "") delete object[item];
    return object;
  }

  function saveItem(value) {
    let storage = window.localStorage.getItem(NAMESPACE);
    if (!storage) {
      storage = [];
    } else {
      storage = JSON.parse(storage);
      const date = new Date(storage.date);
      storage = storage.storage;
      // 放了超过十分钟就删除
      if (new Date().getTime() - new Date(date).getTime() >= 60 * 10000) {
        window.localStorage.removeItem(NAMESPACE);
        console.log(`delete errorlog succeed\nlodDate: ${new Date(date).toLocaleString()}`);
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
