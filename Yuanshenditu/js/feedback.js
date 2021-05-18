	;
	(function () {
	  const element = document.querySelector(".fankui");
	  element.addEventListener("click", feedback, false);

	  function feedback() {

	  }

	  function getUserInfo() {
	    const loginInfo = JSON.parse(localStorage.getItem("user"));
	    let result = {
	      clientInfo: navigator.userAgent,
	      clientVersion: navigator.appVersion,
	      os: navigator.platform,
	      osVersion: navigator.appVersion,
	      netType: navigator.connection.effectiveType,
	      openid: loginInfo.id,
	      nickname: loginInfo.name,
	      avatar: loginInfo.avatar_url,
	      customInfo: filtration({
	        title: document.title,
	        href: location.href,
	        onLine: navigator.onLine,
	        fetch: typeof window.fetch === "undefined" ? false : true,
	        inIframe: self != top,
	        cookie: navigator.cookieEnabled,
	        ...getScreenInfo()
	      })
	    };

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
	  console.log(getUserInfo())
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
