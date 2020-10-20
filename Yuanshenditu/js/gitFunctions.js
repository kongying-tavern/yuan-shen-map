//@ts-check
/**
 * @typedef {Array} user_fileNames 用户存档名的列表,喜欢啥填啥，如['uid1','小号','各种号']
 * @typedef {Array} user_fileContents 存档对应的标记值，如[['1_1','26_1'],['1_2','26_2'],['27_1','27_12','27_13']]
 * @typedef {Array} user_fileIds 暂时不知道这是啥
 */

/** @type {Array.<string>} */ var user_fileNames = [];
/** @type {Array.<string>} */ var user_fileContents = [];
/** @type {Array.<string>} */ var user_fileIds = [];

/** @type {string} 用户 token 参数*/ var tokenPara;

/**跳转到登录 */
function jumpLogin() {
  window.open("http://ddns.minemc.top:8848/auth/auth/");
}
/**
 * 获取 token
 *
 * true : 写入 tokenPara
 *
 * false: 跳转登录 / 使用本地离线
 *
 * @returns {true | false}
 */
function getToken() {
  if (window.location.search !== undefined && window.location.search !== "") {
    tokenPara = GetQueryString("access_token");
    return true;
  } else {
    return false;
  }
}
/**
 * tokenPara 正确 调用上传存档
 *
 * 不正确 跳转登录 / 本地存档
 */
function upLoadSaveData() {
  if (tokenPara !== undefined && tokenPara !== "") {
    var fileName = window.prompt("请输入存档名");
    console.log(fileName);
    addNewFile(fileName);
  } else {
    if (window.confirm("使用云存档必须登录, 要立刻登录吗?")) {
      jumpLogin();
    } else {
      //TODO : 调用本地存档
      console.log("用户取消操作");
    }
  }
}

/**
 * 内部函数 禁止外调
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

  var r = window.location.search.substr(1).match(reg);

  if (r != null) return unescape(r[2]);
  return null;
}

//本地数据检测
// function getLocalStorageKey() {
//   if (localStorage.key(1) != null) {
//     var uid = window.prompt("检测到本地数据,请绑定原神UID");
//     if (uid != null && uid != "") {
// 	  user_fileNames.push(uid);
// 	  addNewFile();
//     } else {
//       var confirmDelete = window.confirm("绑定取消，删除本地数据？");
//       if (confirmDelete == true) {
//         var reConfirmDelete = window.confirm("真的要删除本地数据吗？");
//         if (reConfirmDelete == true) {
//           localStorage.clear();
//         }
//       } else {
//         console.log("用户取消删除操作");
//       }
//     }
//   } else {
//     alert("没有本地数据");
//   }
// }

/**
 * 云端获取文件列表
 *
 */
function getFileList() {
  var url = "http://ddns.minemc.top:8848/file/getFileList";
  var access_token = "";

  if (tokenPara !== null) {
    access_token = tokenPara;
  }
  var data = {
    access_token: access_token,
  };
  var success = function (res) {
    if (res.data === "login") {
      alert("未登录gitee账号或者登录已过期！");
    } else {
      user_fileNames = res.data.fileNames;
      user_fileContents = res.data.fileContents;
      user_fileIds = res.data.fileIds;
      alert("同步完成");
    }
  };
  let err = function (msg) {
    alert(msg);
  };
  $.ajax({
    async: false,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}

/**
 *上传存档
 *
 *@param fileName {string} 当前需要上传的存档名
 *
 * tips: 上传完成会调用 getFileList() 同步数据
 */
function addNewFile(fileName) {
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var success = function (res) {
    if (res === "login") {
      alert("未登录gitee账号或者登录已过期！");
    } else {
      // if (user_fileNames.length == 0) {
      //   uid = window.prompt("请输入第一个原神UID");
      //   if (uid != null && uid != "") {
      //     user_fileNames.push(uid);
      //   }
      // } else {
      //   uid = window.prompt("增加一个原神UID");
      //   if (uid != null && uid != "") {
      //     user_fileNames.push(uid);
      //   }
      // }
      //把存档的值存储(请根据实际情况修改这部分)
      alert("上传完成");
      getFileList();
    }
  };
  let err = function (msg) {
    alert(msg);
  };
  var url = "http://ddns.minemc.top:8848/file/addNewFile";
  var data = {
    access_token: tokenPara,
    fileName: fileName,
    fileContent: markersData,
  };
  $.ajax({
    async: false,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}

/*
	导入存档
	不需要调后台，因为查过了，number传入当前需要导入的存档在数组中的序号
	导入会丢失现在存档，如需要请加备份提示
*/
function loadFile(number) {
  localStorage.clear();
  var markerLogArr = user_fileContents(number);
  for (var i = 0; i < markerLogArr.length; i++) {
    localStorage.setItem(markerLogArr[i], "1");
  }
  alert("导入该存档成功!");
}

/*
  删除存档，number传入当前需要导入的存档在数组中的序号
  <注意：这个是调接口的删除，未上传的存档删除直接从数组中delete就行>
*/
function deleteFile(number) {
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var url = "http://ddns.minemc.top:8848/file/deleteFile";
  var data = {
    access_token: tokenPara,
    fileId: user_fileIds[number],
  };
  var success = function (res) {
    if (res === "login") {
      alert("未登录gitee账号或者登录已过期！");
    } else {
      //把存档的值删除(请根据实际情况修改这部分)
      user_fileNames.splice(number, 1);
      user_fileContents.splice(number, 1);
      user_fileIds.splice(number, 1);
    }
  };
  let err = function (msg) {
    alert(msg);
  };
  $.ajax({
    async: false,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}

/**
 * 添加issue
 * @param issueName {string} 提交的issue标题，可以为资源名，如蒙德宝箱164
 * @param issueContent {string | string[]}issue的具体内容
 * @param issueLabels {string | string[]} issue的标签逗号隔开 如 "宝箱,错点"
 */
function createIssue(issueName, issueContent, issueLabels) {
  var url = "http://ddns.minemc.top:8848/file/createIssue";
  var data = {
    access_token: tokenPara,
    issueName: issueName,
    issueContent: issueContent,
    issueLabels: issueLabels,
  };
  var success = function (res) {
    if (res === "login") {
      alert("未登录gitee账号或者登录已过期！");
    } else {
      alert("提交成功！");
    }
  };
  let err = function (msg) {
    alert(msg);
  };
  $.ajax({
    async: false,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}

/*
	上传base64文件：未测试
*/
function uploadBase64(filePath, fileName, imgBase64) {
  var url = "http://ddns.minemc.top:8848/upload/uploadBase64";
  var data = {
    filePath: filePath,
    fileName: fileName,
    imgBase64: imgBase64,
  };
  var success = function (res) {
    alert("操作完成!");
  };
  let err = function (msg) {
    alert(msg);
  };
  $.ajax({
    async: false,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}
