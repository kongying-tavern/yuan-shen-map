
/**
 * @description: onload
 * @param {function} callback
 * @return {void}
 */
function onloads(callback: Function): void{
  // @ts-ignore
  document.readyState === "complete" ? callback() : window.addEventListener("load", callback);
}

export default onloads;
