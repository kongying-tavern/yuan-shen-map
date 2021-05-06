
/**
 * @description: 节流
 * @param {function} callback 回调函数
 * @param {number} wait 延迟(ms)
 * @return {function}
 */
function throttle(callback: Function, wait: number): Function {
  let previous = 0,
    timer: NodeJS.Timeout | null = null;
  return function (...params: any) {
    let now = +Date.now(),
      remaining = wait - (now - previous);
    if (remaining <= 0) {
      clearTimeout(Number(timer));
      timer = null;
      previous = now;
      // @ts-ignore
      callback.call(this, ...params);
    } else if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(Number(timer));
        timer = null;
        previous = +new Date();
        // @ts-ignore
        callback.call(this, ...params);
      }, remaining);
    }
  };
}

export default throttle;
