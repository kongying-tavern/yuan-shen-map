import { defineStore } from "pinia";

// 用户存档 数据来源 gitee gist
export const useSavedStore = defineStore({
  id: "saved",
  state: () => ({
    gists: null,
    files: [],
  }),
  getters: {
    getGists() {
      return this.gists;
    },
    getFiles() {
      return this.files;
    },
  },
  actions: {
    setGists(info) {
      this.gists = info || {};
    },
    setFiles(info) {
      this.files = info || {};
    },
    resetState() {
      this.gists = null;
      this.files = [];
    },
  },
  persist: true,
});
