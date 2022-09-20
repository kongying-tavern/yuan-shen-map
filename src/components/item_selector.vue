<!-- 物品选择器 -->
<template>
  <div class="item_selector gt-md" :class="{ off: selector_type }">
    <div class="item_selector_main">
      <!-- 折叠按钮 -->
      <div class="fold_btn" @click="selector_type = !selector_type">
        <div class="fold_btn_arrow" :class="{ on: selector_type }"></div>
      </div>
      <!-- 选择器的背景 -->
      <div class="item_selector_container">
        <div class="item_selector_header"></div>
        <div class="item_selector_body"></div>
        <div class="item_selector_footer"></div>
      </div>
      <!-- 选择器的内容 -->
      <div class="item_selector_list_container">
        <q-scroll-area
          style="height: 100%; width: 100%"
          :thumb-style="{
            width: '2px',
            right: '4px',
          }"
          :bar-style="{
            borderRadius: '1px',
            backgroundColor: '#DDD8D3',
          }"
        >
          <div
            class="item_selector_item"
            v-for="(item, index) in type_list"
            :key="index"
          >
            <!-- 标题项 -->
            <div
              class="item_header row items-center justify-between"
              @click="switch_item_fold(item)"
            >
              <div class="row items-center">
                <q-img
                  :src="`/imgs/itemicon_${item.name}.png`"
                  style="width: 32px; height: 32px; margin-left: 12px"
                ></q-img>
                <span class="item_name">{{ item.name }}</span>
              </div>
              <div
                class="item_fold_btn"
                :class="{ on: get_item_fold(item) }"
              ></div>
            </div>
            <!-- 下拉项 -->
            <q-slide-transition>
              <div class="item_body row" v-show="get_item_fold(item)">
                <div class="col-12 q-pa-sm" v-if="item.name == '宝箱'">
                  <q-btn-toggle
                    dense
                    padding="8px"
                    v-model="chest_type"
                    color="toggle_btn_color"
                    toggle-color="toggle_btn_toggle_color"
                    text-color="toggle_btn_text_color"
                    unelevated
                    style="font-family: HYWH"
                    :options="[
                      { label: '宝箱品质', value: 10 },
                      { label: '宝箱形式', value: 11 },
                    ]"
                  />
                </div>
                <div
                  class="item_option row"
                  v-for="(i, index) in item_list[
                    item.typeId == 9 ? chest_type : item.typeId
                  ]"
                  :class="{
                    on:
                      selected_item_list.find(
                        (item) => item.itemId == i.itemId
                      ) != undefined,
                  }"
                  :key="index"
                  @click="insert_selected_item(i)"
                >
                  <div class="item_option_avatar">
                    <q-img
                      :src="get_itemicon(i)"
                      style="width: 48px; height: 48px"
                    ></q-img>
                  </div>
                  <div class="col" style="position: relative">
                    <span class="item_option_title ellipsis">
                      {{ i.name }}
                    </span>
                    <!-- <span class="item_option_count ellipsis">12/30</span>
                    <span class="item_option_progress">
                      <span class="item_option_progress_bar" style="width: 10%">
                      </span>
                    </span> -->
                  </div>
                </div>
              </div>
            </q-slide-transition>
          </div>
        </q-scroll-area>
        <q-inner-loading :showing="item_loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </div>
      <!-- 已选项 -->
      <div class="item_selected_bar" v-show="selected_item_list.length != 0">
        <div class="close-all" @click="closeall"></div>
        <div class="item_list">
          <q-scroll-area
            style="height: 90%; width: 100%"
            :thumb-style="{ background: 'none' }"
          >
            <div
              class="item"
              v-for="(item, index) in selected_item_list"
              :key="index"
              @click="insert_selected_item(item)"
            >
              <div class="item_close"></div>
              <q-img
                :src="get_itemicon(item)"
                style="width: 32px; height: 32px; margin: 6px 0px 5px 6px"
              ></q-img>
              <q-tooltip>{{ item.area }}-{{ item.name }}</q-tooltip>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useCounterStore } from "../stores/example-store";
import {
  query_type,
  query_itemlist,
  query_itemlayer_infolist,
  query_iconlist,
} from "../service/base_request";
import { switch_area_list } from "../api/common";
export default {
  name: "ItemSelector",
  data() {
    return {
      icon_list: [],
      test: false,
      selector_type: false,
      selected_type: 0,
      type_list: [],
      type_list_map: new Map(),
      chest_type: 10,
      item_loading: false,
      selected_item_list: [],
      item_list_map: new Map(),
      item_list: {},
      teleport_list: [],
    };
  },
  methods: {
    //切换下拉项的函数
    get_item_fold(item) {
      if (this.type_list.length != 0) {
        return this.type_list_map.get(item.name).fold;
      }
    },
    //切换下拉项的函数
    switch_item_fold(item) {
      let fold = this.type_list_map.get(item.name).fold;
      this.type_list_map.get(item.name).fold = !fold;
    },
    //改变宝箱状态
    change_chest_type() {
      this.get_itemlist(
        this.mainStore.selected_child_area.areaId,
        this.chest_type
      );
    },
    //查询类型下属的物品列表
    async get_itemlist(areaid) {
      this.item_loading = true;
      await query_itemlist({
        typeIdList: [],
        areaIdList: [areaid],
        current: 0,
        size: 999,
      }).then((res) => {
        this.teleport_list = [];
        this.item_loading = false;
        for (let i of this.type_list) {
          if (i.typeId != 9) {
            this.item_list[i.typeId] = [];
          } else {
            this.item_list[10] = [];
            this.item_list[11] = [];
          }
        }
        for (let i of res.data.data.record) {
          for (let j of i.typeIdList) {
            if (i.hiddenFlag == 0 && i.name.indexOf("测试") == -1) {
              this.item_list[j].push(i);
            }
          }
          if (i.iconStyleType == 1) {
            this.teleport_list.push(i);
          }
        }
        this.mainStore.teleport_list = this.teleport_list;
      });
    },
    //查询物品类型对应的图标
    get_itemicon(value) {
      let icon = this.icon_list.find((item) => item.name == value.iconTag);
      if (icon != undefined) {
        return icon.url;
      }
      return "https://assets.yuanshen.site/icons/-1.png";
    },
    //添加物品选项
    insert_selected_item(value) {
      //宝箱的两种属性是互斥的，只能选择其中一种
      if (value.typeIdList.includes(10)) {
        let array = [];
        for (let i of this.selected_item_list) {
          if (i.typeIdList.includes(11) == false) {
            array.push(i);
          }
        }
        this.selected_item_list = array;
      } else if (value.typeIdList.includes(11)) {
        let array = [];
        for (let i of this.selected_item_list) {
          if (i.typeIdList.includes(10) == false) {
            array.push(i);
          }
        }
        this.selected_item_list = array;
      }
      //将已选项添加进数组
      let index = this.selected_item_list.findIndex(
        (item) => item.itemId == value.itemId
      );
      if (index == -1) {
        value.area = this.mainStore.selected_child_area.name;
        this.selected_item_list.push(value);
        this.mainStore.changeitem = {
          item: value,
          type: 1,
        };
      } else {
        this.mainStore.changeitem = {
          item: this.selected_item_list[index],
          type: 0,
        };
        this.selected_item_list.splice(index, 1);
      }
      this.mainStore.selected_item_list = this.selected_item_list;
      if (value.typeIdList.includes(10) || value.typeIdList.includes(11)) {
        this.$emit("refresh");
      }
    },
    //清除所有已选项
    closeall() {
      this.selected_item_list = [];
      this.$emit("clear");
    },
  },
  mounted() {
    this.item_loading = true;
    this.$axios
      .all([
        //查询所有物品图标
        query_iconlist({
          iconIdList: [],
          typeIdList: [],
          current: 0,
          size: 9999,
        }),
        //查询所有分类
        query_type(1, {
          current: 1,
          typeIdList: [],
          size: 999,
        }),
      ])
      .then(
        this.$axios.spread((res1, res2) => {
          this.icon_list = res1.data.data.record;
          this.$emit("callback", this.icon_list);
          for (let i of res2.data.data.record) {
            if (i.hiddenFlag != 1) {
              this.type_list.push(i);
              this.type_list_map.set(i.name, {
                ...i,
                fold: false,
              });
            }
          }
          this.item_loading = false;
        })
      );
  },
  computed: {
    //请参考pinia不使用组合式api的用法的说明文档
    //https://pinia.web3doc.top/cookbook/options-api.html
    ...mapStores(useCounterStore),
  },
  watch: {
    "mainStore.selected_child_area": function (val) {
      this.get_itemlist(val.areaId);
      if (switch_area_list.includes(val.name)) {
        this.closeall();
      }
    },
  },
};
</script>
<style scoped>
</style>