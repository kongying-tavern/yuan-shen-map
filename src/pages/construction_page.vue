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
import { getGistList } from "../service/gist_request";
import { useUserStore } from "../stores/user";
import { useSavedStore } from "../stores/saved";
import { create_notify } from "../api/common";
import { formatDate } from "../utils/index";
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
    loadUserData(access_token) {
      getGistList(access_token)
        .then((result) => {
          console.log("loadUserData", result.data);
          const res = result.data;

          let user_files = [];
          for (let obj of res) {
            let currentKey = Object.keys(obj.files)[0];
            if (currentKey == "Data_KYJG") {
              const currentData = obj.files[Object.keys(obj.files)[0]].content;
              const lastUpdateTime = formatDate(new Date(obj.updated_at));
              const createdTime = formatDate(new Date(obj.created_at));
              const description = obj.description;
              console.log(description);
              const id = obj.id;
              console.log(id);
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
    parseUserData() {},
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
          this.loadUserData(access_token);
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
