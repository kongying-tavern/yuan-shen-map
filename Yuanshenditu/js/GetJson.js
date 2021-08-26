let success1 = function (res) {
  console.log(res)
  var urll = location.search //获取url中"?"符后的字串
  if (urll.indexOf('?') != -1) {
    //判断是否有参数
    var str = urll.substr(1) //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
    var strs = str.split('=') //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
    var tempstorage = strs[1].replace(/%22/g, '"') //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
    var tempstorage2 = tempstorage.replace(/%20/g, '') //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
    var tempstorage3 = tempstorage2.replace(/undefined/g, '') //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
  }
  var JS_array1 = new Array()
  for (var i = 0; i < res.data.list.length; i++) {
    var item = res.data.list[i]
    if (item.layerId == tempstorage3) {
      var markerX = item.xy.split(',')[0]
      var markerY = item.xy.split(',')[1]
      var markerInfo = {
        id: item.id,
        coordinates: [markerX, markerY],
        popTitle: item.popTitle,
        popupContent: item.popupContent,
      }
      JS_array1.push(markerInfo)
    }
  }
  var JsonTemp = {
    list: JS_array1,
  }
  // console.log(JSON.stringify(JS_array1, null, 4));
  $('.body1').append(JSON.stringify(JsonTemp, null, '\t'))
  $('.body1').append(JSON.stringify(JsonTemp, null, 4))
}
// eslint-disable-next-line no-unused-vars
window.onload = function () {
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    success: success1,
    contentType: 'application/json;charset=UTF-8',
    error: function (result) {
      console.log(result)
    },
  })
}
