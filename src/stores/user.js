import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "app-user",
  state: () => ({
    // user info
    userInfo: null,
    // token
    access_token: undefined,
    refresh_token: undefined,
    // Whether the login expired   登录是否过期
    sessionTimeout: false, // expires_in
    // Last fetch time 最后更新时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo() {
      return this.userInfo;
    },
    getAccessToken() {
      return this.access_token;
    },
    getRefreshToken() {
      return this.refresh_token;
    },
    getSessionTimeout() {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime() {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setAccessToken(info) {
      this.access_token = info ? info : ""; // for null or undefined value
    },
    setRefreshToken(info) {
      this.refresh_token = info ? info : ""; // for null or undefined value
    },
    setUserInfo(info) {
      this.userInfo = info;
      // this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.access_token = "";
      this.refresh_token = "";
      this.sessionTimeout = false;
    },

    async logout() {
      console.log("注销Token失败");
      this.resetState();

      // this.setToken(undefined);
      // this.setSessionTimeout(false);
      // this.setUserInfo(null);
    },
  },
  persist: true,
});
