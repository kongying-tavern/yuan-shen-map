<template>
  <div class="bg">
    <div class="infos">
      <span class="icon"></span>
      <div class="title1">网页版地图正在施工中</div>
      <div class="row justify-center" style="margin-top: 15px">
        <div class="btn">
          <div class="btn-text" @click="to_index">试用测试版</div>
        </div>
      </div>
      <div class="row justify-center" style="margin-top: 15px">
        <div class="title3">或者，不妨来试试全新的</div>
        <span class="title3_hint">3.0地图客户端版本</span>
      </div>
      <div class="row justify-center" style="margin-top: 15px">
        <div class="btn">
          <div
            class="btn-text"
            @click="openURL('https://yuanshen.site/docs/download-client.html')"
          >
            前往下载
          </div>
        </div>
        <div class="btn">
          <div
            class="btn-text"
            @click="openURL('https://yuanshen.site/index.html')"
          >
            浏览旧版地图
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openURL } from "quasar";
import { mapStores } from "pinia";
import { get_access_token, get_userinfo } from "../service/user_request";

import { useUserStore } from "../stores/user";
import { useSavedStore } from "../stores/saved";
import { create_notify } from "../api/common";

export default {
  name: "ConstructionPage",
  methods: {
    openURL,
    to_index() {
      this.$router.push("/index");
    },
    getUserInfo(access_token) {
      get_userinfo(access_token)
        .then((result) => {
          // console.log("get_userinfo", result.data);
          this.userStore.setUserInfo(result.data);
          // 重定向
          this.$router.push("/index");
        })
        .catch((err) => {});
    },
  },
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useUserStore, useSavedStore),
  },
  mounted() {
    const { code } = this.$route.query;
    if (code) {
      get_access_token(code)
        .then((result) => {
          const { access_token, expires_in, refresh_token } = result.data;
          this.userStore.setAccessToken(access_token);
          this.userStore.setRefreshToken(refresh_token);
          // access_token 获取用户信息
          this.getUserInfo(access_token);
          // this.loadUserData(access_token);
          // 存储
          create_notify("登录成功！", "positive");
        })
        .catch((err) => {});
    }
    // console.log(this.$router, this.$route.params, this.$route.query);
    // console.log(
    //       `${chalk.gray(">")} VuePress dev server listening at ${chalk.cyan(
    //         displayUrl
    //       )}`
  },
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: #424b63;
  overflow: hidden;
  .infos {
    width: 100vw;
    position: absolute;
    top: 100px;
  }
  .icon {
    display: block;
    width: 119px;
    height: 202px;
    margin: 0 auto;
    background: url(/imgs/construction_title_icon.png) no-repeat;
  }
  .title1 {
    width: 100%;
    margin: 40px 0 0 0;
    text-align: center;
    font-size: 34px;
    color: #fff;
  }
  .title2 {
    width: 100%;
    margin: 16px 0 0 0;
    text-align: center;
    font-size: 20px;

    color: #374056;
  }
  .title3 {
    text-align: center;
    font-size: 28px;

    color: #fff;
  }
  .title3_hint {
    text-align: center;
    font-size: 28px;

    color: #ffc147;
  }
  .btn {
    width: 327px;
    height: 88px;
    background: url(/imgs/construction_btn.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 35px 0;
    cursor: pointer;
    .btn-text {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 32px;
      color: #424b63;
      line-height: 88px;
    }
  }
  @media screen and (max-width: 400px) {
    .btn {
      zoom: 0.45;
    }
    .infos {
      top: 50px;
    }
  }
}
</style>
