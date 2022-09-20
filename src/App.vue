<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    console.log(
      "Kongying Tavern Genshin SPA V3.0\nhttps://gitee.com/KYJGYSDT/yuanshenmap_v3"
    );
  },
});
</script>
