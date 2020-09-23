var JS_Item = {
    "type": "FeatureCollection",
    "features": []
}

var JS_FST = JSON.parse(JSON.stringify(JS_Item));;
var JS_YST = JSON.parse(JSON.stringify(JS_Item));
var JS_DLK_MD = JSON.parse(JSON.stringify(JS_Item));
var JS_DLK_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_JYJJ = JSON.parse(JSON.stringify(JS_Item));
var JS_NSH = JSON.parse(JSON.stringify(JS_Item));
var JS_LLBH = JSON.parse(JSON.stringify(JS_Item));
var JS_GGG = JSON.parse(JSON.stringify(JS_Item));
var JS_DDL = JSON.parse(JSON.stringify(JS_Item));
var JS_SXLYH = JSON.parse(JSON.stringify(JS_Item));
var JS_MFMG = JSON.parse(JSON.stringify(JS_Item));
var JS_LLM = JSON.parse(JSON.stringify(JS_Item));
var JS_FCJ = JSON.parse(JSON.stringify(JS_Item));
var JS_PGYZ = JSON.parse(JSON.stringify(JS_Item));
var JS_YPS = JSON.parse(JSON.stringify(JS_Item));
var JS_SP = JSON.parse(JSON.stringify(JS_Item));
var JS_SJK_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_BTK_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_SJK_MD = JSON.parse(JSON.stringify(JS_Item));
var JS_BTK_MD = JSON.parse(JSON.stringify(JS_Item));
var JS_YJSW_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_YJLZ_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_LYSS_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_ZWCLR_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_SYFS_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_DXQQR_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_BX_MD = JSON.parse(JSON.stringify(JS_Item));
var JS_BX_LY = JSON.parse(JSON.stringify(JS_Item));
var JS_LLD = JSON.parse(JSON.stringify(JS_Item));

var JS_array = [JS_FST,JS_YST,JS_DLK_MD,JS_DLK_LY,JS_JYJJ,JS_NSH,JS_LLBH,JS_GGG,JS_DDL,JS_SXLYH,JS_MFMG,
JS_LLM,JS_FCJ,JS_PGYZ,JS_YPS,JS_SP,JS_SJK_LY,JS_BTK_LY,JS_SJK_MD,JS_BTK_MD,
JS_YJSW_LY,JS_YJLZ_LY,JS_LYSS_LY,JS_ZWCLR_LY,JS_SYFS_LY,JS_DXQQR_LY,JS_BX_MD,JS_BX_LY,JS_LLD];

let url = 'http://yuanshen.site:8848/marker/queryAll'
let success = function (res) {
	for(var i = 0 ; i< res.data.list.length; i++) {
	    var item = res.data.list[i];
		var markerX = item.xy.split(',')[0];
		var markerY = item.xy.split(',')[1];
		var markerInfo = {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    markerX, markerY
                ]
            },
            "type": "Feature",
            "properties": {
                "popTitle": item.popTitle,
                "popupContent": item.popContent,
            },
            "id": item.id
        };
		JS_array[item.layerId].features.push(markerInfo);
	}
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
})