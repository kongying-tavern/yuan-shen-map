/**
 * @description: 延迟
 * @param {number} interval 延迟的时间(ms)
 * @return {Promise}
 */
function delay(interval:number) {
  // @ts-ignore
  // @ts-ignore
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval);
    }, interval);
  });
}

export default delay;
