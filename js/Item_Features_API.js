var JS_Item = {
  type: 'FeatureCollection',
  features: [],
}
// var originJsonArr = []
let url = 'https://yuanshen.site/item/marker/queryAll'
const originalMapSize = [8192, 8192];
const centerOffsetFromLeftTop = [3568, 6286];

function project(lat, lng) {
  let sinLat = Math.sin(lat * Math.PI / 180);
  return [
    Math.log((1 + sinLat) / (1 - sinLat)) / Math.PI * originalMapSize[1] + centerOffsetFromLeftTop[1],
    lng / 90 * originalMapSize[0] - centerOffsetFromLeftTop[0]
  ];
}
let success = function (res) {
  console.log(res);
  for (var i = 0; i < res.data.list.length; i++) {
    var item = res.data.list[i];
    var markerX = item.xy.split(',')[0];
    var markerY = item.xy.split(',')[1];
    var markerInfo = {
      "geometry": {
        "type": "Point",
        "coordinates": [
          markerX, markerY
        ]
        //oordinates": project(markerX , markerY )
      },
      "type": "Feature",
      "properties": {
        "popTitle": item.popTitle,
        "popupContent": item.popupContent,
      },
      "id": item.id
    };
    if (JS_array[item.layerId] == undefined) {
      JS_array[item.layerId] = JSON.parse(JSON.stringify(JS_Item))
    };
    JS_array[item.layerId].features.push(markerInfo);
  }
  // for (var i = 0; i < originJsonArr.length; i++) {
  //   if (originJsonArr[i] != null) JS_array[i].features = originJsonArr[i].features;
  //   else JS_array[i].features = []
  // }
}
// eslint-disable-next-line no-unused-vars
let err = function (msg) {
  alert(msg)
}
$.ajax({
  async: false,
  type: 'POST',
  url: url,
  success: success,
  contentType: 'application/json;charset=UTF-8',
  error: function (result) {
    console.log(result);
  }
})
// Sun Jan 02 2022 00:46:36 GMT+0000 (Coordinated Universal Time)
