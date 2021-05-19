	const APPID = "321980";
  const ELEMENT_SELECT = ".fankui";
  /**
	 * 吐个槽接入脚本
	 * 支持 AMD，CJS，全局调用
	 */
	(function (root, factory) {
	  if (typeof define === "function" && define.amd) {
	    define(function () {
	      return (root.Tucao = factory());
	    });
	  } else if (typeof module === "object" && module.exports) {
	    module.exports = (root.Tucao = factory());
	  } else {
	    root.Tucao = factory();
	  }
	}(this, function () {

	  var Tucao = (function () {
	    /**
	     * 发起接入请求
	     * @param  {Number} productId  需要接入产品 id
	     * @param  {[Object]} data     需要传递的用户信息            
	     */
	    var request = function (productId, data) {
	      var form = document.createElement("form");
	      form.id = "form";
	      form.name = "form";
	      document.body.appendChild(form);

	      // 设置相应参数 
	      for (key in data) {
	        var input = document.createElement("input");
	        input.type = "text";
	        input.name = key;
	        input.value = data[key];
	        // 将该输入框插入到 form 中 
	        form.appendChild(input);
	      }
	      // form 的提交方式 
	      form.method = "POST";
	      // form 提交路径 
	      form.action = "https://support.qq.com/product/" + productId;
	      // 对该 form 执行提交 
	      form.submit();
	      // 删除该 form 
	      document.body.removeChild(form);
	    }
	    return {
	      request: request,
	    }
	  })();
	  return Tucao;
	}));
	(function () {
	  const element = document.querySelector(ELEMENT_SELECT);
	  element.addEventListener("click", feedback, false);

	  function feedback() {
	    Tucao.request(APPID, getUserInfo());
	  }

	  function getUserInfo() {
	    let result = {
	      clientInfo: navigator.userAgent,
	      clientVersion: navigator.appVersion,
	      os: navigator.platform,
	      osVersion: navigator.appVersion,
	      netType: navigator.connection.effectiveType,
	      customInfo: JSON.stringify(filtration({
	        title: document.title,
	        href: location.href,
	        onLine: navigator.onLine,
	        fetch: typeof window.fetch === "undefined" ? false : true,
	        inIframe: self != top,
	        cookie: navigator.cookieEnabled,
	        ...getScreenInfo(),
	        // ...getErrorLog() customInfo长度限制256, 错误信息太多不传了
	      })).substring(0, 255),
        ...getUserLoginInfo(),
	    };

	    function getErrorLog() {
	      if (!localStorage.getItem("indexPage-ErrorLog")) return;
	      return {
	        errorLog: JSON.parse(localStorage.getItem("indexPage-ErrorLog"))
	      }
	    }

	    function getUserLoginInfo() {
	      if (!localStorage.getItem("user")) return {};
	      let {
	        id,
	        name,
	        avatar_url
	      } = JSON.parse(localStorage.getItem("user"));
	      return {
	        "openid": id,
	        "nickname": name,
	        "avatar": avatar_url
	      }
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
	      })
	    }

	    function filtration(object) {
	      for (const item in object)
	        if (typeof object[item] === "undefined" || object[item] === null) delete object[item];
	      return object;
	    }
	    return filtration(result);
	  }

	})();

	if (!String.prototype.includes) {
	  String.prototype.includes = function (search, start) {
	    'use strict';
	    if (typeof start !== 'number') {
	      start = 0;
	    }
	    if (start + search.length > this.length) {
	      return false;
	    } else {
	      return this.indexOf(search, start) !== -1;
	    }
	  };
	}

	function isMobile() {
	  const info = navigator.userAgent;
	  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
	  for (let i = 0; i < agents.length; i++) {
	    if (info.indexOf(agents[i]) >= 0) return true;
	  }
	  return false;
	}
