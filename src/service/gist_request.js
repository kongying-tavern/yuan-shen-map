import axios from "axios";
import { create_notify } from "../api/common";

/**
 * giteeGist获取文件列表
 *
 */
function getGistList(access_token) {
  return axios({
    method: "get",
    url: `https://yuanshen.site/giteegist/?access_token=${access_token}`,
  }).catch((error) => {
    if (error.response) {
      create_notify(
        `${error.response.status} ${error.response.statusText}`,
        "negative"
      );
    } else if (error.request) {
      create_notify("链接失败，请稍后重试", "negative");
    } else {
      create_notify(error.message, "negative");
    }
  });
}

export { getGistList };
