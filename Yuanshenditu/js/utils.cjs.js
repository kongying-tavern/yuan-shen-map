;(function () {
  'use strict'

  /**
   * @description: 延迟
   * @param {number} interval 延迟的时间(ms)
   * @return {Promise}
   */
  function delay(interval) {
    // @ts-ignore
    // @ts-ignore
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(interval)
      }, interval)
    })
  }

  /**
   * @description: 获取规范的区域语言代码
   * @param {array} localeCode
   * @return {array}
   */
  function getCanonicalLocales() {
    var localeCode = []
    for (var _i = 0; _i < arguments.length; _i++) {
      localeCode[_i] = arguments[_i]
    }
    try {
      // @ts-ignore
      if (typeof Intl.getCanonicalLocales() === 'object')
        return Intl.getCanonicalLocales(localeCode)
    } catch (err) {
      console.error('Error Locales:', err)
    }
    return localeCode.map(function (val) {
      return CanonicalLocales(val)
    })
    /**
     * @description: 如果不支持上面的API就自己转
     * @param {string} str
     * @return {string}
     */
    function CanonicalLocales(str) {
      if (str === '' || typeof str === 'undefined')
        console.error('str cannot be empty')
      var result = str.toLowerCase()
      var i = str.indexOf('-')
      if (i + 1 === result.length) return result.substring(0, result.length - 1)
      if (i !== -1)
        result =
          result.substring(0, i) +
          result.substring(i, result.length).toUpperCase()
      return result
    }
  }

  /**
   * @description: 获取用户浏览器主语言
   * @param {string} defaultLanguage
   * @return {string | defaultLanguage}
   */
  function getUserLanguage(defaultLanguage) {
    var LANGUAGE =
      localStorage.getItem('locale') ||
      window.navigator.language ||
      defaultLanguage
    LANGUAGE = getCanonicalLocales(LANGUAGE)[0]
    localStorage.setItem('locale', LANGUAGE)
    return LANGUAGE
  }

  /**
   * @description: 输出会自动对齐而且漂亮的log
   * @param {string} title
   * @param {string} description
   * @param {Array<object>} data
   * @return {void}
   */
  function log(title, description, data) {
    var myTitle = title || '原神地图'
    var myDescription = description || ''
    var myData = data || []
    var style = 'font-size:13px;'
    console.group(
      '%c' + myTitle + (myDescription === '' ? '' : '%c' + myDescription),
      'background:#35495e; padding: 2px 4px; border-radius: 3px 0 0 3px; color: #fff;font-family: sans-serif;',
      'background:#41b883 ; padding: 2px 4px; border-radius: 0 3px 3px 0;  color: #fff; font-family: sans-serif;'
    )
    myData.forEach(function (val) {
      for (var prop in val) {
        if (val.hasOwnProperty(prop)) {
          console.log(
            '%c' +
              prop +
              '\u0020'.repeat(18 - prop.length) +
              ': %c' +
              val[prop],
            'font-size:13px;',
            'font-size:13px;color: #45B744;'
          )
        }
      }
    })
    console.groupEnd()
    console.log(
      '%c📝\u0020问题反馈: https://support.qq.com/products/321980',
      style
    )
    console.log(
      '%c😉\u0020了解更多: https://yuanshen.site/disclaimer.html',
      style
    )
  }

  /**
   * @description: onload
   * @param {function} callback
   * @return {void}
   */
  function onloads(callback) {
    // @ts-ignore
    document.readyState === 'complete'
      ? callback()
      : window.addEventListener('load', callback)
  }

  /**
   * @description: 设置伪元素样式
   * @param {string} className
   * @param {string} pseudo 伪元素
   * @param {object} obj // 样式
   * @return {HTMLStyleElement}
   */
  function setPseudoStyle(className, pseudo, obj) {
    var str = ''
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) str += prop + ':' + obj[prop] + ';'
    }
    var style = document.createElement('style')
    style.innerHTML = '.' + className + '::' + pseudo + '{' + str + '}'
    document.head.appendChild(style)
    return style
  }

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

  function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i]
    return to
  }

  /**
   * @description: 节流
   * @param {function} callback 回调函数
   * @param {number} wait 延迟(ms)
   * @return {function}
   */
  function throttle(callback, wait) {
    var previous = 0,
      timer = null
    return function () {
      var _this = this
      var params = []
      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i]
      }
      var now = +Date.now(),
        remaining = wait - (now - previous)
      if (remaining <= 0) {
        clearTimeout(Number(timer))
        timer = null
        previous = now
        // @ts-ignore
        callback.call.apply(callback, __spreadArray([this], params))
      } else if (!timer) {
        timer = setTimeout(function () {
          clearTimeout(Number(timer))
          timer = null
          previous = +new Date()
          // @ts-ignore
          callback.call.apply(callback, __spreadArray([_this], params))
        }, remaining)
      }
    }
  }

  /**
   * @description: 先凑和用
   * @param {object} data
   * @param {string} defaultLanguage
   * @return {object} 返回一个link和localeCode
   */
  function getSupperLocale(data, defaultLanguage) {
    var userLocale = getUserLanguage(defaultLanguage)
    for (var i = 0; i < data.length; i++) {
      if (data[i].node) {
        for (var x = 0; x < data[i].node.length; x++) {
          if (data[i].node[x].code === userLocale)
            return {
              code: data[i].node[x].code,
              link: data[i].node[x].link,
              dir: data[i].node[x].code.includes('ar') ? 'rtl' : 'ltr',
            }
        }
        for (var x = 0; x < data[i].code.length; x++) {
          if (data[i].code[x] === userLocale)
            return {
              code: data[i].code,
              link: data[i].link,
              dir: data[i].node[x].code.includes('ar') ? 'rtl' : 'ltr',
            }
        }
      } else {
        for (var x = 0; x < data[i].code.length; x++) {
          if (data[i].code[x] === userLocale)
            return {
              code: data[i].code,
              link: data[i].link,
              dir: data[i].node[x].code.includes('ar') ? 'rtl' : 'ltr',
            }
        }
      }
    }
  }

  /**
   * @description: 无刷新动态修改url参数
   * @param {string} paramName 参数名
   * @param {string} newValue 参数值
   * @return {void}
   */
  function setURLParam(paramName, newValue) {
    var oldUrl = window.location.href.toString()
    var re = eval('/(' + paramName + '=)([^&]*)/gi')
    var result = oldUrl.replace(re, paramName + '=' + newValue)
    if (
      result === location.href &&
      !new URLSearchParams(new URL(location.href).search).has(paramName)
    ) {
      if (location.search === '') {
        result = '?' + paramName + '=' + newValue + location.hash
      } else {
        result =
          location.search + '&' + paramName + '=' + newValue + location.hash
      }
    }
    history.pushState(
      {
        url: result,
        title: document.title,
      },
      document.title,
      result
    )
  }

  // @ts-ignore
  window.utils = {
    delay: delay,
    getCanonicalLocales: getCanonicalLocales,
    getUserLanguage: getUserLanguage,
    log: log,
    onload: onloads,
    setPseudoStyle: setPseudoStyle,
    throttle: throttle,
    getSupperLocale: getSupperLocale,
    setURLParam: setURLParam,
    version: '1.0.0(beta)',
  }
})()
