/*
 * @Author       : ( * ^ _ ^ * )
 * @LastEditTime : 2021-04-27 5:48 PM
 * @Description  : 工具函数封装
 */
"use strict";
/**
 * @description: 柯里化函数
 * @param {function} fn
 * @param {*} args
 * @return {function}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserLanguage = getUserLanguage;
exports.clone = clone;
exports.deepClone = deepClone;
exports.createIsType = createIsType;
exports.throttle = throttle;
exports.delay = delay;
exports.concurrentRequest = concurrentRequest;
exports.request = exports.isDevelopmentMode = exports.unique = exports.currying = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currying = function currying(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var len = fn.length;
  return function () {
    for (var _len = arguments.length, _ = new Array(_len), _key = 0; _key < _len; _key++) {
      _[_key] = arguments[_key];
    }

    var arg = args.concat(_);

    if (arg.length < len) {
      return currying(fn, arg);
    }

    return fn.apply(void 0, _toConsumableArray(arg));
  };
};
/**
 * @description: 获取用户浏览器主语言
 * @param {string} defaultLanguage
 * @return {string | defaultLanguage}
 */


exports.currying = currying;

function getUserLanguage(defaultLanguage) {
  var LANGUAGE = localStorage.getItem("locale") || window.navigator.language.toLocaleLowerCase() || defaultLanguage;
  localStorage.setItem("locale", LANGUAGE);
  return LANGUAGE;
}
/**
 * @description: 浅拷贝
 * @param {object} source
 * @return {object}
 */


function clone(source) {
  var target = {};

  for (var key in source) {
    target[key] = source[key];
  }

  return target;
}
/**
 * @description: '简易深拷贝'
 * @param {object} source
 * @return {object}
 */


function deepClone(source) {
  if (_typeof(source) === "object") {
    var target = Array.isArray(source) ? [] : {};

    for (var key in source) {
      target[key] = deepClone(source[key]);
    }

    return target;
  }

  return source;
}
/**
 * @description: 判断是否开发环境
 * @return {boolean}
 */


var isDevelopmentMode = function isDevelopmentMode() {
  return document.domain !== "yuanshen.site";
};
/**
 * @description: ES6数组去重
 * @param {array} arr
 * @return {array} 
 */


exports.isDevelopmentMode = isDevelopmentMode;

var unique = function unique(arr) {
  return Array.from(new Set(arr));
};
/**
 * @description: Fetch二次封装
 * @param {string} url // 请求的url
 * @param {object} [config] fetch的配置项
 * @return {Promise.<{code: string, status: number,statusText: string}> | JSON} JSON或一个失败的Promise
 */


exports.unique = unique;

var request = function request(url, config) {
  return fetch(url, config).then(function (response) {
    var status = response.status,
        statusText = response.statusText;
    if (status >= 200 && status < 300) return response.json();
    return Promise.reject({
      code: "STATUS ERROR",
      status: status,
      statusText: statusText
    });
  })["catch"](function (reason) {
    if (reason && reason.code === "STATUS ERROR") {
      window.alert("\uD83D\uDE05Sorry Fetch data acquisition error\nErrorCode: ".concat(reason.status, "\nErrorText: ").concat(reason.statusText));
    }

    if (!navigator.onLine) {
      window.alert("😅Network connection failed\nPlease check your network ~");
    }

    return Promise.reject(reason);
  });
};
/**
 * @description: 通过柯里化函数创建类型判断函数
 * @param {object} obj 类型判断函数的挂载对象
 * @return {{function}} 
 */


exports.request = request;

function createIsType(obj) {
  var isType = function isType(typing, value) {
    return Object.prototype.toString.call(value) === "[object ".concat(typing, "]");
  };

  ["String", "Number", "Boolean", "Null", "Undefined", "Date", "RegExp", "Symbol", "BigInt", " Promise", "Array", "Set", "Math", "Map", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "JSON", "GeneratorFunction", "Intl", "WebAssembly", "Reflect"].forEach(function (type) {
    return obj["is" + type] = currying(isType)(type);
  });
  return obj;
}
/**
 * @description: 节流
 * @param {function} callback 回调函数
 * @param {number} wait 延迟(ms)
 * @return {function} 
 */


function throttle(callback, wait) {
  var previous = 0,
      timer = null;
  return function () {
    var _this = this;

    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    var now = +Date.now(),
        remaining = wait - (now - previous);

    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      previous = now;
      callback.call.apply(callback, [this].concat(params));
    } else if (!timer) {
      timer = setTimeout(function () {
        clearTimeout(timer);
        timer = null;
        previous = +new Date();
        callback.call.apply(callback, [_this].concat(params));
      }, remaining);
    }
  };
}
/**
 * @description: 延迟
 * @param {number} interval 延迟的时间(ms)
 * @return {Promise}
 */


function delay(interval) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(interval);
    }, interval);
  });
}

;
/**
 * @description: 并发请求控制
 * @param {Array<function>} tasks // 请求函数
 * @param {number} [pool=5] 最并发上限
 * @return {*}
 */

function concurrentRequest(tasks, pool) {
  pool = pool || 5;
  var results = [],
      together = new Array(pool).fill(null),
      index = 0;
  together = together.map(function () {
    return new Promise(function (resolve, reject) {
      var run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }

        ;
        var old_index = index,
            task = tasks[index++];
        task().then(function (result) {
          results[old_index] = result;
          run();
        })["catch"](function (reason) {
          reject(reason);
        });
      };

      run();
    });
  });
  return Promise.all(together).then(function () {
    return results;
  });
}