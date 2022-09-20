<!-- 地区选择器 -->
<template>
  <!-- 电脑版 -->
  <div class="area_selector gt-sm">
    <div class="area_selector_container">
      <!-- 右方地区信息和切换部分 -->
      <div
        class="area_selector_fold"
        @click="switch_area_show"
        v-if="selected_area.name != undefined"
      >
        <div class="row">
          <div class="area_info">
            <div class="row justify-end" style="margin-top: 10px">
              <div class="row items-center area_switch_btn">
                <span class="area_switch_btn_icon"></span>
                <span class="area_switch_btn_text">更换地区</span>
              </div>
              <div class="area_name">{{ selected_area.name }}</div>
            </div>
            <div class="selected_area_child_name">
              当前选择 - {{ selected_child_area.name }}
            </div>
          </div>
          <div class="area_icon">
            <q-img
              :src="`/imgs/${selected_area.name}_Color.png`"
              spinner-color="white"
            />
          </div>
        </div>
      </div>
      <!-- 地区选择器的展开部分 -->
      <div class="area_selector_unfold" v-show="area_selector_show">
        <!-- <span class="area_selector_icon"></span> -->
        <div class="parent_selector row justify-center">
          <div class="row">
            <div
              v-for="(item, index) in area_list"
              :key="index"
              class="row area_type_containor items-center justify-center"
              @click="change_area(item)"
            >
              <q-img
                v-if="selected_area.areaId != item.areaId"
                :src="`/imgs/${item.name}_off.png`"
                style="height: 72px; width: 72px"
                no-spinner
              ></q-img>
              <q-img
                v-else
                :src="`/imgs/Light_${item.name}.png`"
                style="height: 120x; width: 120px"
                no-spinner
              ></q-img>
            </div>
          </div>
        </div>
        <!-- 展开部分的子地区部分 -->
        <div class="child_selector row justify-center">
          <div class="col-12 row justify-center">
            <div class="area_name">
              <span>{{ selected_area.name }}</span>
            </div>
          </div>
          <div class="child_area_list col-6 row justify-center items-center">
            <div
              class="child_area col-shrink"
              :class="{ on: selected_child_area.areaId == item.areaId }"
              v-for="(item, index) in child_area_list"
              :key="index"
              @click="change_child_area(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useCounterStore } from "../stores/example-store";
import { query_area } from "../service/base_request";
import { openURL } from "quasar";
export default {
  name: "AreaSelector",
  data() {
    return {
      selected_area: {},
      selected_child_area: {},
      area_list: [],
      child_area_list_map: new Map(),
      child_area_list: [],
      area_selector_show: true,
    };
  },
  methods: {
    openURL,
    //切换地区选择器的显隐
    switch_area_show() {
      this.area_selector_show = !this.area_selector_show;
    },
    //切换主地区的触发事件
    async change_area(area) {
      this.selected_area = area;
      if (this.child_area_list_map.get(area.name) == undefined) {
        await query_area({
          isTraverse: true,
          parentId: area.areaId,
        }).then((res) => {
          this.child_area_list_map.set(area.name, res.data.data);
        });
      }
      this.child_area_list = this.child_area_list_map.get(area.name);
      this.selected_child_area = this.child_area_list[0];

      this.mainStore.selected_child_area = this.selected_child_area;
    },
    //切换子地区的触发事件
    change_child_area(area) {
      this.selected_child_area = area;
      this.mainStore.selected_child_area = area;
      this.area_selector_show = false;
    },
  },
  mounted() {
    //查询地区信息
    query_area({
      isTraverse: false,
      parentId: -1,
    }).then((res) => {
      this.selected_area = res.data.data[0];
      for (let i of res.data.data) {
        if (i.hiddenFlag != 1) {
          this.area_list.push(i);
        }
      }
      this.change_area(this.selected_area);
    });
  },
  computed: {
    //请参考pinia不使用组合式api的用法的说明文档
    //https://pinia.web3doc.top/cookbook/options-api.html
    ...mapStores(useCounterStore),
  },
};
</script>