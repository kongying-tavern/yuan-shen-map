import getUserLanguage from './getUserLanguage';

/**
 * @description: 先凑和用
 * @param {object} data
 * @param {string} defaultLanguage
 * @return {object} 返回一个link和localeCode
 */
function getSupperLocale(data: any, defaultLanguage:string) {
  let userLocale = getUserLanguage(defaultLanguage);
  for (let i = 0; i < data.length; i++) {
    if (data[i].node) {
      for (let x = 0; x < data[i].node.length; x++) {
        if (data[i].node[x].code === userLocale) return {
          code: [data[i].node[x].code],
          link: data[i].node[x].link,
        }
      }
      for (let x = 0; x < data[i].code.length; x++) {
        if (data[i].code[x] === userLocale) return {
          code: data[i].code,
          link: data[i].link,
        };
      }
    } else {
      for (let x = 0; x < data[i].code.length; x++) {
        if (data[i].code[x] === userLocale) return {
          code: data[i].code,
          link: data[i].link,
        };
      }
    }
  }
}

export default getSupperLocale;
