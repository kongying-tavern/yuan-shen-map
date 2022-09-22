<template>
  <div>
    <div class="extra_btn row">
      <div
        class="btn feedback"
        @click="openURL('https://yuanshen.site/docs/communication-group.html')"
      >
        <q-tooltip> 加入讨论组 </q-tooltip>
      </div>
      <div
        class="btn discuss"
        @click="openURL('https://support.qq.com/product/321980')"
      >
        <q-tooltip> 反馈/建议 </q-tooltip>
      </div>
      <div
        class="btn save"
        @click="openURL('https://yuanshen.site/docs/download-client.html')"
      >
        <q-tooltip> 下载客户端 </q-tooltip>
      </div>
      <div class="btn" @click="check_log_state">
        <!-- icon="mdi-content-save" -->
        <q-avatar
          rounded
          size="64px"
          font-size="64px"
          text-color="white"
          :icon="loginIcon"
        >
        </q-avatar>
      </div>
    </div>
    <q-dialog v-model="save_window" v-if="isLogin">
      <q-card style="max-width: 100vw">
        <q-card-section>
          <q-table
            title="存档列表"
            :rows="save_data"
            :columns="save_columns"
            row-key="id"
            selection="single"
            v-model:selected="selected"
            hide-pagination
            hide-bottom
            style="min-width: 70vh"
            :pagination="initialPagination"
          >
            <!-- 表格头插槽 -->
            <template v-slot:top-right>
              <div class="row">
                <q-btn
                  color="primary"
                  style="margin-right: 15px"
                  label="注销"
                  @click="logoutConfirm"
                />
                <q-btn
                  color="primary"
                  label="新增存档"
                  style="margin-right: 15px"
                  @click="addGist"
                />
                <q-btn
                  color="primary"
                  label="同步"
                  :disabled="selected.length == 0"
                />
              </div>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td width="52">
                  <q-checkbox
                    dense
                    v-model="props.selected"
                    color="orange-12"
                  />
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="lastUpdateTime" :props="props">
                  {{ props.row.lastUpdateTime }}
                </q-td>
                <q-td key="action" :props="props">
                  <q-btn
                    round
                    color="primary"
                    icon="edit"
                    @click="renameSaved(props.row)"
                  >
                    <q-tooltip
                      anchor="center left"
                      self="center right"
                      :offset="[10, 10]"
                    >
                      <strong>编辑存档</strong>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    color="primary"
                    icon="content_copy"
                    style="margin-left: 12px"
                    @click="copySaved(props.row)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <strong>复制存档</strong>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    color="red"
                    icon="delete"
                    style="margin-left: 12px"
                    @click="deleteSaved(props.row)"
                  >
                    <q-tooltip
                      anchor="center right"
                      self="center left"
                      :offset="[10, 10]"
                    >
                      <strong>删除存档</strong>
                    </q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!-- 功能按钮 -->
</template>

<script>
import { openURL } from "quasar";
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";
import { useSavedStore } from "../stores/saved";
import {
  addGistFile,
  deleteGistFile,
  updateGistDescription,
} from "../service/gist_request";

export default {
  name: "ExtraBtn",
  data() {
    return {
      save_window: false,
      save_data: [],
      save_columns: [
        // { name: "id", label: "ID", field: "id" },
        {
          name: "description",
          label: "存档名",
          field: "description",
          align: "left",
        },
        {
          name: "lastUpdateTime",
          label: "最后更新时间",
          field: "lastUpdateTime",
          align: "left",
        },
        { name: "action", label: "操作", field: "", align: "left" },
      ],
      selected: [],
      initialPagination: {
        // sortBy: "desc",
        // descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  mounted() {
    this.save_data = this.savedStore.getFiles;
  },
  computed: {
    ...mapStores(useUserStore, useSavedStore),
    isLogin() {
      return !!this.userStore.getAccessToken;
    },
    loginIcon() {
      return this.isLogin
        ? `img:${(this.userStore.getUserInfo || {}).avatar_url}`
        : "mdi-content-save";
    },
  },
  methods: {
    openURL,
    logoutConfirm() {
      this.$q
        .dialog({
          title: "提示",
          message: "确定要注销账户吗?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          // console.log(">>>> OK");
          this.logout();
        });
    },
    logout() {
      // 本地状态更新
      this.userStore.resetState();
    },
    check_log_state() {
      // 已登录->用户注销
      if (this.userStore.getAccessToken) {
        // console.log("用户注销");
        this.save_window = true;
      } else {
        // 未登录->oAuth
        this.log_to_gitee();
      }
    },
    log_to_gitee() {
      this.$q
        .dialog({
          title: "跳转提示",
          html: true,
          message: `<div class="text-bold">你即将跳转至gitee进行登录授权</div>
          <div class="text-red text-bold">请记住，空荧酒馆所属产品不会以*任何理由*要求用户使用米哈游通行证登录</div>
          `,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          const client_id =
            "bbb8c4dbf4d5256ea8f3b5d2080893a166ebc9b7bb91ef09107c3922f5b16a1e";
          const redirect_uri = "http://localhost:9000/";
          const url = `https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

          window.location.href = url;
        });
    },
    addGist() {
      this.$q
        .dialog({
          title: "提示",
          message: "请输入存档名称",
          prompt: {
            model: "",
            isValid: (val) => val.length > 0,
            type: "text", // optional
          },
          cancel: true,
          persistent: false,
        })
        .onOk((data) => {
          // console.log(">>>> OK, received", data);
          addGistFile(this.userStore.getAccessToken, data).then((result) => {
            this.$q.notify({
              message: "存档创建成功！",
              position: "top",
              type: "positive",
            });
          });
        });
    },
    deleteSaved(row) {
      const { id: fileID } = row;

      this.$q
        .dialog({
          title: "提示",
          message: "存档删除后不可恢复，您确定要删除这个存档吗？",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          deleteGistFile(this.userStore.getAccessToken, fileID).then(
            (result) => {
              this.$q.notify({
                message: "存档删除成功！",
                position: "top",
                type: "positive",
              });
            }
          );
        });
    },
    renameSaved(row) {
      this.$q
        .dialog({
          title: "提示",
          message: "请输入新的存档名称",
          prompt: {
            model: row.description || "",
            isValid: (val) => val.length > 0,
            type: "text", // optional
          },
          cancel: true,
          persistent: false,
        })
        .onOk((data) => {
          updateGistDescription(
            this.userStore.getAccessToken,
            row.id,
            data
          ).then((result) => {
            console.log("renameSaved", result);
            this.$q.notify({
              message: "存档名修改成功！",
              position: "top",
              type: "positive",
            });
          });
        });
    },
    copySaved(row) {},
  },
};
</script>

<style></style>
