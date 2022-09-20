import { defineStore } from 'pinia';

export const useCounterStore = defineStore('main', {
  state: () => ({
    selected_child_area: 0,
    changeitem: null,
    selected_item_list: [],
    teleport_list:[],
  }),
});
