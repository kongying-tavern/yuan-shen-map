import delay from './lib/delay';
import getCanonicalLocales from './lib/getCanonicalLocales';
import getUserLanguage from './lib/getUserLanguage';
import log from './lib/log';
import onload from './lib/onload';
import setPseudoStyle from './lib/setPseudoStyle';
import throttle from './lib/throttle';
import getSupperLocale from './lib/getSupperLocale';
import setURLParam from './lib/setURLParam';
// @ts-ignore
window.utils = {
  delay,
  getCanonicalLocales,
  getUserLanguage,
  log,
  onload,
  setPseudoStyle,
  throttle,
  getSupperLocale,
  setURLParam,
  version: '1.0.0(beta)'
};
