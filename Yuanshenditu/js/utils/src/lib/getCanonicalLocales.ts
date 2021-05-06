
/**
 * @description: 获取规范的区域语言代码
 * @param {array} localeCode
 * @return {array}
 */
function getCanonicalLocales(...localeCode: string[]): string[] {
  try {
    // @ts-ignore
    if (typeof Intl.getCanonicalLocales() === "object") return Intl.getCanonicalLocales(localeCode);
  } catch (err) {
    console.error("Error Locales:", err);
  }

  return localeCode.map((val): string => CanonicalLocales(val));

  /**
   * @description: 如果不支持上面的API就自己转
   * @param {string} str
   * @return {string}
   */
  function CanonicalLocales(str: string): string {
    if (str === "" || typeof str === "undefined") console.error("str cannot be empty");
    let result = str.toLowerCase();
    let i = str.indexOf("-");
    if (i + 1 === result.length) return result.substring(0, result.length - 1);
    if (i !== -1) result = result.substring(0, i) + result.substring(i, result.length).toUpperCase();
    return result;
  }
}

export default getCanonicalLocales;
