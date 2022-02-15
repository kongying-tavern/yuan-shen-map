/*
	下载数据库中的所有点位为json文件
	fileName为下载的文件名，直接调用这个方法就可以下载
*/
function downloadJson(fileName) {
  var eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  var blob = new Blob([JSON.stringify(JS_array)])
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

/*
	批量新增点位
	参数layerId说明：传入number类型的当前layer的序号 目前值为0~28中取的
	参数markerList说明:
	和旧版dev复制到剪贴板的内容相似，要写成数组传过来
	如 markerList = [{"geometry":{"type":"Point","coordinates":["-20.64306554672647","43.09936523437501"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":1},{"geometry":{"type":"Point","coordinates":["-16.8886597873816","45.45043945312501"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":2},{"geometry":{"type":"Point","coordinates":["-17.518344187852207","40.58349609375001"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":3},{"geometry":{"type":"Point","coordinates":["-17.748686651728793","43.70361328125001"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":4},{"geometry":{"type":"Point","coordinates":["-20.889607510404367","47.779541015625"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":5}]
	markList中的id没用用到，实际写入数据库的id从取数据库中
	函数返回写入的第一个点的id，写点位的人如需新增图片，记录下起始id给图片进行相应的命名。
*/
function addNewMarkers(layerId, markerList) {
  var beginId = 0
  var url = 'http://ddns.minemc.top:8848/marker/addNewMarkers'
  var data = {
    layerId: layerId,
    markerList: markerList,
  }
  var success = function (res) {
    beginId = Number(res.data) + 1
    alert(
      '新增点位成功！提交的点位id范围为' +
        beginId.toString() +
        '-' +
        (beginId + markerList.length - 1).toString()
    )
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
  return beginId
}

/*
	
	修改点位
	参数layerId说明：传入number类型的当前layer的序号 目前值为0~28中取的
	参数markerInfo说明:
	传入和json格式中相同的一个markerInfo对象，可以修改坐标，可以修改pop的其他内容
	如 markerInfo = 
	{"geometry":{"type":"Point","coordinates":["-20.64306554672647","43.09936523437501"]},"type":"Feature","properties":{"popTitle":"风神瞳","popupContent":"这是一个风神瞳"},"id":1}
	成功返回true 失败返回false的boolean类型，因为拖动点位也可以调用这个方法，不弹框提示
*/
function updateMarker(layerId, markerInfo) {
  var flag = false
  var url = 'http://ddns.minemc.top:8848/marker/updateMarker'
  var data = {
    layerId: layerId,
    markerInfo: markerInfo,
  }
  var success = function (res) {
    flag = true
    alert('修改成功！')
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
  return flag
}

/*
	
	修改点位
	参数layerId说明：传入number类型的当前layer的序号 目前值为0~28中取的
	参数markerId说明:需要删除的marker的序号，数值类型
*/
function deleteMarker(layerId, markerId) {
  var flag = false
  var url = 'http://ddns.minemc.top:8848/marker/deleteMarker'
  var data = {
    layerId: layerId,
    markerId: markerId,
  }
  var success = function (res) {
    alert('删除点位成功!')
  }
  let err = function (msg) {
    alert(msg)
  }
  $.ajax({
    async: false,
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: success,
  })
  return flag
}
