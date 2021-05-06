
/**
 * @description: 设置伪元素样式
 * @param {string} className
 * @param {string} pseudo 伪元素
 * @param {object} obj // 样式
 * @return {HTMLStyleElement}
 */
function setPseudoStyle(className: string, pseudo: "after" | "before", obj: any): HTMLStyleElement {
  let str = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) str += `${prop}:${obj[prop]};`;
  }
  const style = document.createElement("style");
  style.innerHTML = `.${className}::${pseudo}{${str}}`;
  document.head.appendChild(style);
  return style;
}

export default setPseudoStyle;
