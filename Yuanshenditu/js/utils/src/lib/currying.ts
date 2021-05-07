
/**
 * @description: 柯里化函数
 * @param {function} fn
 * @param {*} args
 * @return {function}
 */

const currying = (fn: Function, args = []): Function => {
  let len = fn.length;
  return (..._: any): Function => {
    let arg = args.concat(_);
    if (arg.length < len) {
      return currying(fn, arg);
    }
    return fn(...arg);
  };
};
