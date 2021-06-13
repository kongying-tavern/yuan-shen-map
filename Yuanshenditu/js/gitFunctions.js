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
  ["ab142a5b65c557a94efdff7aaefbb4091ea489735e40cea74d03105ea1ec99ff", "231d9899b17ce161d9807d7d6cbc377d1e44c48bf205523c506cfbdd47278cb5"],
  ["1a4fe543d02cd264589e771f54cf253c4bee64488b365b9a13a5da1b3d9b3858", "ef5ceada657a1ef7afe93fe973349945c1516238fd93c4e8dc9db271aacad0f4"],
  ["18134c01da02121138740f8d7bdfd27d496239d2f04363211705ba5cddd9aed5", "fac41ca2dca496a6ededa2cf5c91dc0b1f54f7dd3307335579e287ba32185c9c"],
  ["fffe186d6e668ff283be662c919a4a2ba9f31b938e241f5f731094365f24754b", "885ae56a004f03e52971eca1c8a87c040ea188788ff2d15df31de6b8061de7e1"],
  ["e1380c160a5a35a4dbc37705693cdf720d435f809997ab9295b5e1f1f5b75e48", "40003ddba264197c1b98b62441782ea55500b88135688d7601c65a475541c6d7"],
  ["b757bcea5d608283314e0bb68a5c9194cfc0229131b2d8b8872d34b304d1c0d1", "eef6d9c6059cb301cf1188e61fc8145e7117ef78464ffeba5fa46340072cf58f"],
  ["d673d92fa6ec34767ea65b3b974543a76f61361a668033dabe2d15f792582895", "0bc9b58f400e4ea6b44e4bf5ad2c539f58bf817e6f60f29df10c341be16e8b2f"],
  ["f7c9aeb0ec85a313bdd6bd4ec6af69035093796c2d6bf551a69d4d80b0def63e", "267519e1ac1c4908c1f313ff30f1042c658f8a9065db31eafae5ed200f961e28"],
  ["a6a36aa3f55a4312bd9820aefb22af8ca83a66bcc2dda0d1dce7a76f89fbeb85", "f0ffded7775809a1627a642bdb67d28aa99d6a03cbedba2d0ea0bade700ddaeb"],
  ["150f4ab86de28d98679d5c2005c357a455423647b15b3fc664ab89a07b3b2927", "ee57f22571dd9a508cd5c107eedb0f41dd52b7cb52a34265779fe81c1373c482"],
  ["29ebee527034eaba3aef872eaed53c250032965d24e5f7b86908e83fefb0bbaa", "fd0d722796794951d6d31b9a84e9ee6830ae230a9a8ae60e52dcd2d40bded770"],
  ["04aa22384e59468ddbc19089337a70d8f23b90657ec9f6645473856ec81db8b9", "31e5e3923f1ee7015e4095c0d9198640fe4dae3365f622de6f478dd675f384d5"],
  ["f4ceb969a713c5e70db1d8056a4a0ac2ac25e20f3c18a6dd4a977cd77f0b7a3d", "083f2f441435e445aea7ea9adebfd35d86264d0d4a8bd58dec80a055a824516e"],
  ["ebab3bcb5b92394c37ce9eb1031947840a8752d89a781f266c703824014152c8", "a3317dd36bed2075983bb5fc5e8ffeeb576124357f0d738f2dd8d5bd5b75c153"],
  ["c0360fc8c8ef1cf475b36fc1902d8fbb885c19691efb5c94e0973a26ce9ad439", "c136629fc87e96c86e29fbc783179017cded136ffc3d01c0bd18fb71a9f21f24"],
  ["7a7901ac9869763af77843930130904bd88e9ef16a5b91fcc3e0734008ccacf0", "818e5b6e6700c7f34cce0e80897e6e15f7be9dc97bbd15701e6475504f083fc4"],
  ["c33eba09e998d04a611032d3fdb1ccc498370d45cb067ee208fee3e0782d7e38", "54c6c241f331f75383bbe6f98c155f607cbedf09756f1bd54f6402e85989f069"],
  ["ecf321d3fac2a65ab386f8019bac550ee9838eacf1e76c1e6eb441cdecfa77a5", "fa10ab71721e94709f4178f6378243aa833190135a8bbdaf561b9e42486da41a"],
  ["cacf31235a12dc24bc1e3406da84e3a68e6ce2ed0e3c513bc6704a96b8cb7fe0", "de19f2c73a0d9bb69e3ec7b31ae8d81c906b31a510e38e09413fa31ed30c722e"],
  ["ece831e2b3c8031a4eaffd237de219f316c3c24cfb49e2cc2bb1e57543971c6e", "76bd674f729dbf8029b742024f83845fbeb48ed5e103bd167c8d5fe74f2db72c"],
  ["ee1f7f74378e75525a1a1a0368cc0a1f95fae99ec882457ad569d5084ce6ec2e", "ea25de087c259c7b6b5fafb636cb74ef7598b5d318419136eb4c7df2825cd545"],
  ["698cf1d0af829c16722b04d09a8d5d71f9079653d6728df3177f36b64199b503", "42bb22afff2650c994746cf1110e91deeb2e5a8cc0b7803a39c561a0454c3689"],
  ["f6cf7430d0c0899af17d44d497e86390abe58d241f45183ec8d8538b59cda1f8", "639b49656bdd5cfe4175803cf062ab2c77dabeab02317310ce67f6008d1d2ca5"],
  ["1aef2bc6b14ca6b13ba274f5e18f6a4b0ef767f671b63345bad1b7917ce8da3c", "e7a3df1abb49d3988c816a97e9fe1cb175788c24906fd89be3ce58ab45bdebc6"],
  ["154449621dbd0651e23e3f0cd8a57c00090ee485fa6caef8b2ea5a9ca27efd8d", "f4840bcea233a8f8a49cf05a21f181ba90a4f1a214baa4bbc21d69feb80a5b92"],
  ["a812e1c1bf413c0b3d11979671d31bd9e722a0e3d754ba5e701bf7e108edfbea", "e026625aa36d75c0589833dd2bffd17945f1845340b5a2602c320f72ca34f1a1"],
  ["f1bf96cb68e8b061dd6b9ea1a810a0e6b633abdce42804353de2018cd9245fce", "83680e4562137e2146e9062b97fc163250105e9f255ff3cd57bd4e0c5c35640b"],
  ["9e8a957e1ef5956d4923f44f1078e1454eeab2eb80bd3c454deb1b4358b3d1dc", "2755ade75770a7d79494abfe6d4538fbad6b5a57879c825269157910be65d402"],
  ["5514d220b18dea352fe0da71e6aad1c4e886b625df4d396a9ed876a555fe1e96", "71deeda344d9d09332b5eeb683f4a269dfec172a5ec80297a00e5489203c4750"],
  ["053b15a39838babe8eed1fae269c0a22c0179fd6cf2ee63f0df4c189924f90a0", "227f7a411687834374ee3f72da4b220f81f184d4a07f1fee7d9a3ffc5fcb0e6e"],
  ["0ea20556a0627fc026080c9f77ebece360afade973dc37b4bd1e5de1785de52e", "e5a72ae52c69665afa0b0d1f172b935d023c3b7d9e440505eb4a9998ef018e5d"],
  ["d20ce4a1cba767a5a81ecdf584a242fe3cf203c09741dff2890502a50b84b8b5", "8966e4ef6d06d37055b797a6ed8a30506173ced980d5f0d7ebc38cac98112c5e"],
  ["72106b06a1a41dd994b100caedb364d8940ae23cb78dbed93457d8f4ef390aad", "bf9f29f7dea634b59199478df775c34aa896dced7a2d567ff891da021e81a001"],
  ["db318eca9b592de388ac48b0908834ae66227e8bb21363f8a166b91cc0e257ef", "0c3d1e3cbfc494b5746ac242066b7635dd730d6c08450e0d8854de8bc1c27131"],
  ["14da3019e3f9e19a2cca04aa279d429b6de5b6178d5672f1377abd62ba688cef", "f07c150ac392d8b936a3d81096976bd15312d649e74320fa1521ef4460f1d038"],
  ["b10ee5fada38fb3c9a9a97dafb25523854d2cc9a960a9196619085304570d0be", "b47f752f80ed3328ae66b99dd7e60740996b7216428c241b83d3314696829fe7"],
  ["5a1bc167ac3bc634097cf0c0dba0a33f2c1ccbe075cf563d0801b4a1b98dee17", "26e973c82d20d7db7b56e842cbc75af920629661f4537cc527e08c8525ee5263"],
  ["0a15937a7272bc0325748cf1e5ec990e711d3176b0f3c3773fe3a5cec2901f92", "eae5126c4b840173a238e506c336c23bd2568f1a58184cc8e2b2d761f1bd8263"],
  ["4b36f9546d8ea0c0c8ac57fbc71f1f15125c67586616b9ebfedf3eabb1561832", "c51c0aa776a67d0bfe23444571e2276e7c958c29510c63e2f569cc6e37be5b64"],
  ["fddb0c164af3ee5222665f69fe27e4040414fece1c4a5b2c844d297dff7e8fb9", "ed08aace0d35c67193b82a91ffeb49509bf900ca53b08c913adc372973e04e9b"],
  ["7b6e0f6021fc995f60f2e384c2f31273ce40ddf7bc0eeb444d52d29df45f1729", "0571e67989f23a6d9f86fc1cf140b27a4abd3aaddbeab17ca4d0d5d2712a02d4"]
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
  if (window.location.search !== undefined && window.location.search!="" && window.location.search.split('=')[0] !== "?locale") {
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
            autoUpdateGistFile();
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
            autoUpdateGistFile();
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
              autoUpdateGistFile();
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