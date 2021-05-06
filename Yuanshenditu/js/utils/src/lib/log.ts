
/**
 * @description: 输出会自动对齐而且漂亮的log
 * @param {string} title
 * @param {string} description
 * @param {Array<object>} data
 * @return {void}
 */
function log(title: string, description: string, data: any[]) {
  const myTitle = title || "原神地图";
  const myDescription = description || "";
  const myData = data || [];
  const style = 'font-size:13px;';

  console.group(
    `%c${myTitle}${myDescription === "" ? "" : "%c" + myDescription}`,
    'background:#35495e; padding: 2px 4px; border-radius: 3px 0 0 3px; color: #fff;font-family: sans-serif;',
    'background:#41b883 ; padding: 2px 4px; border-radius: 0 3px 3px 0;  color: #fff; font-family: sans-serif;'
  );

  myData.forEach((val) => {
    for (const prop in val) {
      if (val.hasOwnProperty(prop)) {
        console.log(
          `%c${prop}${'\u0020'.repeat(18 - prop.length)}: %c${val[prop]}`,
          "font-size:13px;", "font-size:13px;color: #45B744;"
        );
      }
    }
  });
  console.groupEnd();
  console.log('%c📝\u0020问题反馈: https://support.qq.com/products/321980', style);
  console.log('%c😉\u0020了解更多: https://yuanshen.site/disclaimer.html', style);
}

export default log;
