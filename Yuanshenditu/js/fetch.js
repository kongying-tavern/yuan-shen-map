/**
 * @description: Fetch简易二次封装
 * @param {string} url // 请求的url
 * @param {object} [config] fetch的配置项
 * @return {Promise.<{code: string, status: number,statusText: string}> | JSON} JSON或一个失败的Promise
 */
if(!fetch) alert("您的浏览器不支持fetch, 请升级或者更换您的浏览器");

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

// @ts-ignore
window.request = request;
