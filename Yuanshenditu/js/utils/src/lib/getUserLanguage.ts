import getCanonicalLocales from './getCanonicalLocales';

/**
 * @description: 获取用户浏览器主语言
 * @param {string} defaultLanguage
 * @return {string | defaultLanguage}
 */

function getUserLanguage(defaultLanguage:string) :string {
  let LANGUAGE = localStorage.getItem("locale") || window.navigator.language || defaultLanguage;
  LANGUAGE = getCanonicalLocales(LANGUAGE)[0];
  localStorage.setItem("locale", LANGUAGE);
  return LANGUAGE;
}

export default getUserLanguage;
