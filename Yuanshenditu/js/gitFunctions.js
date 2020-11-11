//@ts-check
/**
 * @typedef {Array} user_fileNames 用户存档名的列表,喜欢啥填啥，如['uid1','小号','各种号']
 * @typedef {Array} user_fileContents 存档对应的标记值，如[['1_1','26_1'],['1_2','26_2'],['27_1','27_12','27_13']]
 * @typedef {Array} user_fileIds 暂时不知道这是啥
 */

/** @type {Array.<string>} */
var user_fileNames = [];
/** @type {Array.<string>} */
var user_fileContents = [];
/** @type {Array.<string>} */
var user_fileIds = [];

/** @type {Array.<object>} */
var user_files = [];

/** @type {string} 用户 token 参数*/
var tokenPara;

/** @type {boolean} 首次检测同步确认*/
var confirmSync = true;

/** @type {boolean} 同步检测*/
var isSync = false;

/** @type {boolean} 同步检测*/
var isCopy = false;

/** @type {boolean} 同步检测*/
var isFirstLogin = true;

/** @type {boolean} 是否可开存档框*/
var canOpenSave = false;

/*app客户端数组*/
var array_Client = [
  ["3ffe859147c8a1e0dd42d3ffb2fa4b24e9e2f92f07450931edbe17e88f7adce5", "529b2e91c921a24f44e0199a9beee7e4967df6933eadcd30274c8a762103905b"],
  ["9b0a30db936b5955e86c57a9b3f0d3ceb30ecad3b5ae695878e1dcda41eb7d27", "b4c8f122ac1f1ea79ea4b4f54cb8534a1d0ea575612be49c40dd05ea33b38972"],
  ["7cb3db1eaa7962a93b0b2a033f1f27a7e28211df7eb487991f1f1b645362bf80", "3dc0c790c80c40fc700d3bd5012dd67a0f53f74b8368ca82b748e6c2775d1e65"],
  ["4a8595fec766c4229c464802be433cdb5b62d30c92187ffde9819649ed127573", "e04356469c96e40b284cf9cec4dd1f4113c926f900d0269b8a329bd1020f5472"],
  ["62d814c349d83e19882d12dd74cd3d5dc64046a566ae5243ace78992cb57b1a8", "79d964f925102d44542481a9eb002a49b92d8cce142f825c049365cc3b62e099"],
  ["c5406b11f6d4cbc4d8b1ee77727921601edea8f13086aa4cc0b188a18597af36", "5bf8074d4c53855d484126f02a020b0d05588dc6be9a0e45d22d11c060998d82"],
  ["debac29d81445898233149cbc74511900ce443fc8199f21de1fbc93ee74f024d", "25314360438a06cb4fecf7e1d587c1575544302e829212b478554708ea7b054f"],
  ["8d8f8ddf44cb7c26c2edf94ef49e61ba9fff81d61d1009102e1b80ffa73e0fe6", "2ee96cbf06f0c69572c397c8549ebba5a6c7f2d2a4984dc1c943d95f028dc1e2"],
  ["dcd3cf0c1191e272517d2eb4db0ad76f844a248e2b43e4a8d720162b35fad717", "2aac05598b4d2453a6b4f8c19aadb6ed9913469b547689247cf5756bc2f30815"],
  ["ab142a5b65c557a94efdff7aaefbb4091ea489735e40cea74d03105ea1ec99ff", "231d9899b17ce161d9807d7d6cbc377d1e44c48bf205523c506cfbdd47278cb5"]
];

/**跳转到登录 */
function jumpLogin() {
  //window.location.href = "/database/auth/auth/";
  if (getCookie("arrayClient") == "notfound") {
    var x = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    document.cookie = "arrayClient=" + array_Client + "; path=/; expires=" + x; //设置cookie
  }
  var client = array_Client[Math.floor((Math.random() * array_Client.length))]
  setCookie("currentClient", client);
  window.location.href = "https://gitee.com/oauth/authorize?client_id=" + client[0] + "&redirect_uri=https%3A%2F%2Fyuanshen.site%2Flogin.html&response_type=code"
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
  if (getCookie("gitee_Token") != "notfound") {
    if (isFirstLogin) {
      isFirstLogin = false;
      tokenPara = getCookie("gitee_Token");
      getGistList();
    } else {
      window.frames[0].postMessage({
        message: "refreshGistList",
        files: user_files,
      }, '*')
    }
    return true;
  } else {
    return false;
  }
}

/**
 * 根据地址 token 判定登录跳转
 *
 * true : 写入 cookie 并跳转
 *
 */
function Login() {
  confirmSync = true;
  isFirstLogin = true;
  if (window.location.search !== undefined && window.location.search !== "") {
    let tempTokenPara = GetQueryString("access_token");
    setCookie("gitee_Token", tempTokenPara, 1);
    //return window.location.href = "https://yuanshen.site/Beta/index.html";
  }
}
/**
 * tokenPara 正确 调用上传存档
 *
 * 不正确 跳转登录 / 本地存档
 * 
 * @param  {function} localSave
 */
function upLoadSaveData(localSave) {
  if (tokenPara !== undefined && tokenPara !== "") {
    var fileName = window.prompt("请输入存档名");
    if (fileName) {
      //console.log(fileName);
      checkFile(fileName);
    }
  } else {
    if (window.confirm("使用云存档必须登录, 要立刻登录吗?")) {
      jumpLogin();
    } else {
      //调用本地存档
      localSave();
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
//         //console.log("用户取消删除操作");
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
  var url = "/database/file/getFileList";
  //var url = "/giteegist/";
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
      //console.log(res);
      user_fileNames = res.data.fileNames;
      user_fileContents = res.data.fileContents;
      user_fileIds = res.data.fileIds;
      alert("同步完成");
      //console.log(user_fileNames);
      //console.log(user_fileContents);
      //console.log(user_fileIds);
    }
  };
  let err = function (msg) {
    alert(msg);
  };
  $.ajax({
    async: true,
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: success,
  });
}

/**
 * 日期转化
 *
 */
function formatDate(date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = date.getSeconds()
  second = second < 10 ? '0' + second : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * giteeGist获取用户信息
 *
 */
function getGitUser(cb) {
  var access_token = "";
  var success = function (res) {
    console.log('res', res)
    cb && cb(res)
    window.frames[0].postMessage({
      message: "refreshUser",
      userName: res.name
    }, '*')
  }
  if (tokenPara != null) {
    access_token = tokenPara;
    var url = "/giteeuser/?access_token=" + access_token;
    $.ajax({
      async: true,
      type: "GET",
      url: url,
      contentType: "application/json",
      success: success,
    });
  }
}

/**
 * giteeGist获取文件列表
 *
 */
function getGistList() {
  var access_token = "";
  if (tokenPara != null) {
    access_token = tokenPara;
    var url = "/giteegist/?access_token=" + access_token;
    var err = function (res) {
      removeCookie("gitee_Token"); //清空登录缓存
      tokenPara = null; //清空登录缓存
      canOpenSave = false; //不可打开存档框
      $(".savePop").hide(); //关闭存档框
      //console.log(res);
      if (res.status == 401 && res.responseJSON.message == "401 Unauthorized: Application has exceeded the rate limit") {
        var msg = "当前客户端连接已超额，请点击确定自动分配其他客户端重新登录";
        if (confirm(msg) == true) {
          let currentClient = getCookie("currentClient").split(",");
          let currentClients = getCookie("arrayClient").split(",");
          if (currentClients.length > 1) {
            let index = currentClients.indexOf(currentClient[0]);
            currentClients.splice(index, 1);
            let index2 = currentClients.indexOf(currentClient[1]);
            currentClients.splice(index2, 1);
            var x = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
            document.cookie = "arrayClient=" + currentClients + "; path=/; expires=" + x; //设置cookie
            jumpLogin();
          } else {
            alert("当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566");
          }
        }
      } else if (res.status == 401) {
        var msg = "登录失效，请点击确定重新登录";
        if (confirm(msg) == true) {
          jumpLogin();
        }
      }
    }
    var success = function (res) {
      $(".loading").hide();
      canOpenSave = true;
      var currentID = localStorage.getItem("lastUpdateID");
      var currentTime = localStorage.getItem("lastUpdateTime");
      var IDSync = false;
      var TimeSync = false;
      user_files = [];
      //console.log(res);
      for (let obj of res) {
        let currentKey = Object.keys(obj.files)[0];
        if (currentKey == "Data_KYJG") {
          var currentData = obj.files[Object.keys(obj.files)[0]].content;
          //console.log(currentData);
          var lastUpdateTime = formatDate(new Date(obj.updated_at));
          //console.log(formatDate(lastUpdateTime));
          var description = obj.description;
          //console.log(description);
          var id = obj.id;
          //console.log(id);
          var tempFile = {
            id: id,
            description: description,
            lastUpdateTime: lastUpdateTime,
            data: currentData
          }
          user_files.push(tempFile);
          if (currentID == id) {
            IDSync = true;
            var tempLastUpdateTime = lastUpdateTime;
            if (currentTime == lastUpdateTime) {
              TimeSync = true;
            }
          }
        }
      }
      if (IDSync && !TimeSync && confirmSync) {
        confirmSync = false;
        var msg = "检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）";
        if (confirm(msg) == true) {
          loadGistFile(currentID, tempLastUpdateTime);
          confirmSync = true;
        } else {
          var msg = "要上传当前存档到云端吗（点击确定上传存档到云端并同步）";
          if (confirm(msg) == true) {
            confirmSync = true;
            updateGistFile(currentID);
          } else {
            //console.log(user_files);
            window.frames[0].postMessage({
              message: "refreshGistList",
              files: user_files,
            }, '*')
          }
        }
      } else {
        //console.log(user_files);
        window.frames[0].postMessage({
          message: "refreshGistList",
          files: user_files,
        }, '*')
      }
      if (IDSync && TimeSync) {
        isSync = true;
      } else {
        isSync = false;
      }
      freshMarkerLayer();
    };
    $.ajax({
      async: false,
      type: "GET",
      url: url,
      contentType: "application/json",
      success: success,
      error: err,
    });
  }
}


/**
 *修改存档后同步保存本地设置 by giteeGist
 *
 *@param fileID {string} 当前需要上传的存档ID
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function updateLocalData(fileID,cb) {
  var url = "/giteegist/" + fileID + "?access_token=" + tokenPara;
  var success = function (res) {
    //console.log(res);
    var lastUpdateTime = formatDate(new Date(res.updated_at));
    localStorage.setItem("lastUpdateTime", lastUpdateTime);
    localStorage.setItem("lastUpdateID", fileID);
    localStorage.setItem("NetSync", "true");
    if(cb){
      alert("保存成功！")
    }
    getGistList();
  };
  $.ajax({
    async: false,
    type: "GET",
    url: url,
    contentType: "application/json",
    success: success,
  });
}

/**
 *修改存档 by giteeGist
 *
 *@param fileID {string} 当前需要上传的存档ID
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function updateGistFile(fileID) {
  $(".loading").show();
  var access_token = "";
  if (tokenPara != null) {
    access_token = tokenPara;
    var url = "/giteegist/?access_token=" + access_token;
    var err = function (res) {
      removeCookie("gitee_Token"); //清空登录缓存
      tokenPara = null; //清空登录缓存
      canOpenSave = false; //不可打开存档框
      $(".savePop").hide(); //关闭存档框
      if (res.status == 401 && res.responseJSON.message == "401 Unauthorized: Application has exceeded the rate limit") {
        var msg = "当前客户端连接已超额，请点击确定自动分配其他客户端重新登录";
        if (confirm(msg) == true) {
          let currentClient = getCookie("currentClient").split(",");
          let currentClients = getCookie("arrayClient").split(",");
          if (currentClients.length > 1) {
            let index = currentClients.indexOf(currentClient[0]);
            currentClients.splice(index, 1);
            let index2 = currentClients.indexOf(currentClient[1]);
            currentClients.splice(index2, 1);
            var x = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
            document.cookie = "arrayClient=" + currentClients + "; path=/; expires=" + x; //设置cookie
            jumpLogin();
          } else {
            alert("当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566");
          }
        }
      } else if (res.status == 401) {
        var msg = "登录失效，请点击确定重新登录";
        if (confirm(msg) == true) {
          jumpLogin();
        }
      }
    }
    var success = function (res) {
      canOpenSave = true;
      var currentID = localStorage.getItem("lastUpdateID");
      var currentTime = localStorage.getItem("lastUpdateTime");
      var IDSync = false;
      var TimeSync = false;
      user_files = [];
      //console.log(res);
      for (let obj of res) {
        let currentKey = Object.keys(obj.files)[0];
        if (currentKey == "Data_KYJG") {
          var currentData = obj.files[Object.keys(obj.files)[0]].content;
          //console.log(currentData);
          var lastUpdateTime = formatDate(new Date(obj.updated_at));
          //console.log(formatDate(lastUpdateTime));
          var description = obj.description;
          //console.log(description);
          var id = obj.id;
          //console.log(id);
          var tempFile = {
            id: id,
            description: description,
            lastUpdateTime: lastUpdateTime,
            data: currentData
          }
          user_files.push(tempFile);
          if (currentID == id) {
            IDSync = true;
            var tempLastUpdateTime = lastUpdateTime;
            if (currentTime == lastUpdateTime) {
              TimeSync = true;
            }
          }
        }
      }
      if (IDSync && !TimeSync && confirmSync) {
        confirmSync = false;
        var msg = "检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）";
        if (confirm(msg) == true) {
          loadGistFile(currentID, tempLastUpdateTime);
          confirmSync = true;
        } else {
          var msg = "要上传当前存档到云端吗（点击确定上传存档到云端并同步）";
          if (confirm(msg) == true) {
            confirmSync = true;
            updateGistFile(currentID);
          } else {
            //console.log(user_files);
            window.frames[0].postMessage({
              message: "refreshGistList",
              files: user_files,
            }, '*')
          }
        }
      } else {
        //console.log(user_files);
        window.frames[0].postMessage({
          message: "refreshGistList",
          files: user_files,
        }, '*')
      }
      if (IDSync && TimeSync) {
        isSync = true;
      } else {
        isSync = false;
      }
      if (isSync && (localStorage.getItem("NetSync") == "false")) {
        autoUpdateGistFile(true);
      } else if (isSync) {
        $(".loading").hide();
        alert("当前存档已是最新");
      } else {
        $(".loading").hide();
        console.log("未选择同步存档，未能自动同步");
      }
    };
    $.ajax({
      async: false,
      type: "GET",
      url: url,
      contentType: "application/json",
      success: success,
      error: err,
    });
  }


  /*$(".loading").show();
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var success = function (msg, code, head) {
    //console.log(msg);
    //console.log(code);
    //console.log(head);
    updateLocalData(fileID);
    alert("保存成功！");
  };
  let err = function (msg, code, head) {
    //console.log(msg);
    //console.log(code);
    //console.log(head);
  };
  var markersJsonData = {
    content: JSON.stringify(markersData)
  };
  //console.log(JSON.stringify(markersJsonData));
  var url = "/giteegist/" + fileID;
  var fileName = "Data_KYJG";
  var data = '{"access_token": "' + tokenPara + '","files": {"' + fileName + '": ' + JSON.stringify(markersJsonData) + '}}';
  $.ajax({
    async: false,
    type: "PATCH",
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: "application/json",
    success: success,
    error: err,
  });*/
}

/**
 *自动上传存档 by giteeGist
 *
 *
 * tips: 上传完成会调用 getGistList() 同步数据
 */
function autoUpdateGistFile(cb=false) {
  var fileID = localStorage.getItem("lastUpdateID")
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var success = function (res) {
    updateLocalData(fileID,cb);
  };
  let err = function (msg) {
    //console.log(msg);
  };
  var markersJsonData = {
    content: JSON.stringify(markersData)
  };
  //console.log(JSON.stringify(markersJsonData));
  var url = "/giteegist/" + fileID;
  var fileName = "Data_KYJG";
  var data = '{"access_token": "' + tokenPara + '","files": {"' + fileName + '": ' + JSON.stringify(markersJsonData) + '}}';
  $.ajax({
    async: false,
    type: "PATCH",
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: "application/json",
    success: success,
    error: err,
  });
}

function checkAutoUpdate() {
  if (localStorage.getItem("NetSync") == "false") {
    $(".loading").show();
    var access_token = "";
    if (tokenPara != null) {
      access_token = tokenPara;
      var url = "/giteegist/?access_token=" + access_token;
      var err = function (res) {
        removeCookie("gitee_Token"); //清空登录缓存
        tokenPara = null; //清空登录缓存
        canOpenSave = false; //不可打开存档框
        $(".savePop").hide(); //关闭存档框
        if (res.status == 401 && res.responseJSON.message == "401 Unauthorized: Application has exceeded the rate limit") {
          var msg = "当前客户端连接已超额，请点击确定自动分配其他客户端重新登录";
          if (confirm(msg) == true) {
            let currentClient = getCookie("currentClient").split(",");
            let currentClients = getCookie("arrayClient").split(",");
            if (currentClients.length > 1) {
              let index = currentClients.indexOf(currentClient[0]);
              currentClients.splice(index, 1);
              let index2 = currentClients.indexOf(currentClient[1]);
              currentClients.splice(index2, 1);
              var x = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
              document.cookie = "arrayClient=" + currentClients + "; path=/; expires=" + x; //设置cookie
              jumpLogin();
            } else {
              alert("当前所有客户端连接数均已超额，请联系管理员添加客户端QQ790489566");
            }
          }
        } else if (res.status == 401) {
          var msg = "登录失效，请点击确定重新登录";
          if (confirm(msg) == true) {
            jumpLogin();
          }
        }
      }
      var success = function (res) {
        canOpenSave = true;
        var currentID = localStorage.getItem("lastUpdateID");
        var currentTime = localStorage.getItem("lastUpdateTime");
        var IDSync = false;
        var TimeSync = false;
        user_files = [];
        //console.log(res);
        for (let obj of res) {
          let currentKey = Object.keys(obj.files)[0];
          if (currentKey == "Data_KYJG") {
            var currentData = obj.files[Object.keys(obj.files)[0]].content;
            //console.log(currentData);
            var lastUpdateTime = formatDate(new Date(obj.updated_at));
            //console.log(formatDate(lastUpdateTime));
            var description = obj.description;
            //console.log(description);
            var id = obj.id;
            //console.log(id);
            var tempFile = {
              id: id,
              description: description,
              lastUpdateTime: lastUpdateTime,
              data: currentData
            }
            user_files.push(tempFile);
            if (currentID == id) {
              IDSync = true;
              var tempLastUpdateTime = lastUpdateTime;
              if (currentTime == lastUpdateTime) {
                TimeSync = true;
              }
            }
          }
        }
        if (IDSync && !TimeSync && confirmSync) {
          confirmSync = false;
          var msg = "检测到您的存档与云端存储时间不一致，要同步云端存档吗（点击确定同步云端存档）";
          if (confirm(msg) == true) {
            loadGistFile(currentID, tempLastUpdateTime);
            confirmSync = true;
          } else {
            var msg = "要上传当前存档到云端吗（点击确定上传存档到云端并同步）";
            if (confirm(msg) == true) {
              confirmSync = true;
              updateGistFile(currentID);
            } else {
              //console.log(user_files);
              window.frames[0].postMessage({
                message: "refreshGistList",
                files: user_files,
              }, '*')
            }
          }
        } else {
          //console.log(user_files);
          window.frames[0].postMessage({
            message: "refreshGistList",
            files: user_files,
          }, '*')
        }
        if (IDSync && TimeSync) {
          isSync = true;
        } else {
          isSync = false;
        }
        freshMarkerLayer();
        if (isSync) {
          autoUpdateGistFile();
        } else {
          $(".loading").hide();
          console.log("未选择同步存档，未能自动同步");
        }
      };
      $.ajax({
        async: true,
        type: "GET",
        url: url,
        contentType: "application/json",
        success: success,
        error: err,
      });
    }
    else{
      $(".loading").hide();
    }
  }
  else{
    console.log("地图数据无变化，没有进行自动同步");
  }
}
setInterval("checkAutoUpdate()", 300000);
/**
 *新建存档 by giteeGist
 * 
 * tips: 新建完成会调用 getGistList() 同步数据
 */
function addGistFile(_default = '', cb) {
  var markersData = [];
  if (isSync == false || isCopy === true) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); //获取本地存储的Key
      // @ts-ignore
      if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
    }
  }
  var markersJsonData = {
    content: JSON.stringify(markersData)
  };
  var description = window.prompt("请输入存档名", _default);
  if (description) {
    var success = function (res) {
      if (isSync == false) {
        confirmSync = true;
        var lastUpdateTime = formatDate(new Date(res.updated_at));
        localStorage.setItem("lastUpdateTime", lastUpdateTime);
        localStorage.setItem("lastUpdateID", res.id);
        localStorage.setItem("NetSync", "true");
      }
      alert(isCopy ? '复制完成' : '新建完成');
      cb && cb(res)
      getGistList();
    };
    var err = function (res) {
      //console.log(res.responseJSON.message);
      if (res.responseJSON.message == "您尚未认证身份，根据国家相关法律法规的要求，请绑定手机后再操作") {
        if (window.confirm("使用云存档必须绑定手机, 要立刻绑定吗?")) {
          BDSJ();
        }
      } else alert(res.responseJSON.message);
    };
    var url = "/giteegist/";
    var fileName = "Data_KYJG";
    var data = '{"access_token": "' + tokenPara + '","description":"' + description + '","files": {"' + fileName + '": ' + JSON.stringify(markersJsonData) + '}}';
    //console.log(JSON.stringify(JSON.parse(data)));
    $.ajax({
      async: false,
      type: "POST",
      url: url,
      data: JSON.stringify(JSON.parse(data)),
      contentType: "application/json",
      success: success,
      error: err,
    });
  } else {
    isCopy = false
  }
}

function BDSJ() {
  window.location.href = "https://gitee.com/profile/account_information";
}

/**
 *修改存档备注 by giteeGist
 *
 *@param fileID {string} 需要修改的存档ID
 *
 * tips: 修改完成会调用 getGistList() 同步数据
 */
function updateGistDescription(fileID) {
  var description = window.prompt("（修改存档名）请输入存档名");
  if (description) {
    var success = function (res) {
      //console.log(res);
      if (res.id == localStorage.getItem("lastUpdateID")) {
        let lastUpdateTime = formatDate(new Date(res.updated_at));
        localStorage.setItem("lastUpdateTime", lastUpdateTime);
      }
      alert("修改备注成功！");
      getGistList();
    };
    let err = function (msg) {
      //console.log(msg);
    };
    var url = "/giteegist/" + fileID;
    var data = '{"access_token": "' + tokenPara + '","description":"' + description + '"}';
    $.ajax({
      async: false,
      type: "PATCH",
      url: url,
      data: JSON.stringify(JSON.parse(data)),
      contentType: "application/json",
      success: success,
      error: err,
    });
  }
}

/**
 *删除存档 by giteeGis
 *
 *@param fileID {string} 需要删除的存档ID
 *
 * tips: 删除完成会调用 getGistList() 同步数据
 * 删除会丢失之前的存档，如需要请加不可恢复提示
 */
function deleteGistFile(fileID) {
  var msg = "存档删除后不可恢复，您确定要删除这个存档吗？";
  if (confirm(msg) == true) {
    var success = function (res) {
      //console.log(res);
      alert("删除完成！");
      getGistList();
    };
    let err = function (msg) {
      //console.log(msg);
    };
    var url = "/giteegist/" + fileID + "?access_token=" + tokenPara;
    $.ajax({
      async: false,
      type: "DELETE",
      url: url,
      contentType: "application/json",
      success: success,
      error: err,
    });
  }
}

/**
 *加载存档 by giteeGis
 *
 *@param fileID {string} 需要加载的存档ID
 *@param fileLastUpdateTime {string} 需要加载的存档更新时间
 * 
 * tips: 删除完成会调用 getGistList() 同步数据
 * 导入会丢失现在存档，如需要请加备份提示
 * 
 */
function loadGistFile(fileID, fileLastUpdateTime) {
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  if (isSync == false && markersData.length >= 1 && confirmSync == true) {
    var msg = "您本地存有数据且未处于同步状态，为防止数据丢失，请点击确定新建存档";
    if (confirm(msg) == true) {
      addGistFile();
    }
  } else {
    for (let file of user_files) {
      if (file.id == fileID) {
        localStorage.clear();
        // @ts-ignore
        var markerLogArr = eval(file.data);
        for (var i = 0; i < markerLogArr.length; i++) {
          localStorage.setItem(markerLogArr[i], "1");
        }
        localStorage.setItem("lastUpdateTime", fileLastUpdateTime);
        localStorage.setItem("lastUpdateID", fileID);
        localStorage.setItem("NetSync", "true");
        alert("导入该存档成功!");
        getGistList();
      }
    }
  }
}

/**
 *判断存档是修改还是新增
 *
 *@param fileName {string} 当前需要上传的存档名
 *
 * tips: 上传完成会调用 getFileList() 同步数据
 */
function checkFile(fileName) {
  let isUpdate = false;
  let fileIndex = 0;
  for (let name of user_fileNames) {
    //console.log(name)
    if (name == fileName) {
      var fileID = user_fileIds[fileIndex];
      isUpdate = true;
      break;
    }
    fileIndex++;
  }
  if (isUpdate) {
    updateFile(fileName, fileID);
  } else {
    addNewFile(fileName);
  }
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
    // @ts-ignore
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
  var url = "/database/file/addNewFile";
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

/**
 *修改存档
 *@param fileName {string} 当前需要修改的存档名
 *@param fileID {string} 当前需要修改的存档ID
 *修改会丢失之前的存档，如需要请加备份提示
 */
function updateFile(fileName, fileID) {
  var markersData = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); //获取本地存储的Key
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var success = function (res) {
    if (res === "login") {
      alert("未登录gitee账号或者登录已过期！");
    } else {
      //console.log(res);
      alert("保存成功！");
      getFileList();
    }
  };
  let err = function (msg) {
    //console.log(msg);
  };
  var markersJsonData = {
    content: JSON.stringify(markersData)
  };
  //console.log(JSON.stringify(markersJsonData));
  var url = "/giteegist/" + fileID;
  var data = '{"access_token": "' + tokenPara + '","files": {"' + fileName + '": ' + JSON.stringify(markersJsonData) + '}}';
  $.ajax({
    async: false,
    type: "PATCH",
    url: url,
    data: JSON.stringify(JSON.parse(data)),
    contentType: "application/json",
    success: success,
    error: err,
  });

}

/*
	导入存档
	不需要调后台，因为查过了，number传入当前需要导入的存档在数组中的序号
	导入会丢失现在存档，如需要请加备份提示
*/
function loadFile(number) {
  localStorage.clear();
  // @ts-ignore
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
    // @ts-ignore
    if (localStorage.getItem(key) == 1) markersData.push(key); //所有value
  }
  var url = "/database/file/deleteFile";
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
  var url = "/database/file/createIssue";
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
  var url = "/database/upload/uploadBase64";
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