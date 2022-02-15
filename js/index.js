//@ts-check
//初始化地图
t = L.latLngBounds([0, 0], [-66.5, 90])

/*
   use latLngBounds as maxBoundsRect
           n
      +-----------+
      |           |
      |           |
   w  |           |  e
      |           |
      |           |
      +-----------+
           s
 */
const northEdge = 0
const westEdge = 0
const southEdge = -66.5
const eastEdge = 90
const lon2tile = (lon, zoom) => {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom))
}
const lat2tile = (lat, zoom) => {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  )
}
const topTile = (northEdge, zoom) => lat2tile(northEdge, zoom)
const leftTile = (westEdge, zoom) => lon2tile(westEdge, zoom)
const bottomTile = (southEdge, zoom) => lat2tile(southEdge, zoom)
const rightTile = (eastEdge, zoom) => lon2tile(eastEdge, zoom)

var map = L.map('map', {
  //crs: L.CRS.Simple,
  center: [-35, 45],
  zoomDelta: 0.5,
  zoomSnap: 0.5,
  maxZoom: 8,
  minZoom: 4,
  zoom: 4,
  maxBounds: t,
  attributionControl: false,
  zoomControl: false,
})
L.control
  .attribution({
    prefix:
      "<a href='https://bbs.mihoyo.com/ys/article/1328298' target='_blank'>使用说明/米游社空荧酒馆</a>",
  })
  .addTo(map)
L.TileLayer.T = L.TileLayer.extend({
  getTileUrl: function (coords) {
    x = coords.x
    y = coords.y
    z = coords.z
    if (
      x >= leftTile(westEdge, z) &&
      x < rightTile(eastEdge, z) &&
      y >= topTile(northEdge, z) &&
      y <= bottomTile(southEdge, z)
    ) {
      return 'tiles_test/' + coords.z + '/ppp' + x + '_' + y + '.jpg'
    } else {
      // TODO: return ?
      return null
    }
  },
  reuseTiles: true,
})
L.tileLayer.t = function () {
  return new L.TileLayer.T()
}
map.addLayer(L.tileLayer.t())
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
  Layer_FST: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_YST: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_DLK_MD: L.markerClusterGroup(),
  Layer_DLK_LY: L.markerClusterGroup(),
  Layer_JYJJ: L.markerClusterGroup(),
  Layer_NSH: L.markerClusterGroup(),
  Layer_LLBH: L.markerClusterGroup(),
  Layer_GGG: L.markerClusterGroup(),
  Layer_DDL: L.markerClusterGroup(),
  Layer_SXLYH: L.markerClusterGroup(),
  Layer_MFMG: L.markerClusterGroup(),
  Layer_LLM: L.markerClusterGroup(),
  Layer_FCJ: L.markerClusterGroup(),
  Layer_PGYZ: L.markerClusterGroup(),
  Layer_YPS: L.markerClusterGroup(),
  Layer_SP: L.markerClusterGroup(),
  Layer_SJK_LY: L.markerClusterGroup(),
  Layer_BTK_LY: L.markerClusterGroup(),
  Layer_SJK_MD: L.markerClusterGroup(),
  Layer_BTK_MD: L.markerClusterGroup(),
  Layer_YJSW_LY: L.markerClusterGroup(),
  Layer_YJLZ_LY: L.markerClusterGroup(),
  Layer_LYSS_LY: L.markerClusterGroup(),
  Layer_ZWCLR_LY: L.markerClusterGroup(),
  Layer_SYFS_LY: L.markerClusterGroup(),
  Layer_DXQQR_LY: L.markerClusterGroup(),
  Layer_BX_MD: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 100
      if (e == 4) radius = 100
      else if (e == 5) radius = 80
      else if (e == 6) radius = 55
      else if (e == 7) radius = 25
      //console.log(radius);
      return radius
    },
  }),
  Layer_BX_LY: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 100
      if (e == 4) radius = 100
      else if (e == 5) radius = 80
      else if (e == 6) radius = 55
      else if (e == 7) radius = 25
      //console.log(radius);
      return radius
    },
  }),
  Layer_LLD: L.markerClusterGroup(),
  Layer_YJSW_MD: L.markerClusterGroup(),
  Layer_DXQQR_MD: L.markerClusterGroup(),
  Layer_SYFS_MD: L.markerClusterGroup(),
  Layer_LYSS_MD: L.markerClusterGroup(),
  Layer_DBT_MD: L.markerClusterGroup(),
  Layer_DBT_LY: L.markerClusterGroup(),
  Layer_PPH_MD: L.markerClusterGroup(),
  Layer_PPH_LY: L.markerClusterGroup(),
  Layer_XQD_MD: L.markerClusterGroup(),
  Layer_XQD_LY: L.markerClusterGroup(),
  Layer_YYLX_LY: L.markerClusterGroup(),
  Layer_SLM_MD: L.markerClusterGroup(),
  Layer_SLM_LY: L.markerClusterGroup(),
  Layer_KFZH_MD: L.markerClusterGroup(),
  Layer_KFZH_LY: L.markerClusterGroup(),
  Layer_QX: L.markerClusterGroup(),
  Layer_MW: L.markerClusterGroup(),
  Layer_LP: L.markerClusterGroup(),
  Layer_XL: L.markerClusterGroup(),
  Layer_XDC: L.markerClusterGroup(),
  Layer_BWHHD_MD: L.markerClusterGroup(),
  Layer_BWHHD_LY: L.markerClusterGroup(),
  Layer_LYHHR_MD: L.markerClusterGroup(),
  Layer_LYHHR_LY: L.markerClusterGroup(),
  Layer_DQSJ_MD: L.markerClusterGroup(),
  Layer_DQSJ_LY: L.markerClusterGroup(),
  Layer_SBLM_MD: L.markerClusterGroup(),
  Layer_SBLM_LY: L.markerClusterGroup(),
  Layer_FGS_MD: L.markerClusterGroup(),
  Layer_FGS_LY: L.markerClusterGroup(),
  Layer_JH_MD: L.markerClusterGroup(),
  Layer_JH_LY: L.markerClusterGroup(),
  Layer_JYC_MD: L.markerClusterGroup(),
  Layer_JYC_LY: L.markerClusterGroup(),
  Layer_HDCB_MD: L.markerClusterGroup(),
  Layer_HDCB_LY: L.markerClusterGroup(),
  Layer_PX_MD: L.markerClusterGroup(),
  Layer_PX_LY: L.markerClusterGroup(),
  Layer_QW_MD: L.markerClusterGroup(),
  Layer_QW_LY: L.markerClusterGroup(),
  Layer_TTH_MD: L.markerClusterGroup(),
  Layer_TTH_LY: L.markerClusterGroup(),
  Layer_BH_MD: L.markerClusterGroup(),
  Layer_BH_LY: L.markerClusterGroup(),
  Layer_SongR_MD: L.markerClusterGroup(),
  Layer_SongR_LY: L.markerClusterGroup(),
  Layer_ShouR_MD: L.markerClusterGroup(),
  Layer_ShouR_LY: L.markerClusterGroup(),
  Layer_QR_MD: L.markerClusterGroup(),
  Layer_QR_LY: L.markerClusterGroup(),
  Layer_YR_MD: L.markerClusterGroup(),
  Layer_YR_LY: L.markerClusterGroup(),
  Layer_BLB_MD: L.markerClusterGroup(),
  Layer_BLB_LY: L.markerClusterGroup(),
  Layer_HLB_MD: L.markerClusterGroup(),
  Layer_HLB_LY: L.markerClusterGroup(),
  Layer_MG_MD: L.markerClusterGroup(),
  Layer_MG_LY: L.markerClusterGroup(),
  Layer_XYWB_MD: L.markerClusterGroup(),
  Layer_XYWB_LY: L.markerClusterGroup(),
  Layer_SG_MD: L.markerClusterGroup(),
  Layer_SG_LY: L.markerClusterGroup(),
  Layer_SM_MD: L.markerClusterGroup(),
  Layer_SM_LY: L.markerClusterGroup(),
  Layer_QQR_MD: L.markerClusterGroup(),
  Layer_QQR_LY: L.markerClusterGroup(),
  Layer_QQSM_MD: L.markerClusterGroup(),
  Layer_QQSM_LY: L.markerClusterGroup(),
  Layer_DWQ_MD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_DWQ_LY: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_JG_MD: L.markerClusterGroup(),
  Layer_JG_LY: L.markerClusterGroup(),
  Layer_MJK_MD: L.markerClusterGroup(),
  Layer_MJK_LY: L.markerClusterGroup(),
  Layer_S_LY: L.markerClusterGroup(),
  Layer_NQ_LY: L.markerClusterGroup(),
  Layer_YSSP_MD: L.markerClusterGroup(),
  Layer_YSSP_LY: L.markerClusterGroup(),
  Layer_RLG_MD: L.markerClusterGroup(),
  Layer_RLG_LY: L.markerClusterGroup(),
  Layer_PG_MD: L.markerClusterGroup(),
  Layer_PG_LY: L.markerClusterGroup(),
  Layer_FHYS: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_LXR_MD: L.markerClusterGroup(),
  Layer_SJ_MD: L.markerClusterGroup(),
  Layer_SJ_LY: L.markerClusterGroup(),
  Layer_SJRW_MD: L.markerClusterGroup(),
  Layer_SJRW_LY: L.markerClusterGroup(),
  Layer_SYWD_MD: L.markerClusterGroup(),
  Layer_SYWD_LY: L.markerClusterGroup(),
  Layer_KDCD_MD: L.markerClusterGroup(),
  Layer_KDCD_LY: L.markerClusterGroup(),
  Layer_QD_MD: L.markerClusterGroup(),
  Layer_QD_LY: L.markerClusterGroup(),
  Layer_YZY: L.markerClusterGroup(),
  Layer_XYKS: L.markerClusterGroup(),
  Layer_SX_MD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_SX_LY: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_MD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_LY: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MJ_MD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MJ_LY: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_FB_MD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_FB_LY: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_ZWCLR_MD: L.markerClusterGroup(),
  Layer_QQRSS_MD: L.markerClusterGroup(),
  Layer_QQRSS_LY: L.markerClusterGroup(),
  Layer_TFWT_MD: L.markerClusterGroup(),
  Layer_TFWT_LY: L.markerClusterGroup(),
  Layer_ShiP_MD: L.markerClusterGroup(),
  Layer_ShiP_LY: L.markerClusterGroup(),
  Layer_YLX_LY: L.markerClusterGroup(),
}

//定义各个坐标使用的图标
function getIconInfo(Name) {
  switch (Name) {
    case 'ST': {
      //神瞳
      var icon_base = L.Icon.extend({
        options: {
          iconSize: [24, 24], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [0, -12], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'DLK': {
      //地灵龛
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_notfind.svg',
          iconSize: [24, 23], // size of the icon
          shadowSize: [40, 40], // size of the shadow
          iconAnchor: [12, 34.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [20, 40], // the same for the shadow
          popupAnchor: [0, -34.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'TC': {
      //特产
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_notfind_black.svg',
          iconSize: [16.5, 17], // size of the icon
          shadowSize: [28, 28], // size of the shadow
          iconAnchor: [8.2, 24.3], // point of the icon which will correspond to marker's location
          shadowAnchor: [14, 28], // the same for the shadow
          popupAnchor: [0, -24.3], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'KW': {
      //矿物
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_stonenot.svg',
          iconSize: [20, 20], // size of the icon
          shadowSize: [34, 34], // size of the shadow
          iconAnchor: [10, 28], // point of the icon which will correspond to marker's location
          shadowAnchor: [17, 34], // the same for the shadow
          popupAnchor: [0, -28], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'JYG': {
      //精英怪
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_notfind.svg',
          iconSize: [23.4, 23.4], // size of the icon
          shadowSize: [38, 38], // size of the shadow
          iconAnchor: [11.7, 33.4], // point of the icon which will correspond to marker's location
          shadowAnchor: [19, 38], // the same for the shadow
          popupAnchor: [0, -33.4], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'PTG': {
      //普通怪
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_notfind.svg',
          iconSize: [17, 17], // size of the icon
          shadowSize: [28, 28], // size of the shadow
          iconAnchor: [8.5, 24.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [14, 28], // the same for the shadow
          popupAnchor: [0, -24.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'BX': {
      // 宝箱
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_stonenot.svg',
          iconSize: [22, 22], // size of the icon
          shadowSize: [24, 24], // size of the shadow
          iconAnchor: [11, 24], // point of the icon which will correspond to marker's location
          shadowAnchor: [12, 24], // the same for the shadow
          popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'CSD': {
      // 传送点
      var icon_base = L.Icon.extend({
        options: {
          iconSize: [23, 33], // size of the icon
          shadowSize: [24, 24], // size of the shadow
          iconAnchor: [11.5, 16.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [12, 24], // the same for the shadow
          popupAnchor: [0, -16.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'SX': {
      // 神像
      var icon_base = L.Icon.extend({
        options: {
          iconSize: [30, 43], // size of the icon
          shadowSize: [24, 24], // size of the shadow
          iconAnchor: [15, 21.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [12, 24], // the same for the shadow
          popupAnchor: [0, -21.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'FBMJ': {
      // 副本、秘境
      var icon_base = L.Icon.extend({
        options: {
          iconSize: [33, 33], // size of the icon
          shadowSize: [24, 24], // size of the shadow
          iconAnchor: [16.5, 16.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [12, 24], // the same for the shadow
          popupAnchor: [0, -16.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    default: {
      //默认
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: './imgs/loc_notfind.svg',
          iconSize: [17, 17], // size of the icon
          shadowSize: [28, 28], // size of the shadow
          iconAnchor: [8.5, 24.5], // point of the icon which will correspond to marker's location
          shadowAnchor: [14, 28], // the same for the shadow
          popupAnchor: [0, -24.5], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
  }
}

var state = 1

function change() {
  if (!$('.myPopComment').hasClass('disable')) {
    if (state == 1) {
      $('.Select').animate({}, function () {
        $('.Select').css({
          transform: 'rotate(-180deg)',
        })
      })
      $('.myPopPicture').animate(
        {
          height: '0px',
        },
        function () {
          state = 0
        }
      )
    } else {
      $('.Select').animate({}, function () {
        $('.Select').css({
          transform: 'rotate(0deg)',
        })
      })
      $('.myPopPicture').animate(
        {
          height: '326px',
        },
        function () {
          state = 1
        }
      )
    }
  }
}

//添加坐标点击信息
function onEachFeature(feature, layer) {
  // var layerNumber = localStorage.getItem("layerNumber");
  // var key = layerNumber + "_" + feature.id;
  // var popupHtml = '<div class="myPopContainer">';
  // popupHtml = '<div class="myPopTitle" >';
  // popupHtml += '<div class="myPopName" >' + feature.properties.popTitle + feature.id + '</div>';
  // var switchClass = (!(localStorage.getItem(key))) ? "myPopSwitchTodo" : "myPopSwitchDone"
  // popupHtml += '</div>';
  // popupHtml += '<div class="myPopLine"></div>';
  // popupHtml += '<div class="myPopClose" onclick="closePop()"></div>';
  // popupHtml += '<div class="myPopComment"><span>' + feature.properties.popupContent + '</span><img class="Select" src=imgs/con_img/Select.png></div>';
  // popupHtml += '<div class="myPopPicture">';
  // popupHtml += '<img src=comment_png/' + key + '.jpg onerror="javascript:$(\'.myPopComment,.myPopPicture\').addClass(\'disable\');$(\'.myPopComment\').css({\'cursor\': \'default\'})">';
  // popupHtml += '</div>';
  // popupHtml += '<div class="' + switchClass + '" onclick="MarkPoint(this)" data-key="' + key + '"><p class="switchOff">未完成</p><p class="switchOn">已完成</p><div class="switchButton"><div class="switchButtonIcon"><p>未完成</p></div></div></div>';
  // popupHtml += '<div class="tipcard"></div>'
  // popupHtml += '</div>';
  layer.bindPopup()
}

function closePop() {
  $('.leaflet-popup-close-button')[0].click()
}

function openIssue() {
  alert('clicked openIssue')
  createIssue('issueName', 'issueContent', 'null')
}

//定义分类的数组，分别对应 物品层，物品Json名，物品icon类型，新增时在对应数组后增加对象即可
var typearray = [
  [LayerMap['Layer_FST'], JS_FST, 'ST', 'FST'],
  [LayerMap['Layer_YST'], JS_YST, 'ST', 'YST'],
  [LayerMap['Layer_DLK_MD'], JS_DLK_MD, 'DLK', 'DLK_MD'],
  [LayerMap['Layer_DLK_LY'], JS_DLK_LY, 'DLK', 'DLK_LY'],
  [LayerMap['Layer_JYJJ'], JS_JYJJ, 'TC', 'JYJJ'],
  [LayerMap['Layer_NSH'], JS_NSH, 'TC', 'NSH'],
  [LayerMap['Layer_LLBH'], JS_LLBH, 'TC', 'LLBH'],
  [LayerMap['Layer_GGG'], JS_GGG, 'TC', 'GGG'],
  [LayerMap['Layer_DDL'], JS_DDL, 'TC', 'DDL'],
  [LayerMap['Layer_SXLYH'], JS_SXLYH, 'TC', 'SXLYH'],
  [LayerMap['Layer_MFMG'], JS_MFMG, 'TC', 'MFMG'],
  [LayerMap['Layer_LLM'], JS_LLM, 'TC', 'LLM'],
  [LayerMap['Layer_FCJ'], JS_FCJ, 'TC', 'FCJ'],
  [LayerMap['Layer_PGYZ'], JS_PGYZ, 'TC', 'PGYZ'],
  [LayerMap['Layer_YPS'], JS_YPS, 'TC', 'YPS'],
  [LayerMap['Layer_SP'], JS_SP, 'TC', 'SP'],
  [LayerMap['Layer_SJK_LY'], JS_SJK_LY, 'KW', 'SJK_LY'],
  [LayerMap['Layer_BTK_LY'], JS_BTK_LY, 'KW', 'BTK_LY'],
  [LayerMap['Layer_SJK_MD'], JS_SJK_MD, 'KW', 'SJK_MD'],
  [LayerMap['Layer_BTK_MD'], JS_BTK_MD, 'KW', 'BTK_MD'],
  [LayerMap['Layer_YJSW_LY'], JS_YJSW_LY, 'JYG', 'YJSW_LY'],
  [LayerMap['Layer_YJLZ_LY'], JS_YJLZ_LY, 'JYG', 'YJLZ_LY'],
  [LayerMap['Layer_LYSS_LY'], JS_LYSS_LY, 'PTG', 'LYSS_LY'],
  [LayerMap['Layer_ZWCLR_LY'], JS_ZWCLR_LY, 'PTG', 'ZWCLR_LY'],
  [LayerMap['Layer_SYFS_LY'], JS_SYFS_LY, 'PTG', 'SYFS_LY'],
  [LayerMap['Layer_DXQQR_LY'], JS_DXQQR_LY, 'PTG', 'DXQQR_LY'],
  [LayerMap['Layer_BX_MD'], JS_BX_MD, 'BX', 'BX_MD'],
  [LayerMap['Layer_BX_LY'], JS_BX_LY, 'BX', 'BX_LY'],
  [LayerMap['Layer_LLD'], JS_LLD, 'TC', 'LLD'],
  [LayerMap['Layer_YJSW_MD'], JS_YJSW_MD, 'JYG', 'YJSW_MD'],
  [LayerMap['Layer_DXQQR_MD'], JS_DXQQR_MD, 'PTG', 'DXQQR_MD'],
  [LayerMap['Layer_SYFS_MD'], JS_SYFS_MD, 'PTG', 'SYFS_MD'],
  [LayerMap['Layer_LYSS_MD'], JS_LYSS_MD, 'PTG', 'LYSS_MD'],
  [LayerMap['Layer_DBT_MD'], JS_DBT_MD, 'PTG', 'DBT_MD'],
  [LayerMap['Layer_DBT_LY'], JS_DBT_LY, 'PTG', 'DBT_LY'],
  [LayerMap['Layer_PPH_MD'], JS_PPH_MD, 'PTG', 'PPH_MD'],
  [LayerMap['Layer_PPH_LY'], JS_PPH_LY, 'PTG', 'PPH_LY'],
  [LayerMap['Layer_XQD_MD'], JS_XQD_MD, 'PTG', 'XQD_MD'],
  [LayerMap['Layer_XQD_LY'], JS_XQD_LY, 'PTG', 'XQD_LY'],
  [LayerMap['Layer_YYLX_LY'], JS_YYLX_LY, 'PTG', 'YYLX_LY'],
  [LayerMap['Layer_SLM_MD'], JS_SLM_MD, 'PTG', 'SLM_MD'],
  [LayerMap['Layer_SLM_LY'], JS_SLM_LY, 'PTG', 'SLM_LY'],
  [LayerMap['Layer_KFZH_MD'], JS_KFZH_MD, 'JYG', 'KFZH_MD'],
  [LayerMap['Layer_KFZH_LY'], JS_KFZH_LY, 'JYG', 'KFZH_LY'],
  [LayerMap['Layer_QX'], JS_QX, 'TC', 'QX'],
  [LayerMap['Layer_MW'], JS_MW, 'TC', 'MW'],
  [LayerMap['Layer_LP'], JS_LP, 'TC', 'LP'],
  [LayerMap['Layer_XL'], JS_XL, 'TC', 'XL'],
  [LayerMap['Layer_XDC'], JS_XDC, 'TC', 'XDC'],
  [LayerMap['Layer_BWHHD_MD'], JS_BWHHD_MD, 'TC', 'BWHHD_MD'],
  [LayerMap['Layer_BWHHD_LY'], JS_BWHHD_LY, 'TC', 'BWHHD_LY'],
  [LayerMap['Layer_LYHHR_MD'], JS_LYHHR_MD, 'TC', 'LYHHR_MD'],
  [LayerMap['Layer_LYHHR_LY'], JS_LYHHR_LY, 'TC', 'LYHHR_LY'],
  [LayerMap['Layer_DQSJ_MD'], JS_DQSJ_MD, 'TC', 'DQSJ_MD'],
  [LayerMap['Layer_DQSJ_LY'], JS_DQSJ_LY, 'TC', 'DQSJ_LY'],
  [LayerMap['Layer_SBLM_MD'], JS_SBLM_MD, 'TC', 'SBLM_MD'],
  [LayerMap['Layer_SBLM_LY'], JS_SBLM_LY, 'TC', 'SBLM_LY'],
  [LayerMap['Layer_FGS_MD'], JS_FGS_MD, 'TC', 'FGS_MD'],
  [LayerMap['Layer_FGS_LY'], JS_FGS_LY, 'TC', 'FGS_LY'],
  [LayerMap['Layer_JH_MD'], JS_JH_MD, 'TC', 'JH_MD'],
  [LayerMap['Layer_JH_LY'], JS_JH_LY, 'TC', 'JH_LY'],
  [LayerMap['Layer_JYC_MD'], JS_JYC_MD, 'TC', 'JYC_MD'],
  [LayerMap['Layer_JYC_LY'], JS_JYC_LY, 'TC', 'JYC_LY'],
  [LayerMap['Layer_HDCB_MD'], JS_HDCB_MD, 'TC', 'HDCB_MD'],
  [LayerMap['Layer_HDCB_LY'], JS_HDCB_LY, 'TC', 'HDCB_LY'],
  [LayerMap['Layer_PX_MD'], JS_PX_MD, 'TC', 'PX_MD'],
  [LayerMap['Layer_PX_LY'], JS_PX_LY, 'TC', 'PX_LY'],
  [LayerMap['Layer_QW_MD'], JS_QW_MD, 'TC', 'QW_MD'],
  [LayerMap['Layer_QW_LY'], JS_QW_LY, 'TC', 'QW_LY'],
  [LayerMap['Layer_TTH_MD'], JS_TTH_MD, 'TC', 'TTH_MD'],
  [LayerMap['Layer_TTH_LY'], JS_TTH_LY, 'TC', 'TTH_LY'],
  [LayerMap['Layer_BH_MD'], JS_BH_MD, 'TC', 'BH_MD'],
  [LayerMap['Layer_BH_LY'], JS_BH_LY, 'TC', 'BH_LY'],
  [LayerMap['Layer_SongR_MD'], JS_SongR_MD, 'TC', 'SongR_MD'],
  [LayerMap['Layer_SongR_LY'], JS_SongR_LY, 'TC', 'SongR_LY'],
  [LayerMap['Layer_ShouR_MD'], JS_ShouR_MD, 'TC', 'ShouR_MD'],
  [LayerMap['Layer_ShouR_LY'], JS_ShouR_LY, 'TC', 'ShouR_LY'],
  [LayerMap['Layer_QR_MD'], JS_QR_MD, 'TC', 'QR_MD'],
  [LayerMap['Layer_QR_LY'], JS_QR_LY, 'TC', 'QR_LY'],
  [LayerMap['Layer_YR_MD'], JS_YR_MD, 'TC', 'YR_MD'],
  [LayerMap['Layer_YR_LY'], JS_YR_LY, 'TC', 'YR_LY'],
  [LayerMap['Layer_BLB_MD'], JS_BLB_MD, 'TC', 'BLB_MD'],
  [LayerMap['Layer_BLB_LY'], JS_BLB_LY, 'TC', 'BLB_LY'],
  [LayerMap['Layer_HLB_MD'], JS_HLB_MD, 'TC', 'HLB_MD'],
  [LayerMap['Layer_HLB_LY'], JS_HLB_LY, 'TC', 'HLB_LY'],
  [LayerMap['Layer_MG_MD'], JS_MG_MD, 'TC', 'MG_MD'],
  [LayerMap['Layer_MG_LY'], JS_MG_LY, 'TC', 'MG_LY'],
  [LayerMap['Layer_XYWB_MD'], JS_XYWB_MD, 'TC', 'XYWB_MD'],
  [LayerMap['Layer_XYWB_LY'], JS_XYWB_LY, 'TC', 'XYWB_LY'],
  [LayerMap['Layer_SG_MD'], JS_SG_MD, 'TC', 'SG_MD'],
  [LayerMap['Layer_SG_LY'], JS_SG_LY, 'TC', 'SG_LY'],
  [LayerMap['Layer_SM_MD'], JS_SM_MD, 'TC', 'SM_MD'],
  [LayerMap['Layer_SM_LY'], JS_SM_LY, 'TC', 'SM_LY'],
  [LayerMap['Layer_QQR_MD'], JS_QQR_MD, 'PTG', 'QQR_MD'],
  [LayerMap['Layer_QQR_LY'], JS_QQR_LY, 'PTG', 'QQR_LY'],
  [LayerMap['Layer_QQSM_MD'], JS_QQSM_MD, 'PTG', 'QQSM_MD'],
  [LayerMap['Layer_QQSM_LY'], JS_QQSM_LY, 'PTG', 'QQSM_LY'],
  [LayerMap['Layer_DWQ_MD'], JS_DWQ_MD, 'JYG', 'DWQ_MD'],
  [LayerMap['Layer_DWQ_LY'], JS_DWQ_LY, 'JYG', 'DWQ_LY'],
  [LayerMap['Layer_JG_MD'], JS_JG_MD, 'TC', 'JG_MD'],
  [LayerMap['Layer_JG_LY'], JS_JG_LY, 'TC', 'JG_LY'],
  [LayerMap['Layer_MJK_MD'], JS_MJK_MD, 'KW', 'MJK_MD'],
  [LayerMap['Layer_MJK_LY'], JS_MJK_LY, 'KW', 'MJK_LY'],
  [LayerMap['Layer_S_LY'], JS_S_LY, 'TC', 'S_LY'],
  [LayerMap['Layer_NQ_LY'], JS_NQ_LY, 'TC', 'NQ_LY'],
  [LayerMap['Layer_YSSP_MD'], JS_YSSP_MD, 'TC', 'YSSP_MD'],
  [LayerMap['Layer_YSSP_LY'], JS_YSSP_LY, 'TC', 'YSSP_LY'],
  [LayerMap['Layer_RLG_MD'], JS_RLG_MD, 'TC', 'RLG_MD'],
  [LayerMap['Layer_RLG_LY'], JS_RLG_LY, 'TC', 'RLG_LY'],
  [LayerMap['Layer_PG_MD'], JS_PG_MD, 'TC', 'PG_MD'],
  [LayerMap['Layer_PG_LY'], JS_PG_LY, 'TC', 'PG_LY'],
  [LayerMap['Layer_FHYS'], JS_FHYS, 'ST', 'FHYS'],
  [LayerMap['Layer_LXR_MD'], JS_LXR_MD, 'TC', 'LXR_MD'],
  [LayerMap['Layer_SJ_MD'], JS_SJ_MD, 'TC', 'SJ_MD'],
  [LayerMap['Layer_SJ_LY'], JS_SJ_LY, 'TC', 'SJ_LY'],
  [LayerMap['Layer_SJRW_MD'], JS_SJRW_MD, 'TC', 'SJRW_MD'],
  [LayerMap['Layer_SJRW_LY'], JS_SJRW_LY, 'TC', 'SJRW_LY'],
  [LayerMap['Layer_SYWD_MD'], JS_SYWD_MD, 'TC', 'SYWD_MD'],
  [LayerMap['Layer_SYWD_LY'], JS_SYWD_LY, 'TC', 'SYWD_LY'],
  [LayerMap['Layer_KDCD_MD'], JS_KDCD_MD, 'TC', 'KDCD_MD'],
  [LayerMap['Layer_KDCD_LY'], JS_KDCD_LY, 'TC', 'KDCD_LY'],
  [LayerMap['Layer_QD_MD'], JS_QD_MD, 'TC', 'QD_MD'],
  [LayerMap['Layer_QD_LY'], JS_QD_LY, 'TC', 'QD_LY'],
  [LayerMap['Layer_YZY'], JS_YZY, 'TC', 'YZY'],
  [LayerMap['Layer_XYKS'], JS_XYKS, 'TC', 'XYKS'],
  [LayerMap['Layer_SX_MD'], JS_SX_MD, 'SX', 'SX_MD'],
  [LayerMap['Layer_SX_LY'], JS_SX_LY, 'SX', 'SX_LY'],
  [LayerMap['Layer_CSD_MD'], JS_CSD_MD, 'CSD', 'CSD_MD'],
  [LayerMap['Layer_CSD_LY'], JS_CSD_LY, 'CSD', 'CSD_LY'],
  [LayerMap['Layer_MJ_MD'], JS_MJ_MD, 'FBMJ', 'MJ_MD'],
  [LayerMap['Layer_MJ_LY'], JS_MJ_LY, 'FBMJ', 'MJ_LY'],
  [LayerMap['Layer_FB_MD'], JS_FB_MD, 'FBMJ', 'FB_MD'],
  [LayerMap['Layer_FB_LY'], JS_FB_LY, 'FBMJ', 'FB_LY'],
  [LayerMap['Layer_ZWCLR_MD'], JS_ZWCLR_MD, 'PTG', 'ZWCLR_MD'],
  [LayerMap['Layer_QQRSS_MD'], JS_QQRSS_MD, 'PTG', 'JS_QQRSS_MD'],
  [LayerMap['Layer_QQRSS_LY'], JS_QQRSS_LY, 'PTG', 'JS_QQRSS_LY'],
  [LayerMap['Layer_TFWT_MD'], JS_TFWT_MD, 'TC', 'JS_TFWT_MD'],
  [LayerMap['Layer_TFWT_LY'], JS_TFWT_LY, 'TC', 'JS_TFWT_LY'],
  [LayerMap['Layer_ShiP_MD'], JS_ShiP_MD, 'TC', 'JS_ShiP_MD'],
  [LayerMap['Layer_ShiP_LY'], JS_ShiP_LY, 'TC', 'JS_ShiP_LY'],
  [LayerMap['Layer_YLX_LY'], JS_YLX_LY, 'PTG', 'JS_YLX_LY'],
]
const MonosTime = {
  LLD: 48,
  MFMG: 48,
  QW_LY: 24,
  QW_MD: 24,
  SXLYH: 48,
  XDC: 48,
  SP: 48,
  LLBH: 48,
  ShouR_LY: 24,
  ShouR_MD: 24,
  FCJ: 48,
  PGYZ: 48,
  DQSJ_LY: 48,
  DQSJ_MD: 48,
  GGG: 48,
  NSH: 48,
  PX_LY: 24,
  PX_MD: 24,
  YR_LY: 24,
  YR_MD: 24,
  LLM: 48,
  JYJJ: 48,
  YPS: 48,
  LP: 48,
  DDL: 48,
  SJK_LY: 72,
  SJK_MD: 72,
  BTK_MD: 48,
  BTK_LY: 48,
  DWQ_MD: 12,
  DWQ_LY: 12,
}
//标记方法
var markers = {}

function MarkPoint(element) {
  console.log('element', element)
  var that = $(element)
  var key = that.attr('data-key')
  var layerNumber = key.split('_')[0]
  var currentIcon = getIconInfo(typearray[layerNumber][2])
  var oldValue = localStorage.getItem(key)
  var newValue = !oldValue
  localStorage.setItem(key, newValue ? '1' : '')
  localStorage.setItem('NetSync', 'false')

  if (Object.keys(MonosTime).indexOf(typearray[layerNumber][3]) !== -1) {
    const now = new Date()
    localStorage.setItem(
      'done_time_' + key,
      newValue
        ? JSON.stringify({
            stat: now.toString(),
            end: new Date(
              now.setHours(
                now.getHours() + MonosTime[typearray[layerNumber][3]]
              )
            ).toString(),
            layerNumber,
          })
        : ''
    )
  }

  var doneUrl = newValue ? '_done' : ''
  if (
    layerNumber == 0 ||
    layerNumber == 1 ||
    layerNumber == 26 ||
    layerNumber == 27 ||
    layerNumber == 111
  ) {
    var iconUrl = './imgs/icon_' + layerNumber + doneUrl + '.svg'
  } else {
    var iconUrl = './imgs/icon_' + layerNumber + doneUrl + '.png'
  }
  var currentShowdow = currentIcon.prototype.options.shadowUrl
  var downShadow
  if (
    currentShowdow == './imgs/loc_find.svg' ||
    currentShowdow == './imgs/loc_notfind.svg'
  ) {
    downShadow = newValue ? './imgs/loc_find.svg' : './imgs/loc_notfind.svg'
  } else if (
    currentShowdow == './imgs/loc_stonenot.svg' ||
    currentShowdow == './imgs/loc_stonefound.svg'
  ) {
    downShadow = newValue
      ? './imgs/loc_stonefound.svg'
      : './imgs/loc_stonenot.svg'
  } else if (
    currentShowdow == './imgs/loc_find_black.svg' ||
    currentShowdow == './imgs/loc_notfind_black.svg'
  ) {
    downShadow = newValue
      ? './imgs/loc_find_black.svg'
      : './imgs/loc_notfind_black.svg'
  }
  var doneShadowUrl = currentShowdow ? downShadow : ''
  var newIcon = new currentIcon({
    className: 'mark-' + key,
    iconUrl: iconUrl,
    shadowUrl: doneShadowUrl,
  })
  markers[key].setIcon(newIcon)
  if (newValue) {
    that.addClass('myPopSwitchDone')
    that.removeClass('myPopSwitchTodo')
    setTimeout(function () {
      that.find('.switchButton p').html('已完成')
    }, 100)
  } else {
    that.addClass('myPopSwitchTodo')
    that.removeClass('myPopSwitchDone')
    setTimeout(function () {
      that.find('.switchButton p').html('未完成')
    }, 100)
  }
  setTimeout(function () {
    markers[key].closePopup()
  }, 500)
}

//初始化各个坐标
function InitMarkerLayer() {
  for (let i = 0; i < typearray.length; i++) {
    localStorage.setItem('layerNumber', i)
    typearray[i][0].clearLayers()
    var currentIcon = getIconInfo(typearray[i][2])
    L.geoJSON(typearray[i][1], {
      pointToLayer: function (feature, latlng) {
        var key = i + '_' + feature.id
        var markedFlag = false
        if (localStorage.getItem(key)) {
          markedFlag = true
        }
        var doneUrl = markedFlag ? '_done' : ''
        if (i == 0 || i == 1 || i == 26 || i == 27 || i == 111) {
          var iconUrl = './imgs/icon_' + i + doneUrl + '.svg'
        } else {
          var iconUrl = './imgs/icon_' + i + doneUrl + '.png'
        }
        var currentShowdow = currentIcon.prototype.options.shadowUrl
        var downShadow
        if (
          currentShowdow == './imgs/loc_find.svg' ||
          currentShowdow == './imgs/loc_notfind.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_find.svg'
            : './imgs/loc_notfind.svg'
        } else if (
          currentShowdow == './imgs/loc_stonenot.svg' ||
          currentShowdow == './imgs/loc_stonefound.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_stonefound.svg'
            : './imgs/loc_stonenot.svg'
        } else if (
          currentShowdow == './imgs/loc_find_black.svg' ||
          currentShowdow == './imgs/loc_notfind_black.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_find_black.svg'
            : './imgs/loc_notfind_black.svg'
        }
        var doneShadowUrl = currentShowdow ? downShadow : ''
        var marker = L.marker([latlng.lng, latlng.lat], {
          icon: new currentIcon({
            className: 'mark-' + i + '_' + `${feature.id}`,
            iconUrl: iconUrl,
            shadowUrl: doneShadowUrl,
          }),
          alt: `${latlng.lng},${latlng.lat}`,
        })
        markers[key] = marker
        return marker.addTo(typearray[i][0])
      },
      onEachFeature: onEachFeature,
    })
  }
}

InitMarkerLayer()

function freshMarkerLayer() {
  for (let i = 0; i < typearray.length; i++) {
    localStorage.setItem('layerNumber', i)
    var currentIcon = getIconInfo(typearray[i][2])
    L.geoJSON(typearray[i][1], {
      pointToLayer: function (feature, latlng) {
        var key = i + '_' + feature.id
        var markedFlag = false
        if (localStorage.getItem(key)) {
          markedFlag = true
        }
        var doneUrl = markedFlag ? '_done' : ''
        if (i == 0 || i == 1 || i == 26 || i == 27 || i == 111) {
          var iconUrl = './imgs/icon_' + i + doneUrl + '.svg'
        } else {
          var iconUrl = './imgs/icon_' + i + doneUrl + '.png'
        }
        var currentShowdow = currentIcon.prototype.options.shadowUrl
        var downShadow
        if (
          currentShowdow == './imgs/loc_find.svg' ||
          currentShowdow == './imgs/loc_notfind.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_find.svg'
            : './imgs/loc_notfind.svg'
        } else if (
          currentShowdow == './imgs/loc_stonenot.svg' ||
          currentShowdow == './imgs/loc_stonefound.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_stonefound.svg'
            : './imgs/loc_stonenot.svg'
        } else if (
          currentShowdow == './imgs/loc_find_black.svg' ||
          currentShowdow == './imgs/loc_notfind_black.svg'
        ) {
          downShadow = markedFlag
            ? './imgs/loc_find_black.svg'
            : './imgs/loc_notfind_black.svg'
        }
        var doneShadowUrl = currentShowdow ? downShadow : ''
        var newIcon = new currentIcon({
          className: 'mark-' + key,
          iconUrl: iconUrl,
          shadowUrl: doneShadowUrl,
        })
        markers[key].setIcon(newIcon)
        markers[key].refreshIconOptions(newIcon, true)
      },
      onEachFeature: onEachFeature,
    })
  }
}

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
let timer
map.on('popupopen', function (e) {
  console.log('e', e)
  state = 1
  var marker = e.popup._source
  var className = marker.options.icon.options.className
  var key = className.substring(5, className.length)
  var markedFlag = localStorage.getItem(key)
  var switchClass = !markedFlag ? 'myPopSwitchTodo' : 'myPopSwitchDone'
  var videoUrl = JS_MEDIA_LIST[key] || ''
  var videoClass = videoUrl ? 'hasVideo' : ''
  var switchText = !markedFlag ? '未完成' : '已完成'
  const timeValue = localStorage.getItem('done_time_' + key)

  console.log(timeValue)
  var popupHtml = `
	<div class="myPopContainer">
		<div class="myPopTitle">
			<div class="myPopName">${marker.feature.properties.popTitle}${marker.feature.id}</div>
		</div>
		<div class="myPopLine"></div>
		<div class="myPopIssue" onclick="openIssue()">反馈<img class="myPopIssueIcon" src="imgs/con_img/popIssue.png"></div>
		<div class="myPopClose" onclick="closePop()"></div>
		<div class="myPopComment" onclick="change()">${marker.feature.properties.popupContent}
			<img class="Select" src="imgs/con_img/Select.png">
		</div>
		<div class="time-wrapper"><span id="time"></span></div>
		<div class="myPopPicture hasVideo">
			<img src="comment_png/${key}.jpg" onerror="javascript:$(\'.myPopComment,.myPopPicture\').addClass(\'disable\');$(\'.myPopComment\').css({\'cursor\': \'default\'})">
      <img class="noImgVideoTip" src="imgs/media_img/onlyMedia.png">
		</div>
		<div class="${switchClass}" onclick="MarkPoint(this)" data-key="${key}">
			<p class="switchOff">未完成</p>
			<p class="switchOn">已完成</p>
			<div class="switchButton">
				<div class="switchButtonIcon">
					<p>${switchText}</p>
				</div>
			</div>
		</div>
		<div class="tipcard"></div>
	</div>`
  if (timeValue) {
    const { start, end } = JSON.parse(timeValue)
    let endTime = new Date(end)
    timer = setInterval(() => {
      let mss = endTime.getTime() - new Date().getTime()
      var day = parseInt(String(mss / (1000 * 60 * 60 * 24)))
      var hours = parseInt(
        String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      )
      var minutes = parseInt(String((mss % (1000 * 60 * 60)) / (1000 * 60)))
      var seconds = parseInt(String((mss % (1000 * 60)) / 1000))
      $('.myPopContainer #time ').text(
        seconds >= 0 ? `刷新时间：${day}天, ${hours}:${minutes}:${seconds}` : ''
      )
    }, 500)
  }

  marker.bindPopup(popupHtml)
})

map.on('popupclose', function () {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
})

function updatePointTime() {
  setInterval(() => {
    let store = Object.keys(localStorage).reduce((acc, key) => {
      if (key.includes('done_time_') && localStorage.getItem(key)) {
        const value = JSON.parse(localStorage.getItem(key))
        const baseKey = key.replace('done_time_', '')
        const isAfterEndTime = new Date(value.end).getTime() - Date.now() <= 0
        const layer = typearray[value.layerNumber]
        //console.log('layer', layer[3])
        if (isAfterEndTime) {
          localStorage.setItem(baseKey, '')
          localStorage.setItem(key, '')
          // todo 计时结束 marker icon 修改回初始状态

          //console.log("close");
          let currentIcon = getIconInfo(layer[2])

          let newValue = false
          let doneUrl = newValue ? '_done' : ''
          let iconUrl = './imgs/icon_' + value.layerNumber + doneUrl + '.png'
          let currentShowdow = currentIcon.prototype.options.shadowUrl
          let downShadow
          if (
            currentShowdow == './imgs/loc_find.svg' ||
            currentShowdow == './imgs/loc_notfind.svg'
          ) {
            downShadow = newValue
              ? './imgs/loc_find.svg'
              : './imgs/loc_notfind.svg'
          } else if (
            currentShowdow == './imgs/loc_stonenot.svg' ||
            currentShowdow == './imgs/loc_stonefound.svg'
          ) {
            downShadow = newValue
              ? './imgs/loc_stonefound.svg'
              : './imgs/loc_stonenot.svg'
          } else if (
            currentShowdow == './imgs/loc_find_black.svg' ||
            currentShowdow == './imgs/loc_notfind_black.svg'
          ) {
            downShadow = newValue
              ? './imgs/loc_find_black.svg'
              : './imgs/loc_notfind_black.svg'
          }
          let doneShadowUrl = currentShowdow ? downShadow : ''
          let newIcon = new currentIcon({
            className: 'mark-' + baseKey,
            iconUrl: iconUrl,
            shadowUrl: doneShadowUrl,
          })

          markers[baseKey].setIcon(newIcon)
          markers[baseKey].closePopup()
          localStorage.setItem('NetSync', 'false')
        }
        acc.push(isAfterEndTime)
      }
      return acc
    }, [])
    // console.log('store', store)
  }, 500)
}

$('.myPopComment').click(function (event) {
  change()
})

updatePointTime()
