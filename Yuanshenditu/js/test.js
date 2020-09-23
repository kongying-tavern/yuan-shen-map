//初始化地图
t = L.latLngBounds([0, 0], [-66.5, 90]);
var map = L.map("map", {
	//crs: L.CRS.Simple,
	center: [-35, 45],
	zoomDelta: 0.5,
	zoomSnap: 0.5,
	maxZoom: 7,
	minZoom: 4,
	zoom: 4,
	maxBounds: t,
	attributionControl: false,
	zoomControl: false
});
L.control.attribution({
	prefix: "<a href='https://bbs.mihoyo.com/ys/article/1328298' target='_blank'>米游社空荧酒馆</a>"
}).addTo(map);
L.control.zoom({
	zoomInTitle: '+',
	zoomOutTitle: '-'
}).addTo(map);
L.TileLayer.T = L.TileLayer.extend({
	getTileUrl: function (coords) {
		x = coords.x
		y = coords.y
		return 'tiles1/' + coords.z + '/ppp' + x + '_' + y + '.png';
	}
});
L.tileLayer.t = function () {
	return new L.TileLayer.T();
}
map.addLayer(L.tileLayer.t());
//水印
// L.TileLayer.T1 = L.TileLayer.extend({
// 	getTileUrl: function (coords) {
// 		x = coords.x
// 		y = coords.y
// 		if (x % 2 == 0)
// 			if (y % 2 == 0)
// 				return 'tiles2/SY.png';
// 			else return 'tiles2/SY1.png';
// 		else
// 		if (y % 2 == 0)
// 			return 'tiles2/SY1.png';
// 		else return 'tiles2/SY.png';
// 	}
// });
// L.tileLayer.t1 = function () {
// 	return new L.TileLayer.T1();
// }
// map.addLayer(L.tileLayer.t1());
//各个坐标的分类类别的初始化
var LayerMap = {
	Layer_FST:L.layerGroup(),
	Layer_YST:L.layerGroup(),
	Layer_DLK_MD:L.layerGroup(),
	Layer_DLK_LY:L.layerGroup(),
	Layer_JYJJ:L.layerGroup(),
	Layer_NSH:L.layerGroup(),
	Layer_LLBH:L.layerGroup(),
	Layer_GGG:L.layerGroup(),
	Layer_DDL:L.layerGroup(),
	Layer_SXLYH:L.layerGroup(),
	Layer_MFMG:L.layerGroup(),
	Layer_LLM:L.layerGroup(),
	Layer_FCJ:L.layerGroup(),
	Layer_PGYZ:L.layerGroup(),
	Layer_YPS:L.layerGroup(),
	Layer_SP:L.layerGroup(),
	Layer_SJK_LY:L.layerGroup(),
	Layer_BTK_LY:L.layerGroup(),
	Layer_SJK_MD:L.layerGroup(),
	Layer_BTK_MD:L.layerGroup(),
	Layer_YJSW_LY:L.layerGroup(),
	Layer_YJLZ_LY:L.layerGroup(),
	Layer_LYSS_LY : L.layerGroup(),
	Layer_ZWCLR_LY:L.layerGroup(),
	Layer_SYFS_LY:L.layerGroup(),
	Layer_DXQQR_LY:L.layerGroup(),
	Layer_BX_MD:L.layerGroup(),
	Layer_BX_LY:L.layerGroup()
}
// var Layer_FST = L.layerGroup();
// var Layer_YST = L.layerGroup();
// var Layer_DLK_MD = L.layerGroup();
// var Layer_DLK_LY = L.layerGroup();
// var Layer_JYJJ = L.layerGroup();
// var Layer_NSH = L.layerGroup();
// var Layer_LLBH = L.layerGroup();
// var Layer_GGG = L.layerGroup();
// var Layer_DDL = L.layerGroup();
// var Layer_SXLYH = L.layerGroup();
// var Layer_MFMG = L.layerGroup();
// var Layer_LLM = L.layerGroup();
// var Layer_FCJ = L.layerGroup();
// var Layer_PGYZ = L.layerGroup();
// var Layer_YPS = L.layerGroup();
// var Layer_SP = L.layerGroup();
// var Layer_SJK_LY = L.layerGroup();
// var Layer_BTK_LY = L.layerGroup();
// var Layer_SJK_MD = L.layerGroup();
// var Layer_BTK_MD = L.layerGroup();
// var Layer_YJSW_LY = L.layerGroup();
// var Layer_YJLZ_LY = L.layerGroup();
// var Layer_LYSS_LY = L.layerGroup();
// var Layer_ZWCLR_LY = L.layerGroup();
// var Layer_SYFS_LY = L.layerGroup();
// var Layer_DXQQR_LY = L.layerGroup();
// var Layer_BX_MD = L.layerGroup();
// var Layer_BX_LY = L.layerGroup();
//定义各个坐标使用的图标
function getIconInfo(i) {
	if (i < 2) { //ST
		var op = {
			iconSize: [21.6, 22.8], // size of the icon
			shadowSize: [50, 64], // size of the shadow
			iconAnchor: [10.8, 11.4], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [0, -11.4] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	}
	else if (i < 4) //DLK 
	{
		var op = {
			shadowUrl: "./imgs/BK_45.png",
			iconSize: [33, 33], // size of the icon
			shadowSize: [45, 45], // size of the shadow
			iconAnchor: [16.5, 16.5], // point of the icon which will correspond to marker's location
			shadowAnchor: [22.5, 22.5], // the same for the shadow
			popupAnchor: [0, -16.5] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	}
	else if (i < 16) { //WP
		var op = {
			shadowUrl: "./imgs/BK_32.png",
			iconSize: [16, 16], // size of the icon
			shadowSize: [22, 22], // size of the shadow
			iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
			shadowAnchor: [11, 11], // the same for the shadow
			popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	}
	else if (i < 20) { //KW
		var op = {
			iconSize: [20, 20], // size of the icon
			shadowSize: [50, 64], // size of the shadow
			iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	}
	else if (i < 22) { //JYG
		var op = {
			shadowUrl: "./imgs/BK_32.png",
			iconSize: [24, 24], // size of the icon
			shadowSize: [32, 32], // size of the shadow
			iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
			shadowAnchor: [16, 16], // the same for the shadow
			popupAnchor: [0, -12] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	}
	else if (i < 26) { //PTG
		var op = {
			shadowUrl: "./imgs/BK_32.png",
			iconSize: [16, 16], // size of the icon
			shadowSize: [22, 22], // size of the shadow
			iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
			shadowAnchor: [11, 11], // the same for the shadow
			popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
		};
		return op;
	} else { // BX_Base

		var op = {
			//shadowUrl: "./imgs/BK_32_1.png",
			iconSize: [16, 16], // size of the icon
			//shadowSize: [22, 22], // size of the shadow
			iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
			//shadowAnchor: [11, 11], // the same for the shadow
			popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
		}
		return op;
	}
}


/*
	
*/
//添加坐标点击信息
function onEachFeature(feature, layer) {
	var layerNumber = localStorage.getItem("layerNumber");
	var key = layerNumber + "_" + feature.id;
	var popupHtml = '<div class="myPopContainer">';
	popupHtml = '<div class="myPopTitle" >';
	popupHtml += '<div class="myPopName" >' + feature.properties.popTitle +feature.id+'</div>';
	var switchClass = (!(localStorage.getItem(key))) ? "myPopSwitchTodo" : "myPopSwitchDone"
	popupHtml += '<div class="' + switchClass + '" onclick="MarkPoint(this)" data-key="' + key + '"></div>';
	popupHtml += '</div>';
	popupHtml += '<div class="myPopLine"></div>';
	popupHtml += '<div class="myPopClose" onclick="closePop()"></div>';
	popupHtml += '<div class="myPopComment">' + feature.properties.popupContent + '</div>';
	popupHtml += '<div class="myPopPicture">';
	popupHtml += '<img src=./comment_png/' + key + '.png onerror="this.src=\'./imgs/Icon_51.png\'">';
	popupHtml += '</div>';
	popupHtml += '</div>';
	layer.bindPopup(popupHtml);
}

function closePop() {
	$(".leaflet-popup-close-button")[0].click();
}

var markers = {};

function MarkPoint(element) {
	var that = $(element);
	var key = that.attr("data-key");
	var layerNumber = key.split('_')[0];
	var oldValue = localStorage.getItem(key);
	var newValue = !oldValue;
	localStorage.setItem(key, newValue ? "1" : "");
	
	var doneUrl = newValue ? "_done" : ""
	var iconUrl = "./imgs/icon_" + layerNumber + doneUrl + ".png";
	var newIcon = new L.Icon({
		className: "mark-" + key,
		iconUrl: iconUrl,
		shadowUrl: getIconInfo(layerNumber).shadowUrl, // size of the icon
		iconSize: getIconInfo(layerNumber).iconSize, // size of the icon
		shadowSize: getIconInfo(layerNumber).shadowSize, // size of the shadow
		iconAnchor: getIconInfo(layerNumber).iconAnchor, // point of the icon which will correspond to marker's location
		shadowAnchor: getIconInfo(layerNumber).shadowAnchor, // the same for the shadow
		popupAnchor: getIconInfo(layerNumber).popupAnchor // point from which the popup should open relative to the iconAnchor
	});
	markers[key].setIcon(newIcon);

	if (newValue) {
		$('.leaflet-marker-icon.mark-' + key).attr('src', './imgs/icon_' + layerNumber + '_done.png');
		that.addClass("myPopSwitchDone");
		that.removeClass("myPopSwitchTodo");

	} else {
		$('.leaflet-marker-icon.mark-' + key).attr('src', './imgs/icon_' + layerNumber + '.png');
		that.addClass("myPopSwitchTodo");
		that.removeClass("myPopSwitchDone");
	}

}
//定义分类的三个数组，分别对应坐标的组别，坐标的位置和坐标的名称，新增时在对应数组后增加对象即可
//var typearray1 = [Layer_FST, Layer_YST, Layer_DLK_MD, Layer_DLK_LY, Layer_JYJJ, Layer_NSH, Layer_LLBH, Layer_GGG, Layer_DDL, Layer_SXLYH, Layer_MFMG, Layer_LLM, Layer_FCJ, Layer_PGYZ, Layer_YPS, Layer_SP, Layer_SJK_LY, Layer_BTK_LY, Layer_SJK_MD, Layer_BTK_MD, Layer_YJSW_LY, Layer_YJLZ_LY, Layer_LYSS_LY, Layer_ZWCLR_LY, Layer_SYFS_LY, Layer_DXQQR_LY, Layer_BX_MD, Layer_BX_LY];
var typearray1 = [];
for(let k in LayerMap){
	typearray1.push(LayerMap[k]);
}
var typearray2 = [JS_FST, JS_YST, JS_DLK_MD, JS_DLK_LY, JS_JYJJ, JS_NSH, JS_LLBH, JS_GGG, JS_DDL, JS_SXLYH, JS_MFMG, JS_LLM, JS_FCJ, JS_PGYZ, JS_YPS, JS_SP, JS_SJK_LY, JS_BTK_LY, JS_SJK_MD, JS_BTK_MD, JS_YJSW_LY, JS_YJLZ_LY, JS_LYSS_LY, JS_ZWCLR_LY, JS_SYFS_LY, JS_DXQQR_LY, JS_BX_MD, JS_BX_LY];
//var typearray3=[FST,YST,DLK_MD,DLK_LY,JYJJ,NSH,LLBH,GGG,DDL,SXLYH,MFMG,LLM,FCJ,PGYZ,YPS,SP,SJK,BTK,SJK,BTK,YJSW,YJLZ,LYSS,ZWCLR,SYFS,DXQQR,BX_MD];

//初始化各个坐标
for (let i = 0; i < typearray2.length; i++) {
	localStorage.setItem("layerNumber", i);
	L.geoJSON(typearray2[i], {
		pointToLayer: function (feature, latlng) {
			var key = i + "_" + feature.id;
			var markedFlag = false;
			if (localStorage.getItem(key)) {
				markedFlag = true;
			}
			var doneUrl = markedFlag ? "_done" : ""
			var iconUrl = "./imgs/icon_" + i + doneUrl + ".png";
			var marker = L.marker([latlng.lng, latlng.lat], {
				icon: new L.Icon({
					className: "mark-" + i + "_" + `${feature.id}`,
					iconUrl: iconUrl,
					shadowUrl: getIconInfo(i).shadowUrl, // size of the icon
					iconSize: getIconInfo(i).iconSize, // size of the icon
					shadowSize: getIconInfo(i).shadowSize, // size of the shadow
					iconAnchor: getIconInfo(i).iconAnchor, // point of the icon which will correspond to marker's location
					shadowAnchor: getIconInfo(i).shadowAnchor, // the same for the shadow
					popupAnchor: getIconInfo(i).popupAnchor // point from which the popup should open relative to the iconAnchor
				}),
				alt: `${latlng.lng},${latlng.lat}`
			}, );
			markers[key] = marker;
			return marker.addTo(typearray1[i]);

		},
		onEachFeature: onEachFeature
	})
};

function dealIcon(target, key) {


	return target
}

// //定义筛选器项目
// var overlays = {
// 	"<span class='Layer_FST map-opts'>风神瞳</span>": Layer_FST,
// 	"<span class='Layer_YST map-opts'>岩神瞳</span>": Layer_YST,
// 	"<span class='Layer_DLK_MD map-opts'>蒙德</span>": Layer_DLK_MD,
// 	"<span class='Layer_DLK_LY map-opts'>璃月</span>": Layer_DLK_LY,
// 	"<span class='Layer_SJK_LY map-opts'>水晶矿</span>": Layer_SJK_LY,
// 	"<span class='Layer_BTK_LY map-opts'>白铁矿</span>": Layer_BTK_LY,
// 	"<span class='Layer_SJK_MD map-opts'>水晶矿</span>": Layer_SJK_MD,
// 	"<span class='Layer_BTK_MD map-opts'>白铁矿</span>": Layer_BTK_MD,
// 	"<span class='Layer_JYJJ map-opts'>绝云椒椒</span>": Layer_JYJJ,
// 	"<span class='Layer_NSH map-opts'>霓裳花</span>": Layer_NSH,
// 	"<span class='Layer_LLBH map-opts'>琉璃百合</span>": Layer_LLBH,
// 	"<span class='Layer_YPS map-opts'>夜泊石</span>": Layer_YPS,
// 	"<span class='Layer_SP map-opts'>石珀</span>": Layer_SP,
// 	"<span class='Layer_GGG map-opts'>钩钩果</span>": Layer_GGG,
// 	"<span class='Layer_DDL map-opts'>嘟嘟莲</span>": Layer_DDL,
// 	"<span class='Layer_LLM map-opts'>落落梅</span>": Layer_LLM,
// 	"<span class='Layer_SXLYH map-opts'>塞西莉亚花</span>": Layer_SXLYH,
// 	"<span class='Layer_MFMG map-opts'>慕风蘑菇</span>": Layer_MFMG,
// 	"<span class='Layer_FCJ map-opts'>风车菊</span>": Layer_FCJ,
// 	"<span class='Layer_PGYZ map-opts'>蒲公英籽</span>": Layer_PGYZ,
// 	"<span class='Layer_YJSW_LY map-opts'>遗迹守卫</span>": Layer_YJSW_LY,
// 	"<span class='Layer_YJLZ_LY map-opts'>遗迹猎者</span>": Layer_YJLZ_LY,
// 	"<span class='Layer_DXQQR_LY map-opts'>大型丘丘人</span>": Layer_DXQQR_LY,
// 	"<span class='Layer_SYFS_LY map-opts'>深渊法师</span>": Layer_SYFS_LY,
// 	"<span class='Layer_ZWCLR_LY map-opts'>债务处理人</span>": Layer_ZWCLR_LY,
// 	"<span class='Layer_LYSS_LY map-opts'>雷莹术士</span>": Layer_LYSS_LY,
// 	"<span class='Layer_BX_MD map-opts'>宝箱—蒙德</span>": Layer_BX_MD,
// 	"<span class='Layer_BX_LY map-opts'>宝箱—璃月</span>": Layer_BX_LY,
// };
// //添加筛选器
// L.control.layers(null, overlays, {
// 	collapsed: false,
// }).addTo(map);

map.on('popupopen', function(e) {
	var marker = e.popup._source;
	var className = marker.options.icon.options.className;
	var key = className.substring(5,className.length);
	var markedFlag = localStorage.getItem(key);
	var switchClass = (!(localStorage.getItem(key))) ? "myPopSwitchTodo" : "myPopSwitchDone"
	var popupHtml = '<div class="myPopContainer">';
	popupHtml = '<div class="myPopTitle" >';
	popupHtml += '<div class="myPopName" >' + marker.feature.properties.popTitle +marker.feature.id+'</div>';
	popupHtml += '<div class="' + switchClass + '" onclick="MarkPoint(this)" data-key="' + key + '"></div>';
	popupHtml += '</div>';
	popupHtml += '<div class="myPopLine"></div>';
	popupHtml += '<div class="myPopClose" onclick="closePop()"></div>';
	popupHtml += '<div class="myPopComment">' + marker.feature.properties.popupContent + '</div>';
	popupHtml += '<div class="myPopPicture">';
	popupHtml += '<img src=./comment_png/' + key + '.png onerror="this.src=\'./imgs/Icon_51.png\'">';
	popupHtml += '</div>';
	popupHtml += '</div>';
	marker.bindPopup(popupHtml);
});