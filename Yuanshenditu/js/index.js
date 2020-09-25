//初始化地图
t = L.latLngBounds([0, 0], [-66.5, 90]);
var map = L.map("map", {
	//crs: L.CRS.Simple,
	center: [-35, 45],
	zoomDelta: 0.5,
	zoomSnap: 0.5,
	maxZoom: 8,
	minZoom: 4,
	zoom: 4,
	maxBounds: t,
	attributionControl: false,
	zoomControl: false
});
L.control.attribution({
	prefix: "<a href='https://bbs.mihoyo.com/ys/article/1328298' target='_blank'>使用说明/米游社空荧酒馆</a>"
}).addTo(map);
L.control.zoom({
	zoomInTitle: '+',
	zoomOutTitle: '-'
}).addTo(map);
L.TileLayer.T = L.TileLayer.extend({
	getTileUrl: function (coords) {
		x = coords.x
		y = coords.y
		return 'tiles_test/' + coords.z + '/ppp' + x + '_' + y + '.jpg';
	},
	reuseTiles: true
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
	Layer_FST: L.layerGroup(),
	Layer_YST: L.layerGroup(),
	Layer_DLK_MD: L.layerGroup(),
	Layer_DLK_LY: L.layerGroup(),
	Layer_JYJJ: L.layerGroup(),
	Layer_NSH: L.layerGroup(),
	Layer_LLBH: L.layerGroup(),
	Layer_GGG: L.layerGroup(),
	Layer_DDL: L.layerGroup(),
	Layer_SXLYH: L.layerGroup(),
	Layer_MFMG: L.layerGroup(),
	Layer_LLM: L.layerGroup(),
	Layer_FCJ: L.layerGroup(),
	Layer_PGYZ: L.layerGroup(),
	Layer_YPS: L.layerGroup(),
	Layer_SP: L.layerGroup(),
	Layer_SJK_LY: L.layerGroup(),
	Layer_BTK_LY: L.layerGroup(),
	Layer_SJK_MD: L.layerGroup(),
	Layer_BTK_MD: L.layerGroup(),
	Layer_YJSW_LY: L.layerGroup(),
	Layer_YJLZ_LY: L.layerGroup(),
	Layer_LYSS_LY: L.layerGroup(),
	Layer_ZWCLR_LY: L.layerGroup(),
	Layer_SYFS_LY: L.layerGroup(),
	Layer_DXQQR_LY: L.layerGroup(),
	Layer_BX_MD: L.layerGroup(),
	Layer_BX_LY: L.layerGroup(),
	Layer_LLD: L.layerGroup()
}
//定义各个坐标使用的图标
function getIconInfo(Name) {
	switch (Name) {
		case "ST": { //神瞳
			var icon_base = L.Icon.extend({
				options: {
					iconSize: [32.4, 34.2], // size of the icon
					shadowSize: [50, 64], // size of the shadow
					iconAnchor: [16.2, 17.4], // point of the icon which will correspond to marker's location
					shadowAnchor: [4, 62], // the same for the shadow
					popupAnchor: [0, -17.1] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "DLK": { //地灵龛
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [24, 23], // size of the icon
					shadowSize: [40, 40], // size of the shadow
					iconAnchor: [12, 34.5], // point of the icon which will correspond to marker's location
					shadowAnchor: [20, 40], // the same for the shadow
					popupAnchor: [0, -34.5] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "TC": { //特产
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [18, 18], // size of the icon
					shadowSize: [28, 28], // size of the shadow
					iconAnchor: [8.8, 25], // point of the icon which will correspond to marker's location
					shadowAnchor: [14, 28], // the same for the shadow
					popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "KW": { //矿物
			var icon_base = L.Icon.extend({
				options: {
					iconSize: [20, 20], // size of the icon
					shadowSize: [50, 64], // size of the shadow
					iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
					shadowAnchor: [4, 62], // the same for the shadow
					popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "JYG": { //精英怪
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [23.4, 23.4], // size of the icon
					shadowSize: [38, 38], // size of the shadow
					iconAnchor: [11.7, 33.4], // point of the icon which will correspond to marker's location
					shadowAnchor: [19, 38], // the same for the shadow
					popupAnchor: [0, -33.4] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "PTG": { //普通怪
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [17, 17], // size of the icon
					shadowSize: [28, 28], // size of the shadow
					iconAnchor: [8.5, 24.5], // point of the icon which will correspond to marker's location
					shadowAnchor: [14, 28], // the same for the shadow
					popupAnchor: [0, -24.5] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		case "BX": { // 宝箱
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [16.5, 17], // size of the icon
					shadowSize: [28, 28], // size of the shadow
					iconAnchor: [8.2, 24.3], // point of the icon which will correspond to marker's location
					shadowAnchor: [14, 28], // the same for the shadow
					popupAnchor: [0, -24.3] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
		default: { //默认
			var icon_base = L.Icon.extend({
				options: {
					shadowUrl: "./imgs/loc_notfind.svg",
					iconSize: [17, 17], // size of the icon
					shadowSize: [28, 28], // size of the shadow
					iconAnchor: [8.5, 24.5], // point of the icon which will correspond to marker's location
					shadowAnchor: [14, 28], // the same for the shadow
					popupAnchor: [0, -24.5] // point from which the popup should open relative to the iconAnchor
				}
			});
			return icon_base;
		}
	}
}

var state = 1;

function change() {
	if (!$(".myPopComment").hasClass("disable")) {
		if (state == 1) {
			$(".Select").animate({}, function () {
				$(".Select").css({
					'transform': 'rotate(-180deg)'
				})
			});
			$(".myPopPicture").animate({
				height: '0px'
			}, function () {
				state = 0;
			});
		} else {
			$(".Select").animate({}, function () {
				$(".Select").css({
					'transform': 'rotate(0deg)'
				})
			});
			$(".myPopPicture").animate({
				height: '326px'
			}, function () {
				state = 1;
			});
		}
	}
};

//添加坐标点击信息
function onEachFeature(feature, layer) {
	var layerNumber = localStorage.getItem("layerNumber");
	var key = layerNumber + "_" + feature.id;
	var popupHtml = '<div class="myPopContainer">';
	popupHtml = '<div class="myPopTitle" >';
	popupHtml += '<div class="myPopName" >' + feature.properties.popTitle + feature.id + '</div>';
	var switchClass = (!(localStorage.getItem(key))) ? "myPopSwitchTodo" : "myPopSwitchDone"
	popupHtml += '</div>';
	popupHtml += '<div class="myPopLine"></div>';
	popupHtml += '<div class="myPopClose" onclick="closePop()"></div>';
	popupHtml += '<div class="myPopComment"><span>' + feature.properties.popupContent + '</span><img class="Select" src=imgs/con_img/Select.png></div>';
	popupHtml += '<div class="myPopPicture">';
	popupHtml += '<img src=comment_png/' + key + '.jpg onerror="javascript:$(\'.myPopComment,.myPopPicture\').addClass(\'disable\');$(\'.myPopComment\').css({\'cursor\': \'default\'})">';
	popupHtml += '</div>';
	popupHtml += '<div class="' + switchClass + '" onclick="MarkPoint(this)" data-key="' + key + '"></div>';
	popupHtml += '</div>';
	layer.bindPopup(popupHtml);
}

function closePop() {
	$(".leaflet-popup-close-button")[0].click();
}

//定义分类的数组，分别对应 物品层，物品Json名，物品icon类型，新增时在对应数组后增加对象即可
var typearray = [
	[LayerMap["Layer_FST"], JS_FST, "ST"],
	[LayerMap["Layer_YST"], JS_YST, "ST"],
	[LayerMap["Layer_DLK_MD"], JS_DLK_MD, "DLK"],
	[LayerMap["Layer_DLK_LY"], JS_DLK_LY, "DLK"],
	[LayerMap["Layer_JYJJ"], JS_JYJJ, "TC"],
	[LayerMap["Layer_NSH"], JS_NSH, "TC"],
	[LayerMap["Layer_LLBH"], JS_LLBH, "TC"],
	[LayerMap["Layer_GGG"], JS_GGG, "TC"],
	[LayerMap["Layer_DDL"], JS_DDL, "TC"],
	[LayerMap["Layer_SXLYH"], JS_SXLYH, "TC"],
	[LayerMap["Layer_MFMG"], JS_MFMG, "TC"],
	[LayerMap["Layer_LLM"], JS_LLM, "TC"],
	[LayerMap["Layer_FCJ"], JS_FCJ, "TC"],
	[LayerMap["Layer_PGYZ"], JS_PGYZ, "TC"],
	[LayerMap["Layer_YPS"], JS_YPS, "TC"],
	[LayerMap["Layer_SP"], JS_SP, "TC"],
	[LayerMap["Layer_SJK_LY"], JS_SJK_LY, "KW"],
	[LayerMap["Layer_BTK_LY"], JS_BTK_LY, "KW"],
	[LayerMap["Layer_SJK_MD"], JS_SJK_MD, "KW"],
	[LayerMap["Layer_BTK_MD"], JS_BTK_MD, "KW"],
	[LayerMap["Layer_YJSW_LY"], JS_YJSW_LY, "JYG"],
	[LayerMap["Layer_YJLZ_LY"], JS_YJLZ_LY, "JYG"],
	[LayerMap["Layer_LYSS_LY"], JS_LYSS_LY, "PTG"],
	[LayerMap["Layer_ZWCLR_LY"], JS_ZWCLR_LY, "PTG"],
	[LayerMap["Layer_SYFS_LY"], JS_SYFS_LY, "PTG"],
	[LayerMap["Layer_DXQQR_LY"], JS_DXQQR_LY, "PTG"],
	[LayerMap["Layer_BX_MD"], JS_BX_MD, "BX"],
	[LayerMap["Layer_BX_LY"], JS_BX_LY, "BX"],
	[LayerMap["Layer_LLD"], JS_LLD, "TC"]
];

//标记方法
var markers = {};

function MarkPoint(element) {
	var that = $(element);
	var key = that.attr("data-key");
	var layerNumber = key.split('_')[0];
	var currentIcon = getIconInfo(typearray[layerNumber][2]);
	var oldValue = localStorage.getItem(key);
	var newValue = !oldValue;
	localStorage.setItem(key, newValue ? "1" : "");

	var doneUrl = newValue ? "_done" : ""
	var iconUrl = "./imgs/icon_" + layerNumber + doneUrl + ".png";

	var currentShowdow = currentIcon.prototype.options.shadowUrl
	var downShadow = newValue ? "./imgs/loc_find.svg" : "./imgs/loc_notfind.svg"
	var doneShadowUrl = currentShowdow ? downShadow : ""
	var newIcon = new currentIcon({
		className: "mark-" + key,
		iconUrl: iconUrl,
		shadowUrl: doneShadowUrl,
	});
	markers[key].setIcon(newIcon);
	if (newValue) {
		that.addClass("myPopSwitchDone");
		that.removeClass("myPopSwitchTodo");
	} else {
		that.addClass("myPopSwitchTodo");
		that.removeClass("myPopSwitchDone");
	}
}

//初始化各个坐标
for (let i = 0; i < typearray.length; i++) {
	localStorage.setItem("layerNumber", i);
	var currentIcon = getIconInfo(typearray[i][2]);
	L.geoJSON(typearray[i][1], {
		pointToLayer: function (feature, latlng) {
			var key = i + "_" + feature.id;
			var markedFlag = false;
			if (localStorage.getItem(key)) {
				markedFlag = true;
			}
			var doneUrl = markedFlag ? "_done" : ""
			var iconUrl = "./imgs/icon_" + i + doneUrl + ".png";

			var currentShowdow = currentIcon.prototype.options.shadowUrl
			var downShadow = markedFlag ? "./imgs/loc_find.svg" : "./imgs/loc_notfind.svg"
			var doneShadowUrl = currentShowdow ? downShadow : ""
			var marker = L.marker([latlng.lng, latlng.lat], {
				icon: new currentIcon({
					className: "mark-" + i + "_" + `${feature.id}`,
					iconUrl: iconUrl,
					shadowUrl: doneShadowUrl,
				}),
				alt: `${latlng.lng},${latlng.lat}`
			}, );
			markers[key] = marker;
			return marker.addTo(typearray[i][0]);
		},
		onEachFeature: onEachFeature
	})
};

function dealIcon(target, key) {


	return target
}

//定义筛选器项目
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

map.on('popupopen', function (e) {
	state = 1;
	var marker = e.popup._source;
	var className = marker.options.icon.options.className;
	var key = className.substring(5, className.length);
	var markedFlag = localStorage.getItem(key);
	var switchClass = (!(localStorage.getItem(key))) ? "myPopSwitchTodo" : "myPopSwitchDone"
	var popupHtml = '<div class="myPopContainer">';
	popupHtml = '<div class="myPopTitle" >';
	popupHtml += '<div class="myPopName" >' + marker.feature.properties.popTitle + marker.feature.id + '</div>';
	popupHtml += '</div>';
	popupHtml += '<div class="myPopLine"></div>';
	popupHtml += '<div class="myPopClose" onclick="closePop()"></div>';
	popupHtml += '<div class="myPopComment" onclick="change()"><span>' + marker.feature.properties.popupContent + '</span><img class="Select" src=imgs/con_img/Select.png></div>';
	popupHtml += '<div class="myPopPicture">';
	popupHtml += '<img src=comment_png/' + key + '.jpg onerror="javascript:$(\'.myPopComment,.myPopPicture\').addClass(\'disable\');$(\'.myPopComment\').css({\'cursor\': \'default\'})">';
	popupHtml += '</div>';
	popupHtml += '<div class="' + switchClass + '" onclick="MarkPoint(this)" data-key="' + key + '"></div>';
	popupHtml += '</div>';
	marker.bindPopup(popupHtml);
});