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

/**
 *新建存档 by giteeGist
 *
 */
function addGistFile(access_token, savedName = "", content = "[]") {
  // var markersJsonData = {
  //   content: JSON.stringify(transStampToId(markersData)),
  // };
  let requestData = {
    access_token: access_token,
    description: savedName,
    files: {
      Data_KYJG: {
        content: content,
      },
    },
  };
  return axios({
    method: "post",
    url: "https://yuanshen.site/giteegist/",
    data: requestData,
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

/**
 *删除存档 by giteeGis
 *
 */
function deleteGistFile(access_token, fileID) {
  return axios({
    method: "delete",
    url: `https://yuanshen.site/giteegist/${fileID}?access_token=${access_token}`,
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
/**
 *修改存档备注 by giteeGist
 *
 *@param fileID {string} 需要修改的存档ID
 *
 */
function updateGistDescription(access_token, fileID, savedName) {
  let requestData = {
    access_token: access_token,
    description: savedName,
  };
  // let formData = new FormData();
  // for (let key in data) {
  //   formData.append(key, data[key]);
  // }
  return axios({
    method: "patch",
    url: `https://yuanshen.site/giteegist/${fileID}`,
    data: requestData,
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
export { getGistList, addGistFile, deleteGistFile, updateGistDescription };
