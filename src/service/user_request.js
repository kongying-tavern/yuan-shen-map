import axios from "axios";
import { create_notify } from "../api/common";
//游客权限认证
function quest_request() {
  return axios({
    method: "post",
    url: "https://cloud.yuanshen.site/oauth/token",
    params: {
      scope: "all",
      grant_type: "client_credentials",
    },
    headers: {
      Authorization: `Basic Y2xpZW50OnNlY3JldA==`,
    },
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

// 返回 access_token
function get_access_token(code) {
  // const code = "";
  const client_id =
    "bbb8c4dbf4d5256ea8f3b5d2080893a166ebc9b7bb91ef09107c3922f5b16a1e";
  const client_secret =
    "ca8742806ee13b03326101140525e038277c8d4019f25a8896de80a58e50b4fe";
  const redirect_uri = "http://localhost:9000/";
  let url = `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}`;

  return axios({
    method: "post",
    url: url,
    // params: {
    //   scope: "all",
    //   grant_type: "client_credentials",
    // },
    // headers: {
    //   Authorization: `Basic Y2xpZW50OnNlY3JldA==`,
    // },
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

export { quest_request, get_access_token };
