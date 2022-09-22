<template>
  <q-layout class="main">
    <!-- 地图容器 -->
    <div class="map_overlay"></div>
    <div class="map_containor">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div id="map"></div>
      <q-inner-loading :showing="loading" style="z-index: 2000">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
    <!-- 地区选择器 -->
    <area-selector></area-selector>
    <!-- 物品筛选器 -->
    <item-selector
      @callback="item_selector_callback"
      @clear="clearall"
      @refresh="refresh_layergroup"
    ></item-selector>
    <!-- 地图上点位的弹窗 -->
    <div id="popup_window" ref="window" v-show="popup_window_show">
      <popup-window
        :layer="handle_layer"
        @callback="popup_callback"
        @close="close_popup"
      ></popup-window>
    </div>
    <!-- 左下侧各种开关 -->
    <div class="switch_list">
      <div class="switch row items-center">
        <div
          class="switch_btn"
          :class="{ on: teleport_state }"
          @click="teleport_switch"
        ></div>
        <div class="text">传送点位</div>
      </div>
      <div class="switch row items-center">
        <div
          class="switch_btn"
          :class="{ on: completion_state }"
          @click="completion_switch"
        ></div>
        <div class="text">完成点位</div>
      </div>
    </div>
    <!-- 左上侧各种开关 -->
    <extra-btn></extra-btn>
  </q-layout>
</template>

<script>
import ItemSelector from "../components/item_selector.vue";
import AreaSelector from "../components/area_selector.vue";
import PopupWindow from "../components/popup_window.vue";
import ExtraBtn from "../components/extra_btn.vue";
import { init_map } from "../api/map";
import { mapStores } from "pinia";
import { useCounterStore } from "../stores/example-store";
import { useUserStore } from "../stores/user";
import { useSavedStore } from "../stores/saved";
import { layergroup_register, layer_mark, layer_register } from "../api/layer";
import { query_itemlayer_infolist } from "../service/base_request";
import { switch_area_list, data_statistics } from "../api/common";
import { getGistList } from "../service/gist_request";
import { formatDate } from "../utils/index";

export default {
  name: "IndexPage",
  data() {
    return {
      loading: false,
      icon_list: [],
      item_list: [],
      popup_window_show: false,
      handle_layer: null,
      handle_layergroup: null,
      teleport_state: false,
      completion_state: false,
    };
  },
  components: {
    ItemSelector,
    AreaSelector,
    PopupWindow,
    ExtraBtn,
  },
  methods: {
    loadUserData(access_token) {
      getGistList(access_token)
        .then((result) => {
          // console.log("loadUserData", result.data);
          const res = result.data;

          let user_files = [];
          for (let obj of res) {
            let currentKey = Object.keys(obj.files)[0];
            if (currentKey == "Data_KYJG") {
              const currentData = obj.files[Object.keys(obj.files)[0]].content;
              const lastUpdateTime = formatDate(new Date(obj.updated_at));
              const createdTime = formatDate(new Date(obj.created_at));
              const description = obj.description;
              // console.log(description);
              const id = obj.id;
              // console.log(id);
              const tempFile = {
                id: id,
                description: description,
                lastUpdateTime: lastUpdateTime,
                data: currentData,
                createdTime: createdTime,
              };
              user_files.push(tempFile);

              // if (currentID == id) {
              //   IDSync = true;
              //   var tempLastUpdateTime = lastUpdateTime;
              //   if (currentTime == lastUpdateTime) {
              //     TimeSync = true;
              //   }
              // }
            }
          }

          // 状态管理
          this.savedStore.setGists(res);
          this.savedStore.setFiles(user_files);
        })
        .catch((err) => {});
    },
    //返回图标数组
    item_selector_callback(value) {
      this.icon_list = value;
    },
    //查询物品类型对应的图标
    get_itemicon(value) {
      let icon = this.icon_list.find((item) => item.name == value.iconTag);
      if (icon != undefined) {
        return icon.url;
      }
      return "https://assets.yuanshen.site/icons/-1.png";
    },
    //切换点位的显隐
    switch_layergroup(value) {
      //添加点位组
      if (value.type == 1) {
        //如果没有点位缓存，则请求点位信息
        if (!this.layergroup_map.has(value.item.itemId)) {
          this.loading = true;
          query_itemlayer_infolist({
            typeIdList: [],
            areaIdList: [],
            itemIdList: [value.item.itemId],
            getBeta: 0,
          }).then((res) => {
            let iconurl = this.get_itemicon(value.item);
            let layergroup = layergroup_register(res.data.data, iconurl);
            layergroup.eachLayer((layer) => {
              layer.bindPopup(this.$refs.window);
              layer.on({
                popupopen: (layer) => {
                  this.handle_layer = layer;
                  this.popup_window_show = true;
                  this.handle_layergroup = layergroup;
                },
              });
              let arr = JSON.parse(localStorage.getItem("marked_layers"));
              let layerid = layer.options.data.id;
              if (arr.includes(layerid)) {
                layer_mark(layer);
              }
            });
            this.map.addLayer(layergroup);
            this.layergroup_map.set(value.item.itemId, layergroup);
            this.loading = false;
          });
          //否则使用缓存
        } else {
          let layergroup = this.layergroup_map.get(value.item.itemId);
          layergroup.eachLayer((layer) => {
            layer_mark(layer, "on");
            let arr = JSON.parse(localStorage.getItem("marked_layers"));
            let layerid = layer.options.data.id;
            if (arr.includes(layerid)) {
              layer_mark(layer);
            }
          });
          this.map.addLayer(layergroup);
        }
        //移除点位组
      } else {
        let layergroup = this.layergroup_map.get(value.item.itemId);
        this.map.removeLayer(layergroup);
      }
    },
    //刷新点位
    refresh_layergroup() {
      this.loading = true;
      this.clearall();
      for (let i of this.layergroup_map.keys()) {
        if (
          this.mainStore.selected_item_list.find((item) => item.itemId == i) !=
          undefined
        ) {
          this.map.addLayer(this.layergroup_map.get(i));
        }
      }
      this.loading = false;
    },
    //清除所有点位
    clearall() {
      for (let i of this.layergroup_map.values()) {
        this.map.removeLayer(i);
      }
    },
    //弹窗的标记功能
    popup_callback(layer) {
      let marklayer = this.handle_layergroup.getLayer(layer.target._leaflet_id);
      layer_mark(marklayer);
      let layerid = layer.target.options.data.id;
      let arr = JSON.parse(localStorage.getItem("marked_layers"));
      let index = arr.findIndex((item) => item == layerid);
      if (index == -1) {
        arr.push(layerid);
        localStorage.setItem("marked_layers", JSON.stringify(arr));
      } else {
        arr.splice(index, 1);
        localStorage.setItem("marked_layers", JSON.stringify(arr));
      }
    },
    //关闭弹窗
    close_popup() {
      this.map.closePopup();
    },
    //查询并生成该地区的传送点
    teleport_layer_init() {
      console.log(this.mainStore.selected_child_area);
      if (this.teleport_group != null) {
        this.map.removeLayer(this.teleport_group);
      }
      if (
        !this.teleport_map.has(`${this.mainStore.selected_child_area.name}`)
      ) {
        this.loading = true;
        let item_list = [];
        let icon_list = [];
        for (let i of this.mainStore.teleport_list) {
          item_list.push(i.itemId);
          icon_list.push({
            itemId: i.itemId,
            itemName: i.name,
            iconurl: this.get_itemicon(i),
          });
        }
        let layergroup = layergroup_register();
        query_itemlayer_infolist({
          typeIdList: [],
          areaIdList: [],
          itemIdList: item_list,
          getBeta: 0,
        }).then((res) => {
          for (let i of res.data.data) {
            let iconurl = icon_list.find(
              (item) => item.itemId == i.itemList[0].itemId
            ).iconurl;
            let iconname = icon_list.find(
              (item) => item.itemId == i.itemList[0].itemId
            ).itemName;
            let marker = layer_register(i, iconurl, iconname);
            layergroup.addLayer(marker);
          }
          layergroup.eachLayer((layer) => {
            layer.bindPopup(this.$refs.window);
            layer.on({
              popupopen: (layer) => {
                this.handle_layer = layer;
                this.popup_window_show = true;
                this.handle_layergroup = layergroup;
              },
            });
          });
          this.teleport_map.set(
            `${this.mainStore.selected_child_area.name}`,
            layergroup
          );
          this.teleport_group = layergroup;
          this.map.addLayer(this.teleport_group);
          this.loading = false;
        });
      } else {
        this.map.removeLayer(this.teleport_group);
        this.teleport_group = this.teleport_map.get(
          `${this.mainStore.selected_child_area.name}`
        );
        this.map.addLayer(this.teleport_group);
      }
    },
    //切换传送点位显隐
    teleport_switch() {
      this.teleport_state = !this.teleport_state;
      if (this.teleport_state) {
        this.teleport_layer_init();
      } else {
        this.map.removeLayer(this.teleport_group);
      }
    },
    //切换完成点位显隐
    completion_switch() {
      this.completion_state = !this.completion_state;
      // TODO 完成点位
    },
  },
  mounted() {
    if (this.$q.platform.is.mobile) {
      alert("测试版暂未开放手机端使用，请切换至电脑端以正常使用");
    }
    //生成地图和点位组map对象
    this.map = init_map();
    this.teleport_group = null;
    this.layergroup_map = new Map();
    this.teleport_map = new Map();
    //点位缓存
    if (localStorage.getItem("marked_layers") == null) {
      localStorage.setItem("marked_layers", JSON.stringify([]));
    }
    if (this.userStore.getAccessToken) {
      this.loadUserData(this.userStore.getAccessToken);
    }
  },
  computed: {
    //请参考pinia不使用组合式api的用法的说明文档
    //https://pinia.web3doc.top/cookbook/options-api.html
    ...mapStores(useCounterStore, useSavedStore, useUserStore),
  },
  watch: {
    "mainStore.selected_child_area": function (val, oldval) {
      if (
        switch_area_list.includes(val.name) ||
        switch_area_list.includes(oldval.name)
      ) {
        this.map.remove();
        this.map = init_map(val.name);
        this.clearall();
      }
    },
    "mainStore.changeitem": function (val) {
      this.switch_layergroup(val);
    },
    "mainStore.teleport_list": function (val) {
      if (this.teleport_state) {
        this.teleport_layer_init();
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://yuanshen.site/css/background.css");
@import "../css/map.scss";
@import "../css/selector.scss";
.map_containor {
  position: relative;
}
</style>
