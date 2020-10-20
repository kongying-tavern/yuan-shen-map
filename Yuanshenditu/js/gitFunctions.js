/*
  http://ddns.minemc.top:8848/auth/auth/
  点击登录，跳到gitee授权界面的方法，写在按钮的href中。

/*
	获取用户存档列表
	用户的access_token在session中
	调用后，fileNames参数会填入用户存档名的列表,原神uid，如['uid1','uid2','uid3']
	fileContents参数会填入上述存档对应的标记值，如[['1_1','26_1'],['1_2','26_2'],['27_1','27_12','27_13']]
*/

var user_fileNames = [];
var user_fileContents = [];
var user_fileIds = [];
var tokenPara;

function getToken() {
  if (window.location.search !== undefined && window.location.search !== "") {
    tokenPara = GetQueryString("access_token");
    console.log("token: " + tokenPara);
    var fileName = window.prompt("请输入原神UID");
    console.log(fileName)
    addNewFile(fileName);
  } else {
    // alert("no token found.");
    window.open('http://ddns.minemc.top:8848/auth/auth/');
  }
}

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

/*
	上传存档
	fileName 当前需要上传的存档名
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

/*
	添加issue
	issueName 提交的issue标题，可以为资源名，如蒙德宝箱164
	issueContent issue的具体内容
	issueLabels issue的标签逗号隔开 如 "宝箱,错点"
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
      //把存档的值存储(请根据实际情况修改这部分)
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
