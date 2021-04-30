/*
 * @Author       : ( * ^ _ ^ * )
 * @LastEditTime : 2021-04-30 1:54 PM
 * @Description  : 工具函数封装
 */

"use strict";

/**
 * @description: 柯里化函数
 * @param {function} fn
 * @param {*} args
 * @return {function}
 */
const currying = (fn, args = []) => {
  let len = fn.length;
  return (..._) => {
    let arg = args.concat(_);
    if (arg.length < len) {
      return currying(fn, arg);
    }
    return fn(...arg);
  };
};

/**
 * @description: 获取用户浏览器主语言
 * @param {string} defaultLanguage
 * @return {string | defaultLanguage}
 */
function getUserLanguage(defaultLanguage) {
  let LANGUAGE = localStorage.getItem("locale") || window.navigator.language || defaultLanguage;
  LANGUAGE = getCanonicalLocales(LANGUAGE)[0];
  localStorage.setItem("locale", LANGUAGE);
  return LANGUAGE;
}

/**
 * @description: 简易浅拷贝
 * @param {object} source
 * @return {object}
 */
function clone(source) {
  let target = {};
  for (const key in source) {
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
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    for (const key in source) {
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
const isDevelopmentMode = () => document.domain !== "yuanshen.site";

/**
 * @description: ES6数组去重
 * @param {array} arr
 * @return {array}
 */
const unique = (arr) => Array.from(new Set(arr));

/**
 * @description: Fetch简易二次封装
 * @param {string} url // 请求的url
 * @param {object} [config] fetch的配置项
 * @return {Promise.<{code: string, status: number,statusText: string}> | JSON} JSON或一个失败的Promise
 */
const request = (url, config) =>
  fetch(url, config)
  .then((response) => {
    const {
      status,
      statusText
    } = response;
    if (status >= 200 && status < 300) return response.json();
    return Promise.reject({
      code: "STATUS ERROR",
      status,
      statusText,
    });
  })
  .catch((reason) => {
    if (reason && reason.code === "STATUS ERROR") {
      window.alert(
        `😅Sorry Fetch data acquisition error\nErrorCode: ${reason.status}\nErrorText: ${reason.statusText}`
      );
    }

    if (!navigator.onLine) {
      window.alert("😅Network connection failed\nPlease check your network ~");
    }

    return Promise.reject(reason);
  });

/**
 * @description: 通过柯里化函数创建类型判断函数
 * @param {object} obj 类型判断函数的挂载对象
 * @return {{function}}
 */
function createIsType(obj) {
  const isType = (typing, value) => Object.prototype.toString.call(value) === `[object ${typing}]`;
  [
    "String",
    "Number",
    "Boolean",
    "Null",
    "Undefined",
    "Date",
    "RegExp",
    "Symbol",
    "BigInt",
    " Promise",
    "Array",
    "Set",
    "Math",
    "Map",
    "WeakMap",
    "WeakSet",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "JSON",
    "GeneratorFunction",
    "Intl",
    "WebAssembly",
    "Reflect",
  ].forEach((type) => (obj["is" + type] = currying(isType)(type)));
  return obj;
}

/**
 * @description: 节流
 * @param {function} callback 回调函数
 * @param {number} wait 延迟(ms)
 * @return {function}
 */
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

/**
 * @description: 延迟
 * @param {number} interval 延迟的时间(ms)
 * @return {Promise}
 */
function delay(interval) {
  // @ts-ignore
  // @ts-ignore
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval);
    }, interval);
  });
}

/**
 * @description: 并发请求控制
 * @param {Array<function>} tasks // 请求函数
 * @param {function} callback
 * @param {number} pool 最并发上限
 * @return {*}
 */
function concurrentRequest(tasks, callback, pool) {
  class TaskQueue {
    running = 0;
    queue = [];
    results = [];
    pushTask(task) {
      let self = this;
      self.queue.push(task);
      self.next();
    }
    next() {
      let self = this;
      while (self.running < pool && self.queue.length) {
        self.running++;
        let task = self.queue.shift();
        task()
          .then((result) => {
            self.results.push(result);
          })
          .finally(() => {
            self.running--;
            self.next();
          });
      }
      if (self.running === 0) callback(self.results);
    }
  }
  let TQ = new TaskQueue();
  tasks.forEach((task) => TQ.pushTask(task));
}

/**
 * @description 将类数组转化成数组
 * @param  {Object} arrayLike 类数组对象
 * @return {Array} 转化后的数组
 */
function arrayFrom(arrayLike) {
  return [].slice.call(arrayLike);
}

/**
 * @description: 设置伪元素样式
 * @param {string} className
 * @param {string} pseudo 伪元素
 * @param {object} obj // 样式
 * @return {HTMLStyleElement}
 */
function setPseudoStyle(className, pseudo, obj) {
  let str = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) str += `${prop}:${obj[prop]};`;
  }
  const style = document.createElement("style");
  style.innerHTML = `.${className}::${pseudo}{${str}}`;
  document.head.appendChild(style);
  return style;
}

/**
 * @description: 获取规范的区域语言代码
 * @param {array} localeCode
 * @return {array}
 */
function getCanonicalLocales(...localeCode) {
  try {
    // @ts-ignore
    if (typeof Intl.getCanonicalLocales() === "object") return Intl.getCanonicalLocales(localeCode);
  } catch (err) {
    console.error("Error Locales:", err);
  }

  return localeCode.map((val) => CanonicalLocales(val));

  /**
   * @description: 如果不支持上面的API就自己转
   * @param {string} str
   * @return {string}
   */
  function CanonicalLocales(str) {
    if (str === "" || typeof str === "undefined") throw new TypeError("str cannot be empty");
    let result = str.toLowerCase();
    let i = str.indexOf("-");
    if (i + 1 === result.length) return result.substring(0, result.length - 1);
    if (i !== -1) result = result.substring(0, i) + result.substring(i, result.length).toUpperCase();
    return result;
  }
}

/**
 * @description: 判断是否为IE浏览器
 * @return {boolean}
 */
function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
  return false;
}

/**
 * @description: onload
 * @param {function} callback
 * @return {void}
 */
function onload(callback) {
  // @ts-ignore
  document.readyState === "complete" ? callback() : window.addEventListener("load", callback);
}

/**
 * @description: 先凑和用
 * @param {object} data
 * @param {string} defaultLanguage
 * @return {object} 返回一个link和localeCode
 */
function getSupperLocale(data, defaultLanguage) {
  let userLocale = getUserLanguage(defaultLanguage);
  for (let i = 0; i < data.length; i++) {
    if (data[i].node) {
      for (let x = 0; x < data[i].node.length; x++) {
        if (data[i].node[x].code === userLocale) return {
          code: data[i].node[x].code,
          link: data[i].node[x].link
        }
      }
      for (let x = 0; x < data[i].code.length; x++) {
        if (data[i].code[x] === userLocale) return {
          code: data[i].code,
          link: data[i].link
        };
      }
    } else {
      for (let x = 0; x < data[i].code.length; x++) {
        if (data[i].code[x] === userLocale) return {
          code: data[i].code,
          link: data[i].link
        };
      }
    }
  }
}


export {
  getUserLanguage,
  currying,
  clone,
  deepClone,
  unique,
  isDevelopmentMode,
  request,
  createIsType,
  throttle,
  delay,
  concurrentRequest,
  arrayFrom,
  setPseudoStyle,
  getCanonicalLocales,
  isIE,
  onload,
  getSupperLocale,
};
