import { Notify, Cookies } from "quasar";
import { useUserStore } from "../stores/user";
import { useSavedStore } from "../stores/saved";
import { formatDate } from "../utils/index";
import { getGistList } from "../service/gist_request";

// export const getAccountList = (params: AccountParams) =>
//   defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const loadUserData = () => {
  console.log("loadUserData");
  const userStore = useUserStore();
  const savedStore = useSavedStore();
  getGistList(userStore.getAccessToken)
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
      savedStore.setGists(res);
      savedStore.setFiles(user_files);
    })
    .catch((err) => {});
};
