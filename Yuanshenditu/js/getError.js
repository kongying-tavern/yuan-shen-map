  "use strict";
  const NAMESPACE = `${window.location.pathname}ErrorLog`;

  injecJsError(); // 捕获Js错误
  injectFetch();  // 捕获Fetch错误
  injectXhr();    // 捕获Ajax错误
  blackScreen();  // 捕获白屏错误

  function injecJsError() {
    window.addEventListener("error", function (event) {
      let lastEvent = getLastEvent();
      if (event.target && (event.target.src || event.target.href)) {
        saveItem("resourceError", {
          message: event.message,
          filters: event.target.src || event.target.href,
          tagNmae: event.target.tagName,
          selector: getSelection(event.target)
        });
      } else {
        saveItem("JsError", {
          message: event.message,
          filters: event.filename,
          position: `${event.lineno}:${event.colno}`,
          state: getLines(event.error.stack),
          selector: lastEvent ? getSelection(lastEvent.path) : ""
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
      saveItem("PromiseError", {
        message,
        filename,
        position: `${ line}:${column}`,
        stack: getLines(event.error.stack),
        selector: lastEvent ? getSelection(lastEvent.path) : ""
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
          saveItem("xhrError", {
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
            saveItem("fetchError", {
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
          saveItem("fetchError", {
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
        isWrapper(xElements[0]);
        isWrapper(yElements[0]);
      }
      if (emptyPoints >= 16) { //空白点阀值
        let centerElements = document.elementFromPoint(
          window.innerWidth / 2, window.innerHeight / 2
        );
        saveItem("blackScreen", {
          emptyPoints,
          selector: getSelector(centerElements[0]),
        })
      }
    })

  }
  // Utils Function

  function getSelector(element) {
    let selector;
    if (element.id) {
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

  function saveItem(key, value) {
    let storage = window.localStorage.getItem(NAMESPACE);

    if (!storage) {
      storage = {};
    } else {
      storage = JSON.parse(storage);
    }

    storage[key] = value;
    window.localStorage.setItem(NAMESPACE, JSON.stringify({
      storage: filtration(storage),
      date: new Date()
    }));
  }

  function loadItem(key, myDefault) {
    let storage = window.localStorage.getItem(NAMESPACE);

    if (!storage) return myDefault;

    storage = JSON.parse(storage);
    let result = storage[key];
    return {
      value,
      date
    } = result || myDefault;
  }
