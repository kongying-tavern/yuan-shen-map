/**
 * @description: 无刷新动态修改url参数
 * @param {string} paramName 参数名
 * @param {string} newValue 参数值
 * @return {void}
 */
function setURLParam(paramName: string, newValue:string): void{
  const oldUrl = window.location.href.toString();
  const re = eval('/(' + paramName + '=)([^&]*)/gi');
  let result = oldUrl.replace(re, paramName + '=' + newValue);
  history.pushState({
    url: result,
    title: document.title
  }, document.title, result);
}

export default setURLParam;
