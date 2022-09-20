import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { create_notify } from "../api/common"
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create(
  {
    baseURL: 'https://cloud.yuanshen.site/api',
  }
)
api.interceptors.response.use(res => {
  if (res.data.code != 200) {
    create_notify(`${res.data.code} ${res.data.message}`, 'negative');
    return Promise.reject(new Error(`${res.data.message}`));
  }
  return res;
}, error => {
  if (error.response) {
    create_notify(`${error.response.status} ${error.response.statusText}`, 'negative');
  } else if (error.request) {
    create_notify('链接失败，请稍后重试', 'negative');
  } else {
    create_notify(error.message, 'negative');
  }
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

})

export { api }
