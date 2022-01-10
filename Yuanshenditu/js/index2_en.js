// @ts-nocheck
//初始化地图
t = L.latLngBounds([0, 0], [-66.5, 90])
var mapCenter = [3568, 6286],
  mapSize = [12288, 15600]
var mapCRS = L.Util.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(1, 0, 1, 0),
  projection: {
    project: function (latlng) {
      return new L.Point(latlng.lat + mapCenter[0], latlng.lng + mapCenter[1])
    },
    unproject: function (point) {
      return new L.LatLng(point.x - mapCenter[0], point.y - mapCenter[1])
    },
  },
  bounds: L.bounds(L.point(0, 0), L.point(mapSize[0], mapSize[1])),
})
var map = L.map('map', {
  crs: mapCRS,
  center: [2576, 1742],
  zoomDelta: 0,
  zoomSnap: 0.5,
  maxZoom: 2,
  minZoom: -4,
  zoom: -4,
  tap: false,
  maxBounds: L.latLngBounds(
    L.latLng(-mapCenter[0] - 10000, -mapCenter[1] - 10000),
    L.latLng(mapSize[0] - mapCenter[0] + 10000, mapSize[1] - mapCenter[1] + 10000)
  ),
  attributionControl: false,
  zoomControl: false,
})

L.control
  .attribution({
    prefix: `
      <footer role='contentinfo' class='footer'>
        <a href='/docs/disclaimer.html' target='_blank'>Disclaimer</a>
        <a href='/join' target='_blank'>Join Us</a>
        <a href='https://bbs.mihoyo.com/ys/article/1328298' target='_blank' rel="noopener noreferrer">Instructions Use</a>
        <a href='https://support.qq.com/products/321980/blog/505810' target='_blank' rel='noopener noreferrer'>Update Log</a>
        <a href='https://github.com/kongying-tavern' target='_blank' rel='noopener noreferrer'>GitHub</a>
      </footer>
    `,
    position: 'bottomleft',
  })
  .addTo(map)
var area_idx = 'MD'
var area_idx_cur = 'TWT'
var area_idx_last = 'TWT'
L.TileLayer.T = L.TileLayer.extend({
  getTileUrl: function (coords) {
    var x = coords.x,
      y = coords.y,
      z = coords.z + 13
    if (true) {
      if (area_idx == 'QD') {
        return (
          'https://assets.yuanshen.site/tiles_qd/' +
          z +
          '/' +
          x +
          '_' +
          y +
          '.jpg'
        )
      } else if (area_idx == 'QD1') {
        return (
          'https://assets.yuanshen.site/tiles_qd1/' +
          z +
          '/' +
          x +
          '_' +
          y +
          '.jpg'
        )
      } else if (area_idx == 'YXG') {
        return (
          'https://assets.yuanshen.site/tiles_yxg2/' +
          z +
          '/' +
          x +
          '_' +
          y +
          '.png'
        )
      } else {
        return (
          'https://assets.yuanshen.site/tiles_twt/' +
          z +
          '/' +
          x +
          '_' +
          y +
          '.png'
        )
      }
    } else {
      // TODO: return ?
      return L.Util.emptyImageUrl
    }
  },
  reuseTiles: true,
})
var T = new L.TileLayer.T('', {
  maxZoom: 10,
  minZoom: -6,
  maxNativeZoom: 0,
  minNativeZoom: -3,
  bounds: L.latLngBounds(
    L.latLng(-mapCenter[0], -mapCenter[1]),
    L.latLng(mapSize[0] - mapCenter[0], mapSize[1] - mapCenter[1])
  ),
})
map.addLayer(T)
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
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      // console.log(e);
      return radius
    },
  }),
  Layer_BX_LY: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
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
  Layer_TK_MD: L.markerClusterGroup(),
  Layer_TK_LY: L.markerClusterGroup(),
  Layer_TZ_MD: L.markerClusterGroup(),
  Layer_TZ_LY: L.markerClusterGroup(),
  Layer_MLDCD_MD: L.markerClusterGroup(),
  Layer_MLDCD_LY: L.markerClusterGroup(),
  Layer_CSD_QD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_LCMD_QD: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_BiHua_QD: L.markerClusterGroup(),
  Layer_BX_QD: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_HLZ_QD: L.markerClusterGroup(),
  Layer_TK_QD: L.markerClusterGroup(),
  Layer_BTK_QD: L.markerClusterGroup(),
  Layer_SJK_QD: L.markerClusterGroup(),
  Layer_MLDCD_QD: L.markerClusterGroup(),
  Layer_QQR_QD: L.markerClusterGroup(),
  Layer_QQRSS_QD: L.markerClusterGroup(),
  Layer_QQSM_QD: L.markerClusterGroup(),
  Layer_SYFS_QD: L.markerClusterGroup(),
  Layer_DXQQR_QD: L.markerClusterGroup(),
  Layer_SLM_QD: L.markerClusterGroup(),
  Layer_PX_QD: L.markerClusterGroup(),
  Layer_QR_QD: L.markerClusterGroup(),
  Layer_YR_QD: L.markerClusterGroup(),
  Layer_MG_QD: L.markerClusterGroup(),
  Layer_TTH_QD: L.markerClusterGroup(),
  Layer_BH_QD: L.markerClusterGroup(),
  Layer_SM_QD: L.markerClusterGroup(),
  Layer_QD_QD: L.markerClusterGroup(),
  Layer_DQSJ_QD: L.markerClusterGroup(),
  Layer_FGS_QD: L.markerClusterGroup(),
  Layer_HDCB_QD: L.markerClusterGroup(),
  Layer_QW_QD: L.markerClusterGroup(),
  Layer_XYWB_QD: L.markerClusterGroup(),
  Layer_SR_QD: L.markerClusterGroup(),
  Layer_PGYZ_QD: L.markerClusterGroup(),
  Layer_BLB_QD: L.markerClusterGroup(),
  Layer_HLB_QD: L.markerClusterGroup(),
  Layer_BWHHD_QD: L.markerClusterGroup(),
  Layer_LYHHR_QD: L.markerClusterGroup(),
  Layer_XL_QD: L.markerClusterGroup(),
  Layer_PPH_QD: L.markerClusterGroup(),
  Layer_CuiZhu_LY: L.markerClusterGroup(),
  Layer_LenShan_MD: L.markerClusterGroup(),
  Layer_LenShan_LY: L.markerClusterGroup(),
  Layer_SongShu_MD: L.markerClusterGroup(),
  Layer_SongShu_LY: L.markerClusterGroup(),
  Layer_HuaShu_MD: L.markerClusterGroup(),
  Layer_HuaShu_LY: L.markerClusterGroup(),
  Layer_CangBo_MD: L.markerClusterGroup(),
  Layer_CangBo_LY: L.markerClusterGroup(),
  Layer_CuiHuaShu_MD: L.markerClusterGroup(),
  Layer_CuiHuaShu_LY: L.markerClusterGroup(),
  Layer_QueShaShu_LY: L.markerClusterGroup(),
  Layer_HSHL_QD: L.markerClusterGroup(),
  Layer_LST: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_DLK_DQ: L.markerClusterGroup(),
  Layer_BX_DQ: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_DWQ_DQ: L.markerClusterGroup(),
  Layer_JG_DQ: L.markerClusterGroup(),
  Layer_SJ_DQ: L.markerClusterGroup(),
  Layer_SJRW_DQ: L.markerClusterGroup(),
  Layer_SYWD_DQ: L.markerClusterGroup(),
  Layer_SX_DQ: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_DQ: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MJ_DQ: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_FB_DQ: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_TFWT_DQ: L.markerClusterGroup(),
  Layer_ShiP_DQ: L.markerClusterGroup(),
  Layer_TZ_DQ: L.markerClusterGroup(),
  Layer_MLDCD_DQ: L.markerClusterGroup(),
  Layer_SBLM_DQ: L.markerClusterGroup(),
  Layer_HaiDai_DQ: L.markerClusterGroup(),
  Layer_HLZ_DQ: L.markerClusterGroup(),
  Layer_SJK_DQ: L.markerClusterGroup(),
  Layer_BTK_DQ: L.markerClusterGroup(),
  Layer_TK_DQ: L.markerClusterGroup(),
  Layer_MJK_DQ: L.markerClusterGroup(),
  Layer_KDCD_DQ: L.markerClusterGroup(),
  Layer_YJSW_DQ: L.markerClusterGroup(),
  Layer_DXQQR_DQ: L.markerClusterGroup(),
  Layer_SYFS_DQ: L.markerClusterGroup(),
  Layer_LYSS_DQ: L.markerClusterGroup(),
  Layer_DBT_DQ: L.markerClusterGroup(),
  Layer_PPH_DQ: L.markerClusterGroup(),
  Layer_XQD_DQ: L.markerClusterGroup(),
  Layer_SLM_DQ: L.markerClusterGroup(),
  Layer_KFZH_DQ: L.markerClusterGroup(),
  Layer_QQR_DQ: L.markerClusterGroup(),
  Layer_QQRSS_DQ: L.markerClusterGroup(),
  Layer_QQSM_DQ: L.markerClusterGroup(),
  Layer_ZWCLR_DQ: L.markerClusterGroup(),
  Layer_JinGua_DQ: L.markerClusterGroup(),
  Layer_SongR_DQ: L.markerClusterGroup(),
  Layer_PX_DQ: L.markerClusterGroup(),
  Layer_ShouR_DQ: L.markerClusterGroup(),
  Layer_QR_DQ: L.markerClusterGroup(),
  Layer_YR_DQ: L.markerClusterGroup(),
  Layer_BLB_DQ: L.markerClusterGroup(),
  Layer_HLB_DQ: L.markerClusterGroup(),
  Layer_MG_DQ: L.markerClusterGroup(),
  Layer_TTH_DQ: L.markerClusterGroup(),
  Layer_JYC_DQ: L.markerClusterGroup(),
  Layer_BH_DQ: L.markerClusterGroup(),
  Layer_SG_DQ: L.markerClusterGroup(),
  Layer_SM_DQ: L.markerClusterGroup(),
  Layer_RLG_DQ: L.markerClusterGroup(),
  Layer_PG_DQ: L.markerClusterGroup(),
  Layer_LDR_DQ: L.markerClusterGroup(),
  Layer_QD_DQ: L.markerClusterGroup(),
  Layer_BWHHD_DQ: L.markerClusterGroup(),
  Layer_LYHHR_DQ: L.markerClusterGroup(),
  Layer_DQSJ_DQ: L.markerClusterGroup(),
  Layer_FGS_DQ: L.markerClusterGroup(),
  Layer_JH_DQ: L.markerClusterGroup(),
  Layer_HDCB_DQ: L.markerClusterGroup(),
  Layer_QW_DQ: L.markerClusterGroup(),
  Layer_XYWB_DQ: L.markerClusterGroup(),
  Layer_LenShan_DQ: L.markerClusterGroup(),
  Layer_SongShu_DQ: L.markerClusterGroup(),
  Layer_HuaShu_DQ: L.markerClusterGroup(),
  Layer_CangBo_DQ: L.markerClusterGroup(),
  Layer_CuiHuaShu_DQ: L.markerClusterGroup(),
  Layer_FYXQ_DQ: L.markerClusterGroup(),
  Layer_DDC_DQ: L.markerClusterGroup(),
  Layer_JHGS_DQ: L.markerClusterGroup(),
  Layer_MingCao_DQ: L.markerClusterGroup(),
  Layer_XH_DQ: L.markerClusterGroup(),
  Layer_ZJK_DQ: L.markerClusterGroup(),
  Layer_HSHL_QD1: L.markerClusterGroup(),
  Layer_BX_QD1: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_LCMD_QD1: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_QD1: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MLDCD_QD1: L.markerClusterGroup(),
  Layer_BTTZ_QD: L.markerClusterGroup(),
  Layer_SJRW_QD: L.markerClusterGroup(),
  Layer_BTTZ_QD1: L.markerClusterGroup(),
  Layer_YJJB_DQ: L.markerClusterGroup(),
  Layer_YFZ_DQ: L.markerClusterGroup(),
  Layer_DGSN_DQ: L.markerClusterGroup(),
  Layer_WQDCD_DQ: L.markerClusterGroup(),
  Layer_QQBY_DQ: L.markerClusterGroup(),
  Layer_LCMD_DQ: L.markerClusterGroup(),
  Layer_NPC_DQ: L.markerClusterGroup(),
  Layer_NPC_MD: L.markerClusterGroup(),
  Layer_NPC_LY: L.markerClusterGroup(),
  Layer_SongShu2_DQ: L.markerClusterGroup(),
  Layer_LST2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_DLK_DQ2: L.markerClusterGroup(),
  Layer_BX_DQ2: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_DWQ_DQ2: L.markerClusterGroup(),
  Layer_JG_DQ2: L.markerClusterGroup(),
  Layer_SJ_DQ2: L.markerClusterGroup(),
  Layer_SJRW_DQ2: L.markerClusterGroup(),
  Layer_SYWD_DQ2: L.markerClusterGroup(),
  Layer_SX_DQ2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_DQ2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MJ_DQ2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_FB_DQ2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_TFWT_DQ2: L.markerClusterGroup(),
  Layer_ShiP_DQ2: L.markerClusterGroup(),
  Layer_TZ_DQ2: L.markerClusterGroup(),
  Layer_MLDCD_DQ2: L.markerClusterGroup(),
  Layer_SBLM_DQ2: L.markerClusterGroup(),
  Layer_HaiDai_DQ2: L.markerClusterGroup(),
  Layer_HLZ_DQ2: L.markerClusterGroup(),
  Layer_SJK_DQ2: L.markerClusterGroup(),
  Layer_BTK_DQ2: L.markerClusterGroup(),
  Layer_TK_DQ2: L.markerClusterGroup(),
  Layer_MJK_DQ2: L.markerClusterGroup(),
  Layer_KDCD_DQ2: L.markerClusterGroup(),
  Layer_YJSW_DQ2: L.markerClusterGroup(),
  Layer_DXQQR_DQ2: L.markerClusterGroup(),
  Layer_SYFS_DQ2: L.markerClusterGroup(),
  Layer_LYSS_DQ2: L.markerClusterGroup(),
  Layer_DBT_DQ2: L.markerClusterGroup(),
  Layer_PPH_DQ2: L.markerClusterGroup(),
  Layer_XQD_DQ2: L.markerClusterGroup(),
  Layer_SLM_DQ2: L.markerClusterGroup(),
  Layer_KFZH_DQ2: L.markerClusterGroup(),
  Layer_QQR_DQ2: L.markerClusterGroup(),
  Layer_QQRSS_DQ2: L.markerClusterGroup(),
  Layer_QQSM_DQ2: L.markerClusterGroup(),
  Layer_ZWCLR_DQ2: L.markerClusterGroup(),
  Layer_JinGua_DQ2: L.markerClusterGroup(),
  Layer_SongR_DQ2: L.markerClusterGroup(),
  Layer_PX_DQ2: L.markerClusterGroup(),
  Layer_ShouR_DQ2: L.markerClusterGroup(),
  Layer_QR_DQ2: L.markerClusterGroup(),
  Layer_YR_DQ2: L.markerClusterGroup(),
  Layer_BLB_DQ2: L.markerClusterGroup(),
  Layer_HLB_DQ2: L.markerClusterGroup(),
  Layer_MG_DQ2: L.markerClusterGroup(),
  Layer_TTH_DQ2: L.markerClusterGroup(),
  Layer_JYC_DQ2: L.markerClusterGroup(),
  Layer_BH_DQ2: L.markerClusterGroup(),
  Layer_SG_DQ2: L.markerClusterGroup(),
  Layer_SM_DQ2: L.markerClusterGroup(),
  Layer_RLG_DQ2: L.markerClusterGroup(),
  Layer_PG_DQ2: L.markerClusterGroup(),
  Layer_LDR_DQ2: L.markerClusterGroup(),
  Layer_QD_DQ2: L.markerClusterGroup(),
  Layer_BWHHD_DQ2: L.markerClusterGroup(),
  Layer_LYHHR_DQ2: L.markerClusterGroup(),
  Layer_DQ2SJ_DQ2: L.markerClusterGroup(),
  Layer_FGS_DQ2: L.markerClusterGroup(),
  Layer_JH_DQ2: L.markerClusterGroup(),
  Layer_HDCB_DQ2: L.markerClusterGroup(),
  Layer_QW_DQ2: L.markerClusterGroup(),
  Layer_XYWB_DQ2: L.markerClusterGroup(),
  Layer_LiuShan_DQ2: L.markerClusterGroup(),
  Layer_YingShu_DQ2: L.markerClusterGroup(),
  Layer_HLG_DQ2: L.markerClusterGroup(),
  Layer_YuJiaShu_DQ2: L.markerClusterGroup(),
  Layer_YuShanFeng_DQ2: L.markerClusterGroup(),
  Layer_FYXQ_DQ2: L.markerClusterGroup(),
  Layer_DDC_DQ2: L.markerClusterGroup(),
  Layer_JHGS_DQ2: L.markerClusterGroup(),
  Layer_MingCao_DQ2: L.markerClusterGroup(),
  Layer_XH_DQ2: L.markerClusterGroup(),
  Layer_ZJK_DQ2: L.markerClusterGroup(),
  Layer_YJJB_DQ2: L.markerClusterGroup(),
  Layer_YFZ_DQ2: L.markerClusterGroup(),
  Layer_DGSN_DQ2: L.markerClusterGroup(),
  Layer_WQDCD_DQ2: L.markerClusterGroup(),
  Layer_QQBY_DQ2: L.markerClusterGroup(),
  Layer_LCMD_DQ2: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_NPC_DQ2: L.markerClusterGroup(),
  Layer_SongShu_DQ2: L.markerClusterGroup(),
  Layer_DYD_DQ2: L.markerClusterGroup(),
  Layer_XWZM_DQ2: L.markerClusterGroup(),
  Layer_DBY_DQ: L.markerClusterGroup(),
  Layer_DBY_DQ2: L.markerClusterGroup(),
  Layer_TYCS_DQ2: L.markerClusterGroup(),
  Layer_SHZZ_DQ2: L.markerClusterGroup(),
  Layer_SXLYH_DQ2: L.markerClusterGroup(),
  Layer_DDL_DQ2: L.markerClusterGroup(),
  Layer_QX_DQ2: L.markerClusterGroup(),
  Layer_DYD_MD: L.markerClusterGroup(),
  Layer_DYD_LY: L.markerClusterGroup(),
  Layer_ZYF_MD: L.markerClusterGroup(),
  Layer_ZYF_LY: L.markerClusterGroup(),
  Layer_XYBX_MD: L.markerClusterGroup(),
  Layer_XYBX_LY: L.markerClusterGroup(),
  Layer_DYD_DQ: L.markerClusterGroup(),
  Layer_MR_DQ2: L.markerClusterGroup(),
  Layer_PFL_DQ2: L.markerClusterGroup(),
  Layer_BaoXia_DQ: L.markerClusterGroup(),
  Layer_BaoXia_MD: L.markerClusterGroup(),
  Layer_ShiBei_DQ: L.markerClusterGroup(),
  Layer_ShiBei_MD: L.markerClusterGroup(),
  Layer_QYDYC_MD: L.markerClusterGroup(),
  Layer_PLP_MD: L.markerClusterGroup(),
  Layer_DXZW_MD: L.markerClusterGroup(),
  Layer_MLDCD1_DQ: L.markerClusterGroup(),
  Layer_MLDCD1_DQ2: L.markerClusterGroup(),
  Layer_SK_DQ: L.markerClusterGroup(),

  Layer_SCDCD_MD: L.markerClusterGroup(),
  Layer_SCDCD_LY: L.markerClusterGroup(),
  Layer_SCDCD_DQ: L.markerClusterGroup(),
  Layer_SCDCD_DQ2: L.markerClusterGroup(),
  Layer_LST3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_DLK_DQ3: L.markerClusterGroup(),
  Layer_BX_DQ3: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_DWQ_DQ3: L.markerClusterGroup(),
  Layer_JG_DQ3: L.markerClusterGroup(),
  Layer_SJ_DQ3: L.markerClusterGroup(),
  Layer_SJRW_DQ3: L.markerClusterGroup(),
  Layer_SYWD_DQ3: L.markerClusterGroup(),
  Layer_SX_DQ3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_CSD_DQ3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_LCMD_DQ3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_MJ_DQ3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_FB_DQ3: L.markerClusterGroup({
    maxClusterRadius: 0,
  }),
  Layer_TFWT_DQ3: L.markerClusterGroup(),
  Layer_ShiP_DQ3: L.markerClusterGroup(),
  Layer_TZ_DQ3: L.markerClusterGroup(),
  Layer_MLDCD_DQ3: L.markerClusterGroup(),
  Layer_MLDCD1_DQ3: L.markerClusterGroup(),
  Layer_SBLM_DQ3: L.markerClusterGroup(),
  Layer_WQDCD_DQ3: L.markerClusterGroup(),
  Layer_NPC_DQ3: L.markerClusterGroup(),
  Layer_DBY_DQ3: L.markerClusterGroup(),
  Layer_DYD_DQ3: L.markerClusterGroup(),
  Layer_XWZM_DQ3: L.markerClusterGroup(),
  Layer_HLZ_DQ3: L.markerClusterGroup(),
  Layer_FYXQ_DQ3: L.markerClusterGroup(),
  Layer_DDC_DQ3: L.markerClusterGroup(),
  Layer_JHGS_DQ3: L.markerClusterGroup(),
  Layer_MingCao_DQ3: L.markerClusterGroup(),
  Layer_XH_DQ3: L.markerClusterGroup(),
  Layer_TYCS_DQ3: L.markerClusterGroup(),
  Layer_SHZZ_DQ3: L.markerClusterGroup(),
  Layer_YCX_DQ3: L.markerClusterGroup(),
  Layer_SJK_DQ3: L.markerClusterGroup(),
  Layer_BTK_DQ3: L.markerClusterGroup(),
  Layer_TK_DQ3: L.markerClusterGroup(),
  Layer_MJK_DQ3: L.markerClusterGroup(),
  Layer_ZJK_DQ3: L.markerClusterGroup(),
  Layer_KDCD_DQ3: L.markerClusterGroup(),
  Layer_YFZ_DQ3: L.markerClusterGroup(),
  Layer_HLG_DQ3: L.markerClusterGroup(),
  Layer_DGSN_DQ3: L.markerClusterGroup(),
  Layer_YJSW_DQ3: L.markerClusterGroup(),
  Layer_YJJB_DQ3: L.markerClusterGroup(),
  Layer_DXQQR_DQ3: L.markerClusterGroup(),
  Layer_SYFS_DQ3: L.markerClusterGroup(),
  Layer_LYSS_DQ3: L.markerClusterGroup(),
  Layer_DBT_DQ3: L.markerClusterGroup(),
  Layer_PPH_DQ3: L.markerClusterGroup(),
  Layer_XQD_DQ3: L.markerClusterGroup(),
  Layer_SLM_DQ3: L.markerClusterGroup(),
  Layer_KFZH_DQ3: L.markerClusterGroup(),
  Layer_QQR_DQ3: L.markerClusterGroup(),
  Layer_QQRSS_DQ3: L.markerClusterGroup(),
  Layer_QQSM_DQ3: L.markerClusterGroup(),
  Layer_ZWCLR_DQ3: L.markerClusterGroup(),
  Layer_PFL_DQ3: L.markerClusterGroup(),
  Layer_SCDCD_DQ3: L.markerClusterGroup(),
  Layer_HaiDai_DQ3: L.markerClusterGroup(),
  Layer_JinGua_DQ3: L.markerClusterGroup(),
  Layer_SongR_DQ3: L.markerClusterGroup(),
  Layer_PX_DQ3: L.markerClusterGroup(),
  Layer_ShouR_DQ3: L.markerClusterGroup(),
  Layer_QR_DQ3: L.markerClusterGroup(),
  Layer_YR_DQ3: L.markerClusterGroup(),
  Layer_BLB_DQ3: L.markerClusterGroup(),
  Layer_HLB_DQ3: L.markerClusterGroup(),
  Layer_MG_DQ3: L.markerClusterGroup(),
  Layer_TTH_DQ3: L.markerClusterGroup(),
  Layer_JYC_DQ3: L.markerClusterGroup(),
  Layer_BH_DQ3: L.markerClusterGroup(),
  Layer_SG_DQ3: L.markerClusterGroup(),
  Layer_SM_DQ3: L.markerClusterGroup(),
  Layer_RLG_DQ3: L.markerClusterGroup(),
  Layer_PG_DQ3: L.markerClusterGroup(),
  Layer_QD_DQ3: L.markerClusterGroup(),
  Layer_MR_DQ3: L.markerClusterGroup(),
  Layer_BWHHD_DQ3: L.markerClusterGroup(),
  Layer_LYHHR_DQ3: L.markerClusterGroup(),
  Layer_DQ3SJ_DQ3: L.markerClusterGroup(),
  Layer_FGS_DQ3: L.markerClusterGroup(),
  Layer_JH_DQ3: L.markerClusterGroup(),
  Layer_HDCB_DQ3: L.markerClusterGroup(),
  Layer_QW_DQ3: L.markerClusterGroup(),
  Layer_XYWB_DQ3: L.markerClusterGroup(),
  Layer_QQBY_DQ3: L.markerClusterGroup(),
  Layer_LiuShan_DQ3: L.markerClusterGroup(),
  Layer_YingShu_DQ3: L.markerClusterGroup(),
  Layer_YuJiaShu_DQ3: L.markerClusterGroup(),
  Layer_YuShanFeng_DQ3: L.markerClusterGroup(),
  Layer_SongShu_DQ3: L.markerClusterGroup(),
  Layer_ND_DQ3: L.markerClusterGroup(),
  Layer_SJQ_DQ3: L.markerClusterGroup(),
  Layer_YM_DQ3: L.markerClusterGroup(),
  Layer_MR_DQ: L.markerClusterGroup(),
  Layer_HZDBJ_DQ2: L.markerClusterGroup(),
  Layer_WQDCD_MD: L.markerClusterGroup(),
  Layer_WQDCD_LY: L.markerClusterGroup(),
  Layer_NPCShop_MD: L.markerClusterGroup(),
  Layer_NPCShop_LY: L.markerClusterGroup(),
  Layer_NPCShop_DQ: L.markerClusterGroup(),
  Layer_NPCShop_DQ2: L.markerClusterGroup(),
  Layer_NPCShop_DQ3: L.markerClusterGroup(),

  Layer_JW_YXG: L.markerClusterGroup(),
  Layer_BX_YXG: L.markerClusterGroup({
    maxClusterRadius: function (e) {
      let radius = 0
      if (e == -3) radius = 100
      else if (e == -2) radius = 80
      else if (e == -1) radius = 55
      else if (e == 0) radius = 25
      else if (e == 1) radius = 0
      //console.log(radius);
      return radius
    },
  }),
  Layer_QKBX_YXG: L.markerClusterGroup(),
  Layer_DLK_YXG: L.markerClusterGroup(),
  Layer_SJRW_YXG: L.markerClusterGroup(),
  Layer_TFWT_YXG: L.markerClusterGroup(),
  Layer_DWQ_YXG: L.markerClusterGroup(),
  Layer_ND_YXG: L.markerClusterGroup(),
  Layer_JWJZ_YXG: L.markerClusterGroup(),
  Layer_SSZPSP_YXG: L.markerClusterGroup(),
  Layer_TYCS_YXG: L.markerClusterGroup(),
  Layer_ShiP_YXG: L.markerClusterGroup(),
  Layer_SJ_YXG: L.markerClusterGroup(),
  Layer_TZ_YXG: L.markerClusterGroup(),
  Layer_JG_YXG: L.markerClusterGroup(),
  Layer_NPCShop_YXG: L.markerClusterGroup(),
  Layer_NPC_YXG: L.markerClusterGroup(),
  Layer_DYD_YXG: L.markerClusterGroup(),
  Layer_MLDCD1_YXG: L.markerClusterGroup(),
  Layer_YL_YXG: L.markerClusterGroup(),
  Layer_DBY_YXG: L.markerClusterGroup(),
  Layer_SYWD_YXG: L.markerClusterGroup(),
  Layer_MLDCD_YXG: L.markerClusterGroup(),
  Layer_WQDCD_YXG: L.markerClusterGroup(),
  Layer_XWZM_YXG: L.markerClusterGroup(),
  Layer_SX_YXG: L.markerClusterGroup(),
  Layer_CSD_YXG: L.markerClusterGroup(),
  Layer_LCMD_YXG: L.markerClusterGroup(),
  Layer_MJ_YXG: L.markerClusterGroup(),
  Layer_FB_YXG: L.markerClusterGroup(),
  Layer_RYLH_YXG: L.markerClusterGroup(),
  Layer_JHBSC_YXG: L.markerClusterGroup(),
  Layer_SJDJG_YXG: L.markerClusterGroup(),
  Layer_SHZZ_YXG: L.markerClusterGroup(),
  Layer_HLZ_YXG: L.markerClusterGroup(),
  Layer_YCX_YXG: L.markerClusterGroup(),
  Layer_SJK_YXG: L.markerClusterGroup(),
  Layer_BTK_YXG: L.markerClusterGroup(),
  Layer_TK_YXG: L.markerClusterGroup(),
  Layer_MJK_YXG: L.markerClusterGroup(),
  Layer_ZJK_YXG: L.markerClusterGroup(),
  Layer_KDCD_YXG: L.markerClusterGroup(),
  Layer_YFZ_YXG: L.markerClusterGroup(),
  Layer_HLG_YXG: L.markerClusterGroup(),
  Layer_DGSN_YXG: L.markerClusterGroup(),
  Layer_YJZJ_YXG: L.markerClusterGroup(),
  Layer_YJJB_YXG: L.markerClusterGroup(),
  Layer_DXQQR_YXG: L.markerClusterGroup(),
  Layer_SYFS_YXG: L.markerClusterGroup(),
  Layer_YSS_YXG: L.markerClusterGroup(),
  Layer_DBT_YXG: L.markerClusterGroup(),
  Layer_PPH_YXG: L.markerClusterGroup(),
  Layer_XQD_YXG: L.markerClusterGroup(),
  Layer_SLM_YXG: L.markerClusterGroup(),
  Layer_KFZH_YXG: L.markerClusterGroup(),
  Layer_QQR_YXG: L.markerClusterGroup(),
  Layer_QQRSS_YXG: L.markerClusterGroup(),
  Layer_QQSM_YXG: L.markerClusterGroup(),
  Layer_ZWCLR_YXG: L.markerClusterGroup(),
  Layer_PFL_YXG: L.markerClusterGroup(),
  Layer_SJQ_YXG: L.markerClusterGroup(),
  Layer_SHLX_YXG: L.markerClusterGroup(),
  Layer_HaiCao_YXG: L.markerClusterGroup(),
  Layer_JinGua_YXG: L.markerClusterGroup(),
  Layer_MR_YXG: L.markerClusterGroup(),
  Layer_SongR_YXG: L.markerClusterGroup(),
  Layer_PX_YXG: L.markerClusterGroup(),
  Layer_ShouR_YXG: L.markerClusterGroup(),
  Layer_QR_YXG: L.markerClusterGroup(),
  Layer_YR_YXG: L.markerClusterGroup(),
  Layer_QD_YXG: L.markerClusterGroup(),
  Layer_RLG_YXG: L.markerClusterGroup(),
  Layer_PG_YXG: L.markerClusterGroup(),
  Layer_JYC_YXG: L.markerClusterGroup(),
  Layer_BLB_YXG: L.markerClusterGroup(),
  Layer_HLB_YXG: L.markerClusterGroup(),
  Layer_SG_YXG: L.markerClusterGroup(),
  Layer_TTH_YXG: L.markerClusterGroup(),
  Layer_MG_YXG: L.markerClusterGroup(),
  Layer_BH_YXG: L.markerClusterGroup(),
  Layer_SM_YXG: L.markerClusterGroup(),
  Layer_SCDCD_YXG: L.markerClusterGroup(),
  Layer_JH_YXG: L.markerClusterGroup(),
  Layer_BWHHD_YXG: L.markerClusterGroup(),
  Layer_LYHHR_YXG: L.markerClusterGroup(),
  Layer_DQSJ_YXG: L.markerClusterGroup(),
  Layer_FGS_YXG: L.markerClusterGroup(),
  Layer_HDCB_YXG: L.markerClusterGroup(),
  Layer_QW_YXG: L.markerClusterGroup(),
  Layer_XYWB_YXG: L.markerClusterGroup(),
  Layer_QQBY_YXG: L.markerClusterGroup(),
  Layer_LiuShan_YXG: L.markerClusterGroup(),
  Layer_YingShu_YXG: L.markerClusterGroup(),
  Layer_YuJiaShu_YXG: L.markerClusterGroup(),
  Layer_YuShanFeng_YXG: L.markerClusterGroup(),
  Layer_SongShu_YXG: L.markerClusterGroup(),
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
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'TC': {
      //特产
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'KW': {
      //矿物
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'JYG': {
      //精英怪
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'PTG': {
      //普通怪
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
        },
      })
      return icon_base
    }
    case 'BX': {
      // 宝箱
      var icon_base = L.Icon.extend({
        options: {
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
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
          shadowUrl: 'https://assets.yuanshen.site/icons/loc_02_off.png',
          iconSize: [22, 22], // size of the icon
          shadowSize: [32, 36], // size of the shadow
          iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
          shadowAnchor: [16, 35], // the same for the shadow
          popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
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
      $('.myPopPicture').animate({
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
      $('.myPopPicture').animate({
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
  [LayerMap['Layer_SJRW_MD'], JS_SJRW_MD, 'ST', 'SJRW_MD'],
  [LayerMap['Layer_SJRW_LY'], JS_SJRW_LY, 'ST', 'SJRW_LY'],
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
  [LayerMap['Layer_TFWT_MD'], JS_TFWT_MD, 'ST', 'JS_TFWT_MD'],
  [LayerMap['Layer_TFWT_LY'], JS_TFWT_LY, 'ST', 'JS_TFWT_LY'],
  [LayerMap['Layer_ShiP_MD'], JS_ShiP_MD, 'TC', 'JS_ShiP_MD'],
  [LayerMap['Layer_ShiP_LY'], JS_ShiP_LY, 'TC', 'JS_ShiP_LY'],
  [LayerMap['Layer_YLX_LY'], JS_YLX_LY, 'PTG', 'JS_YLX_LY'],
  [LayerMap['Layer_TK_MD'], JS_TK_MD, 'KW', 'TK_MD'],
  [LayerMap['Layer_TK_LY'], JS_TK_LY, 'KW', 'TK_LY'],
  [LayerMap['Layer_TZ_MD'], JS_TZ_MD, 'TX', 'TZ_MD'],
  [LayerMap['Layer_TZ_LY'], JS_TZ_LY, 'TX', 'TZ_LY'],
  [LayerMap['Layer_MLDCD_MD'], JS_MLDCD_MD, 'TC', 'MLDCD_MD'],
  [LayerMap['Layer_MLDCD_LY'], JS_MLDCD_LY, 'TC', 'MLDCD_LY'],
  [LayerMap['Layer_CSD_QD'], JS_CSD_QD, 'CSD', 'CSD_QD'],
  [LayerMap['Layer_LCMD_QD'], JS_LCMD_QD, 'ST', 'LCMD_QD'],
  [LayerMap['Layer_BiHua_QD'], JS_BiHua_QD, 'TC', 'BiHua_QD'],
  [LayerMap['Layer_BX_QD'], JS_BX_QD, 'BX', 'BX_QD'],
  [LayerMap['Layer_HLZ_QD'], JS_HLZ_QD, 'TC', 'HLZ_QD'],
  [LayerMap['Layer_TK_QD'], JS_TK_QD, 'KW', 'TK_QD'],
  [LayerMap['Layer_BTK_QD'], JS_BTK_QD, 'KW', 'BTK_QD'],
  [LayerMap['Layer_SJK_QD'], JS_SJK_QD, 'KW', 'SJK_QD'],
  [LayerMap['Layer_MLDCD_QD'], JS_MLDCD_QD, 'TC', 'MLDCD_QD'],
  [LayerMap['Layer_QQR_QD'], JS_QQR_QD, 'TC', 'QQR_QD'],
  [LayerMap['Layer_QQRSS_QD'], JS_QQRSS_QD, 'TC', 'QQRSS_QD'],
  [LayerMap['Layer_QQSM_QD'], JS_QQSM_QD, 'TC', 'QQSM_QD'],
  [LayerMap['Layer_SYFS_QD'], JS_SYFS_QD, 'TC', 'SYFS_QD'],
  [LayerMap['Layer_DXQQR_QD'], JS_DXQQR_QD, 'TC', 'DXQQR_QD'],
  [LayerMap['Layer_SLM_QD'], JS_SLM_QD, 'TC', 'SLM_QD'],
  [LayerMap['Layer_PX_QD'], JS_PX_QD, 'TC', 'PX_QD'],
  [LayerMap['Layer_QR_QD'], JS_QR_QD, 'TC', 'QR_QD'],
  [LayerMap['Layer_YR_QD'], JS_YR_QD, 'TC', 'YR_QD'],
  [LayerMap['Layer_MG_QD'], JS_MG_QD, 'TC', 'MG_QD'],
  [LayerMap['Layer_TTH_QD'], JS_TTH_QD, 'TC', 'TTH_QD'],
  [LayerMap['Layer_BH_QD'], JS_BH_QD, 'TC', 'BH_QD'],
  [LayerMap['Layer_SM_QD'], JS_SM_QD, 'TC', 'SM_QD'],
  [LayerMap['Layer_QD_QD'], JS_QD_QD, 'TC', 'QD_QD'],
  [LayerMap['Layer_DQSJ_QD'], JS_DQSJ_QD, 'TC', 'DQSJ_QD'],
  [LayerMap['Layer_FGS_QD'], JS_FGS_QD, 'TC', 'FGS_QD'],
  [LayerMap['Layer_HDCB_QD'], JS_HDCB_QD, 'TC', 'HDCB_QD'],
  [LayerMap['Layer_QW_QD'], JS_QW_QD, 'TC', 'QW_QD'],
  [LayerMap['Layer_XYWB_QD'], JS_XYWB_QD, 'TC', 'XYWB_QD'],
  [LayerMap['Layer_SR_QD'], JS_SR_QD, 'TC', 'SR_QD'],
  [LayerMap['Layer_PGYZ_QD'], JS_PGYZ_QD, 'TC', 'PGYZ_QD'],
  [LayerMap['Layer_BLB_QD'], JS_BLB_QD, 'TC', 'BLB_QD'],
  [LayerMap['Layer_HLB_QD'], JS_HLB_QD, 'TC', 'HLB_QD'],
  [LayerMap['Layer_BWHHD_QD'], JS_BWHHD_QD, 'TC', 'BWHHD_QD'],
  [LayerMap['Layer_LYHHR_QD'], JS_LYHHR_QD, 'TC', 'LYHHR_QD'],
  [LayerMap['Layer_XL_QD'], JS_XL_QD, 'TC', 'XL_QD'],
  [LayerMap['Layer_PPH_QD'], JS_PPH_QD, 'TC', 'PPH_QD'],
  [LayerMap['Layer_CuiZhu_LY'], JS_CuiZhu_LY, 'TC', 'CuiZhu_LY'],
  [LayerMap['Layer_LenShan_MD'], JS_LenShan_MD, 'TC', 'LenShan_MD'],
  [LayerMap['Layer_LenShan_LY'], JS_LenShan_LY, 'TC', 'LenShan_LY'],
  [LayerMap['Layer_SongShu_MD'], JS_SongShu_MD, 'TC', 'SongShu_MD'],
  [LayerMap['Layer_SongShu_LY'], JS_SongShu_LY, 'TC', 'SongShu_LY'],
  [LayerMap['Layer_HuaShu_MD'], JS_HuaShu_MD, 'TC', 'HuaShu_MD'],
  [LayerMap['Layer_HuaShu_LY'], JS_HuaShu_LY, 'TC', 'HuaShu_LY'],
  [LayerMap['Layer_CangBo_MD'], JS_CangBo_MD, 'TC', 'CangBo_MD'],
  [LayerMap['Layer_CangBo_LY'], JS_CangBo_LY, 'TC', 'CangBo_LY'],
  [LayerMap['Layer_CuiHuaShu_MD'], JS_CuiHuaShu_MD, 'TC', 'CuiHuaShu_MD'],
  [LayerMap['Layer_CuiHuaShu_LY'], JS_CuiHuaShu_LY, 'TC', 'CuiHuaShu_LY'],
  [LayerMap['Layer_QueShaShu_LY'], JS_QueShaShu_LY, 'TC', 'QueShaShu_LY'],
  [LayerMap['Layer_HSHL_QD'], JS_HSHL_QD, 'TC', 'HSHL_QD'],
  [LayerMap['Layer_LST'], JS_LST, 'ST', 'LST'],
  [LayerMap['Layer_DLK_DQ'], JS_DLK_DQ, 'JYG', 'DLK_DQ'],
  [LayerMap['Layer_BX_DQ'], JS_BX_DQ, 'BX', 'BX_DQ'],
  [LayerMap['Layer_DWQ_DQ'], JS_DWQ_DQ, 'TC', 'DWQ_DQ'],
  [LayerMap['Layer_JG_DQ'], JS_JG_DQ, 'TC', 'JG_DQ'],
  [LayerMap['Layer_SJ_DQ'], JS_SJ_DQ, 'TC', 'SJ_DQ'],
  [LayerMap['Layer_SJRW_DQ'], JS_SJRW_DQ, 'FBMJ', 'SJRW_DQ'],
  [LayerMap['Layer_SYWD_DQ'], JS_SYWD_DQ, 'TC', 'SYWD_DQ'],
  [LayerMap['Layer_SX_DQ'], JS_SX_DQ, 'SX', 'SX_DQ'],
  [LayerMap['Layer_CSD_DQ'], JS_CSD_DQ, 'CSD', 'CSD_DQ'],
  [LayerMap['Layer_MJ_DQ'], JS_MJ_DQ, 'FBMJ', 'MJ_DQ'],
  [LayerMap['Layer_FB_DQ'], JS_FB_DQ, 'FBMJ', 'FB_DQ'],
  [LayerMap['Layer_TFWT_DQ'], JS_TFWT_DQ, 'FBMJ', 'TFWT_DQ'],
  [LayerMap['Layer_ShiP_DQ'], JS_ShiP_DQ, 'TC', 'ShiP_DQ'],
  [LayerMap['Layer_TZ_DQ'], JS_TZ_DQ, 'TC', 'TZ_DQ'],
  [LayerMap['Layer_MLDCD_DQ'], JS_MLDCD_DQ, 'TC', 'MLDCD_DQ'],
  [LayerMap['Layer_SBLM_DQ'], JS_SBLM_DQ, 'TC', 'SBLM_DQ'],
  [LayerMap['Layer_HaiDai_DQ'], JS_HaiDai_DQ, 'TC', 'HaiDai_DQ'],
  [LayerMap['Layer_HLZ_DQ'], JS_HLZ_DQ, 'TC', 'HLZ_DQ'],
  [LayerMap['Layer_SJK_DQ'], JS_SJK_DQ, 'KW', 'SJK_DQ'],
  [LayerMap['Layer_BTK_DQ'], JS_BTK_DQ, 'KW', 'BTK_DQ'],
  [LayerMap['Layer_TK_DQ'], JS_TK_DQ, 'KW', 'TK_DQ'],
  [LayerMap['Layer_MJK_DQ'], JS_MJK_DQ, 'KW', 'MJK_DQ'],
  [LayerMap['Layer_KDCD_DQ'], JS_KDCD_DQ, 'TC', 'KDCD_DQ'],
  [LayerMap['Layer_YJSW_DQ'], JS_YJSW_DQ, 'TC', 'YJSW_DQ'],
  [LayerMap['Layer_DXQQR_DQ'], JS_DXQQR_DQ, 'TC', 'DXQQR_DQ'],
  [LayerMap['Layer_SYFS_DQ'], JS_SYFS_DQ, 'TC', 'SYFS_DQ'],
  [LayerMap['Layer_LYSS_DQ'], JS_LYSS_DQ, 'TC', 'LYSS_DQ'],
  [LayerMap['Layer_DBT_DQ'], JS_DBT_DQ, 'TC', 'DBT_DQ'],
  [LayerMap['Layer_PPH_DQ'], JS_PPH_DQ, 'TC', 'PPH_DQ'],
  [LayerMap['Layer_XQD_DQ'], JS_XQD_DQ, 'TC', 'XQD_DQ'],
  [LayerMap['Layer_SLM_DQ'], JS_SLM_DQ, 'TC', 'SLM_DQ'],
  [LayerMap['Layer_KFZH_DQ'], JS_KFZH_DQ, 'TC', 'KFZH_DQ'],
  [LayerMap['Layer_QQR_DQ'], JS_QQR_DQ, 'TC', 'QQR_DQ'],
  [LayerMap['Layer_QQRSS_DQ'], JS_QQRSS_DQ, 'TC', 'QQRSS_DQ'],
  [LayerMap['Layer_QQSM_DQ'], JS_QQSM_DQ, 'TC', 'QQSM_DQ'],
  [LayerMap['Layer_ZWCLR_DQ'], JS_ZWCLR_DQ, 'TC', 'ZWCLR_DQ'],
  [LayerMap['Layer_JinGua_DQ'], JS_JinGua_DQ, 'TC', 'JinGua_DQ'],
  [LayerMap['Layer_SongR_DQ'], JS_SongR_DQ, 'TC', 'SongR_DQ'],
  [LayerMap['Layer_PX_DQ'], JS_PX_DQ, 'TC', 'PX_DQ'],
  [LayerMap['Layer_ShouR_DQ'], JS_ShouR_DQ, 'TC', 'ShouR_DQ'],
  [LayerMap['Layer_QR_DQ'], JS_QR_DQ, 'TC', 'QR_DQ'],
  [LayerMap['Layer_YR_DQ'], JS_YR_DQ, 'TC', 'YR_DQ'],
  [LayerMap['Layer_BLB_DQ'], JS_BLB_DQ, 'TC', 'BLB_DQ'],
  [LayerMap['Layer_HLB_DQ'], JS_HLB_DQ, 'TC', 'HLB_DQ'],
  [LayerMap['Layer_MG_DQ'], JS_MG_DQ, 'TC', 'MG_DQ'],
  [LayerMap['Layer_TTH_DQ'], JS_TTH_DQ, 'TC', 'TTH_DQ'],
  [LayerMap['Layer_JYC_DQ'], JS_JYC_DQ, 'TC', 'JYC_DQ'],
  [LayerMap['Layer_BH_DQ'], JS_BH_DQ, 'TC', 'BH_DQ'],
  [LayerMap['Layer_SG_DQ'], JS_SG_DQ, 'TC', 'SG_DQ'],
  [LayerMap['Layer_SM_DQ'], JS_SM_DQ, 'TC', 'SM_DQ'],
  [LayerMap['Layer_RLG_DQ'], JS_RLG_DQ, 'TC', 'RLG_DQ'],
  [LayerMap['Layer_PG_DQ'], JS_PG_DQ, 'TC', 'PG_DQ'],
  [LayerMap['Layer_LDR_DQ'], JS_LDR_DQ, 'TC', 'LDR_DQ'],
  [LayerMap['Layer_QD_DQ'], JS_QD_DQ, 'TC', 'QD_DQ'],
  [LayerMap['Layer_BWHHD_DQ'], JS_BWHHD_DQ, 'TC', 'BWHHD_DQ'],
  [LayerMap['Layer_LYHHR_DQ'], JS_LYHHR_DQ, 'TC', 'LYHHR_DQ'],
  [LayerMap['Layer_DQSJ_DQ'], JS_DQSJ_DQ, 'TC', 'DQSJ_DQ'],
  [LayerMap['Layer_FGS_DQ'], JS_FGS_DQ, 'TC', 'FGS_DQ'],
  [LayerMap['Layer_JH_DQ'], JS_JH_DQ, 'TC', 'JH_DQ'],
  [LayerMap['Layer_HDCB_DQ'], JS_HDCB_DQ, 'TC', 'HDCB_DQ'],
  [LayerMap['Layer_QW_DQ'], JS_QW_DQ, 'TC', 'QW_DQ'],
  [LayerMap['Layer_XYWB_DQ'], JS_XYWB_DQ, 'TC', 'XYWB_DQ'],
  [LayerMap['Layer_LenShan_DQ'], JS_LenShan_DQ, 'TC', 'LenShan_DQ'],
  [LayerMap['Layer_SongShu_DQ'], JS_SongShu_DQ, 'TC', 'SongShu_DQ'],
  [LayerMap['Layer_HuaShu_DQ'], JS_HuaShu_DQ, 'TC', 'HuaShu_DQ'],
  [LayerMap['Layer_CangBo_DQ'], JS_CangBo_DQ, 'TC', 'CangBo_DQ'],
  [LayerMap['Layer_CuiHuaShu_DQ'], JS_CuiHuaShu_DQ, 'TC', 'CuiHuaShu_DQ'],
  [LayerMap['Layer_FYXQ_DQ'], JS_FYXQ_DQ, 'TC', 'FYXQ_DQ'],
  [LayerMap['Layer_DDC_DQ'], JS_DDC_DQ, 'TC', 'DDC_DQ'],
  [LayerMap['Layer_JHGS_DQ'], JS_JHGS_DQ, 'TC', 'JHGS_DQ'],
  [LayerMap['Layer_MingCao_DQ'], JS_MingCao_DQ, 'TC', 'MingCao_DQ'],
  [LayerMap['Layer_XH_DQ'], JS_XH_DQ, 'TC', 'XH_DQ'],
  [LayerMap['Layer_ZJK_DQ'], JS_ZJK_DQ, 'KW', 'ZJK_DQ'],
  [LayerMap['Layer_HSHL_QD1'], JS_HSHL_QD1, 'TC', 'HSHL_QD1'],
  [LayerMap['Layer_BX_QD1'], JS_BX_QD1, 'BX', 'BX_QD1'],
  [LayerMap['Layer_LCMD_QD1'], JS_LCMD_QD1, 'ST', 'LCMD_QD1'],
  [LayerMap['Layer_CSD_QD1'], JS_CSD_QD1, 'CSD', 'CSD_QD1'],
  [LayerMap['Layer_MLDCD_QD1'], JS_MLDCD_QD1, 'TC', 'MLDCD_QD1'],
  [LayerMap['Layer_BTTZ_QD'], JS_BTTZ_QD, 'TC', 'BTTZ_QD'],
  [LayerMap['Layer_SJRW_QD'], JS_SJRW_QD, 'FBMJ', 'SJRW_QD'],
  [LayerMap['Layer_BTTZ_QD1'], JS_BTTZ_QD1, 'TC', 'BTTZ_QD1'],
  [LayerMap['Layer_YJJB_DQ'], JS_YJJB_DQ, 'TC', 'YJJB_DQ'],
  [LayerMap['Layer_YFZ_DQ'], JS_YFZ_DQ, 'PTG', 'YFZ_DQ'],
  [LayerMap['Layer_DGSN_DQ'], JS_DGSN_DQ, 'PTG', 'DGSN_DQ'],
  [LayerMap['Layer_WQDCD_DQ'], JS_WQDCD_DQ, 'TC', 'WQDCD_DQ'],
  [LayerMap['Layer_QQBY_DQ'], JS_QQBY_DQ, 'TC', 'QQBY_DQ'],
  [LayerMap['Layer_LCMD_DQ'], JS_LCMD_DQ, 'ST', 'LCMD_DQ'],
  [LayerMap['Layer_NPC_DQ'], JS_NPC_DQ, 'TC', 'NPC_DQ'],
  [LayerMap['Layer_NPC_MD'], JS_NPC_MD, 'TC', 'NPC_MD'],
  [LayerMap['Layer_NPC_LY'], JS_NPC_LY, 'TC', 'NPC_LY'],
  [LayerMap['Layer_SongShu2_DQ'], JS_SongShu2_DQ, 'TC', 'SongShu2_DQ'],

  [LayerMap['Layer_LST2'], JS_LST2, 'ST', 'LST2'],
  [LayerMap['Layer_DLK_DQ2'], JS_DLK_DQ2, 'JYG', 'DLK_DQ2'],
  [LayerMap['Layer_BX_DQ2'], JS_BX_DQ2, 'BX', 'BX_DQ2'],
  [LayerMap['Layer_DWQ_DQ2'], JS_DWQ_DQ2, 'TC', 'DWQ_DQ2'],
  [LayerMap['Layer_JG_DQ2'], JS_JG_DQ2, 'TC', 'JG_DQ2'],
  [LayerMap['Layer_SJ_DQ2'], JS_SJ_DQ2, 'TC', 'SJ_DQ2'],
  [LayerMap['Layer_SJRW_DQ2'], JS_SJRW_DQ2, 'FBMJ', 'SJRW_DQ2'],
  [LayerMap['Layer_SYWD_DQ2'], JS_SYWD_DQ2, 'TC', 'SYWD_DQ2'],
  [LayerMap['Layer_SX_DQ2'], JS_SX_DQ2, 'SX', 'SX_DQ2'],
  [LayerMap['Layer_CSD_DQ2'], JS_CSD_DQ2, 'CSD', 'CSD_DQ2'],
  [LayerMap['Layer_MJ_DQ2'], JS_MJ_DQ2, 'FBMJ', 'MJ_DQ2'],
  [LayerMap['Layer_FB_DQ2'], JS_FB_DQ2, 'FBMJ', 'FB_DQ2'],
  [LayerMap['Layer_TFWT_DQ2'], JS_TFWT_DQ2, 'FBMJ', 'TFWT_DQ2'],
  [LayerMap['Layer_ShiP_DQ2'], JS_ShiP_DQ2, 'TC', 'ShiP_DQ2'],
  [LayerMap['Layer_TZ_DQ2'], JS_TZ_DQ2, 'TC', 'TZ_DQ2'],
  [LayerMap['Layer_MLDCD_DQ2'], JS_MLDCD_DQ2, 'TC', 'MLDCD_DQ2'],
  [LayerMap['Layer_SBLM_DQ2'], JS_SBLM_DQ2, 'TC', 'SBLM_DQ2'],
  [LayerMap['Layer_HaiDai_DQ2'], JS_HaiDai_DQ2, 'TC', 'HaiDai_DQ2'],
  [LayerMap['Layer_HLZ_DQ2'], JS_HLZ_DQ2, 'TC', 'HLZ_DQ2'],
  [LayerMap['Layer_SJK_DQ2'], JS_SJK_DQ2, 'KW', 'SJK_DQ2'],
  [LayerMap['Layer_BTK_DQ2'], JS_BTK_DQ2, 'KW', 'BTK_DQ2'],
  [LayerMap['Layer_TK_DQ2'], JS_TK_DQ2, 'KW', 'TK_DQ2'],
  [LayerMap['Layer_MJK_DQ2'], JS_MJK_DQ2, 'KW', 'MJK_DQ2'],
  [LayerMap['Layer_KDCD_DQ2'], JS_KDCD_DQ2, 'TC', 'KDCD_DQ2'],
  [LayerMap['Layer_YJSW_DQ2'], JS_YJSW_DQ2, 'TC', 'YJSW_DQ2'],
  [LayerMap['Layer_DXQQR_DQ2'], JS_DXQQR_DQ2, 'TC', 'DXQQR_DQ2'],
  [LayerMap['Layer_SYFS_DQ2'], JS_SYFS_DQ2, 'TC', 'SYFS_DQ2'],
  [LayerMap['Layer_LYSS_DQ2'], JS_LYSS_DQ2, 'TC', 'LYSS_DQ2'],
  [LayerMap['Layer_DBT_DQ2'], JS_DBT_DQ2, 'TC', 'DBT_DQ2'],
  [LayerMap['Layer_PPH_DQ2'], JS_PPH_DQ2, 'TC', 'PPH_DQ2'],
  [LayerMap['Layer_XQD_DQ2'], JS_XQD_DQ2, 'TC', 'XQD_DQ2'],
  [LayerMap['Layer_SLM_DQ2'], JS_SLM_DQ2, 'TC', 'SLM_DQ2'],
  [LayerMap['Layer_KFZH_DQ2'], JS_KFZH_DQ2, 'TC', 'KFZH_DQ2'],
  [LayerMap['Layer_QQR_DQ2'], JS_QQR_DQ2, 'TC', 'QQR_DQ2'],
  [LayerMap['Layer_QQRSS_DQ2'], JS_QQRSS_DQ2, 'TC', 'QQRSS_DQ2'],
  [LayerMap['Layer_QQSM_DQ2'], JS_QQSM_DQ2, 'TC', 'QQSM_DQ2'],
  [LayerMap['Layer_ZWCLR_DQ2'], JS_ZWCLR_DQ2, 'TC', 'ZWCLR_DQ2'],
  [LayerMap['Layer_JinGua_DQ2'], JS_JinGua_DQ2, 'TC', 'JinGua_DQ2'],
  [LayerMap['Layer_SongR_DQ2'], JS_SongR_DQ2, 'TC', 'SongR_DQ2'],
  [LayerMap['Layer_PX_DQ2'], JS_PX_DQ2, 'TC', 'PX_DQ2'],
  [LayerMap['Layer_ShouR_DQ2'], JS_ShouR_DQ2, 'TC', 'ShouR_DQ2'],
  [LayerMap['Layer_QR_DQ2'], JS_QR_DQ2, 'TC', 'QR_DQ2'],
  [LayerMap['Layer_YR_DQ2'], JS_YR_DQ2, 'TC', 'YR_DQ2'],
  [LayerMap['Layer_BLB_DQ2'], JS_BLB_DQ2, 'TC', 'BLB_DQ2'],
  [LayerMap['Layer_HLB_DQ2'], JS_HLB_DQ2, 'TC', 'HLB_DQ2'],
  [LayerMap['Layer_MG_DQ2'], JS_MG_DQ2, 'TC', 'MG_DQ2'],
  [LayerMap['Layer_TTH_DQ2'], JS_TTH_DQ2, 'TC', 'TTH_DQ2'],
  [LayerMap['Layer_JYC_DQ2'], JS_JYC_DQ2, 'TC', 'JYC_DQ2'],
  [LayerMap['Layer_BH_DQ2'], JS_BH_DQ2, 'TC', 'BH_DQ2'],
  [LayerMap['Layer_SG_DQ2'], JS_SG_DQ2, 'TC', 'SG_DQ2'],
  [LayerMap['Layer_SM_DQ2'], JS_SM_DQ2, 'TC', 'SM_DQ2'],
  [LayerMap['Layer_RLG_DQ2'], JS_RLG_DQ2, 'TC', 'RLG_DQ2'],
  [LayerMap['Layer_PG_DQ2'], JS_PG_DQ2, 'TC', 'PG_DQ2'],
  [LayerMap['Layer_LDR_DQ2'], JS_LDR_DQ2, 'TC', 'LDR_DQ2'],
  [LayerMap['Layer_QD_DQ2'], JS_QD_DQ2, 'TC', 'QD_DQ2'],
  [LayerMap['Layer_BWHHD_DQ2'], JS_BWHHD_DQ2, 'TC', 'BWHHD_DQ2'],
  [LayerMap['Layer_LYHHR_DQ2'], JS_LYHHR_DQ2, 'TC', 'LYHHR_DQ2'],
  [LayerMap['Layer_DQ2SJ_DQ2'], JS_DQ2SJ_DQ2, 'TC', 'DQ2SJ_DQ2'],
  [LayerMap['Layer_FGS_DQ2'], JS_FGS_DQ2, 'TC', 'FGS_DQ2'],
  [LayerMap['Layer_JH_DQ2'], JS_JH_DQ2, 'TC', 'JH_DQ2'],
  [LayerMap['Layer_HDCB_DQ2'], JS_HDCB_DQ2, 'TC', 'HDCB_DQ2'],
  [LayerMap['Layer_QW_DQ2'], JS_QW_DQ2, 'TC', 'QW_DQ2'],
  [LayerMap['Layer_XYWB_DQ2'], JS_XYWB_DQ2, 'TC', 'XYWB_DQ2'],
  [LayerMap['Layer_LiuShan_DQ2'], JS_LiuShan_DQ2, 'TC', 'LiuShan_DQ2'],
  [LayerMap['Layer_YingShu_DQ2'], JS_YingShu_DQ2, 'TC', 'YingShu_DQ2'],
  [LayerMap['Layer_HLG_DQ2'], JS_HLG_DQ2, 'TC', 'HLG_DQ2'],
  [LayerMap['Layer_YuJiaShu_DQ2'], JS_YuJiaShu_DQ2, 'TC', 'YuJiaShu_DQ2'],
  [LayerMap['Layer_YuShanFeng_DQ2'], JS_YuShanFeng_DQ2, 'TC', 'YuShanFeng_DQ2'],
  [LayerMap['Layer_FYXQ_DQ2'], JS_FYXQ_DQ2, 'TC', 'FYXQ_DQ2'],
  [LayerMap['Layer_DDC_DQ2'], JS_DDC_DQ2, 'TC', 'DDC_DQ2'],
  [LayerMap['Layer_JHGS_DQ2'], JS_JHGS_DQ2, 'TC', 'JHGS_DQ2'],
  [LayerMap['Layer_MingCao_DQ2'], JS_MingCao_DQ2, 'TC', 'MingCao_DQ2'],
  [LayerMap['Layer_XH_DQ2'], JS_XH_DQ2, 'TC', 'XH_DQ2'],
  [LayerMap['Layer_ZJK_DQ2'], JS_ZJK_DQ2, 'KW', 'ZJK_DQ2'],
  [LayerMap['Layer_YJJB_DQ2'], JS_YJJB_DQ2, 'TC', 'YJJB_DQ2'],
  [LayerMap['Layer_YFZ_DQ2'], JS_YFZ_DQ2, 'TC', 'YFZ_DQ2'],
  [LayerMap['Layer_DGSN_DQ2'], JS_DGSN_DQ2, 'TC', 'DGSN_DQ2'],
  [LayerMap['Layer_WQDCD_DQ2'], JS_WQDCD_DQ2, 'TC', 'WQDCD_DQ2'],
  [LayerMap['Layer_QQBY_DQ2'], JS_QQBY_DQ2, 'TC', 'QQBY_DQ2'],
  [LayerMap['Layer_LCMD_DQ2'], JS_LCMD_DQ2, 'ST', 'LCMD_DQ2'],
  [LayerMap['Layer_NPC_DQ2'], JS_NPC_DQ2, 'TC', 'NPC_DQ2'],
  [LayerMap['Layer_SongShu_DQ2'], JS_SongShu_DQ2, 'TC', 'SongShu_DQ2'],
  [LayerMap['Layer_DYD_DQ2'], JS_DYD_DQ2, 'TC', 'DYD_DQ2'],
  [LayerMap['Layer_XWZM_DQ2'], JS_XWZM_DQ2, 'TC', 'XWZM_DQ2'],
  [LayerMap['Layer_DBY_DQ'], JS_DBY_DQ, 'TC', 'DBY_DQ'],
  [LayerMap['Layer_DBY_DQ2'], JS_DBY_DQ2, 'TC', 'DBY_DQ2'],
  [LayerMap['Layer_TYCS_DQ2'], JS_TYCS_DQ2, 'TC', 'TYCS_DQ2'],
  [LayerMap['Layer_SHZZ_DQ2'], JS_SHZZ_DQ2, 'TC', 'SHZZ_DQ2'],
  [LayerMap['Layer_SXLYH_DQ2'], JS_SXLYH_DQ2, 'TC', 'SXLYH_DQ2'],
  [LayerMap['Layer_DDL_DQ2'], JS_DDL_DQ2, 'TC', 'DDL_DQ2'],
  [LayerMap['Layer_QX_DQ2'], JS_QX_DQ2, 'TC', 'QX_DQ2'],
  [LayerMap['Layer_DYD_MD'], JS_DYD_MD, 'TC', 'DYD_MD'],
  [LayerMap['Layer_DYD_LY'], JS_DYD_LY, 'TC', 'DYD_LY'],
  [LayerMap['Layer_ZYF_MD'], JS_ZYF_MD, 'TC', 'ZYF_MD'],
  [LayerMap['Layer_ZYF_LY'], JS_ZYF_LY, 'TC', 'ZYF_LY'],
  [LayerMap['Layer_XYBX_MD'], JS_XYBX_MD, 'TC', 'XYBX_MD'],
  [LayerMap['Layer_XYBX_LY'], JS_XYBX_LY, 'TC', 'XYBX_LY'],
  [LayerMap['Layer_DYD_DQ'], JS_DYD_DQ, 'TC', 'DYD_DQ'],
  [LayerMap['Layer_MR_DQ2'], JS_MR_DQ2, 'TC', 'MR_DQ2'],
  [LayerMap['Layer_PFL_DQ2'], JS_PFL_DQ2, 'TC', 'PFL_DQ2'],
  [LayerMap['Layer_BaoXia_DQ'], JS_BaoXia_DQ, 'TC', 'BaoXia_DQ'],
  [LayerMap['Layer_BaoXia_MD'], JS_BaoXia_MD, 'TC', 'BaoXia_MD'],
  [LayerMap['Layer_ShiBei_DQ'], JS_ShiBei_DQ, 'TC', 'ShiBei_DQ'],
  [LayerMap['Layer_ShiBei_MD'], JS_ShiBei_MD, 'TC', 'ShiBei_MD'],
  [LayerMap['Layer_QYDYC_MD'], JS_QYDYC_MD, 'TC', 'QYDYC_MD'],
  [LayerMap['Layer_PLP_MD'], JS_PLP_MD, 'TC', 'PLP_MD'],
  [LayerMap['Layer_DXZW_MD'], JS_DXZW_MD, 'JYG', 'DXZW_MD'],
  [LayerMap['Layer_MLDCD1_DQ'], JS_MLDCD1_DQ, 'TC', 'MLDCD1_DQ'],
  [LayerMap['Layer_MLDCD1_DQ2'], JS_MLDCD1_DQ2, 'TC', 'MLDCD1_DQ2'],
  [LayerMap['Layer_SK_DQ'], JS_SK_DQ, 'TC', 'SK_DQ'],

  [LayerMap['Layer_SCDCD_MD'], JS_SCDCD_MD, 'TC', 'SCDCD_MD'],
  [LayerMap['Layer_SCDCD_LY'], JS_SCDCD_LY, 'TC', 'SCDCD_LY'],
  [LayerMap['Layer_SCDCD_DQ'], JS_SCDCD_DQ, 'TC', 'SCDCD_DQ'],
  [LayerMap['Layer_SCDCD_DQ2'], JS_SCDCD_DQ2, 'TC', 'SCDCD_DQ2'],
  [LayerMap['Layer_LST3'], JS_LST3, 'ST', 'LST3'],
  [LayerMap['Layer_DLK_DQ3'], JS_DLK_DQ3, 'JYG', 'DLK_DQ3'],
  [LayerMap['Layer_BX_DQ3'], JS_BX_DQ3, 'BX', 'BX_DQ3'],
  [LayerMap['Layer_DWQ_DQ3'], JS_DWQ_DQ3, 'TC', 'DWQ_DQ3'],
  [LayerMap['Layer_JG_DQ3'], JS_JG_DQ3, 'TC', 'JG_DQ3'],
  [LayerMap['Layer_SJ_DQ3'], JS_SJ_DQ3, 'TC', 'SJ_DQ3'],
  [LayerMap['Layer_SJRW_DQ3'], JS_SJRW_DQ3, 'FBMJ', 'SJRW_DQ3'],
  [LayerMap['Layer_SYWD_DQ3'], JS_SYWD_DQ3, 'TC', 'SYWD_DQ3'],
  [LayerMap['Layer_SX_DQ3'], JS_SX_DQ3, 'SX', 'SX_DQ3'],
  [LayerMap['Layer_CSD_DQ3'], JS_CSD_DQ3, 'CSD', 'CSD_DQ3'],
  [LayerMap['Layer_LCMD_DQ3'], JS_LCMD_DQ3, 'ST', 'LCMD_DQ3'],
  [LayerMap['Layer_MJ_DQ3'], JS_MJ_DQ3, 'FBMJ', 'MJ_DQ3'],
  [LayerMap['Layer_FB_DQ3'], JS_FB_DQ3, 'FBMJ', 'FB_DQ3'],
  [LayerMap['Layer_TFWT_DQ3'], JS_TFWT_DQ3, 'FBMJ', 'TFWT_DQ3'],
  [LayerMap['Layer_ShiP_DQ3'], JS_ShiP_DQ3, 'TC', 'ShiP_DQ3'],
  [LayerMap['Layer_TZ_DQ3'], JS_TZ_DQ3, 'TC', 'TZ_DQ3'],
  [LayerMap['Layer_MLDCD_DQ3'], JS_MLDCD_DQ3, 'TC', 'MLDCD_DQ3'],
  [LayerMap['Layer_MLDCD1_DQ3'], JS_MLDCD1_DQ3, 'TC', 'MLDCD1_DQ3'],
  [LayerMap['Layer_SBLM_DQ3'], JS_SBLM_DQ3, 'TC', 'SBLM_DQ3'],
  [LayerMap['Layer_WQDCD_DQ3'], JS_WQDCD_DQ3, 'TC', 'WQDCD_DQ3'],
  [LayerMap['Layer_NPC_DQ3'], JS_NPC_DQ3, 'TC', 'NPC_DQ3'],
  [LayerMap['Layer_DBY_DQ3'], JS_DBY_DQ3, 'TC', 'DBY_DQ3'],
  [LayerMap['Layer_DYD_DQ3'], JS_DYD_DQ3, 'TC', 'DYD_DQ3'],
  [LayerMap['Layer_XWZM_DQ3'], JS_XWZM_DQ3, 'TC', 'XWZM_DQ3'],
  [LayerMap['Layer_HLZ_DQ3'], JS_HLZ_DQ3, 'TC', 'HLZ_DQ3'],
  [LayerMap['Layer_FYXQ_DQ3'], JS_FYXQ_DQ3, 'TC', 'FYXQ_DQ3'],
  [LayerMap['Layer_DDC_DQ3'], JS_DDC_DQ3, 'TC', 'DDC_DQ3'],
  [LayerMap['Layer_JHGS_DQ3'], JS_JHGS_DQ3, 'TC', 'JHGS_DQ3'],
  [LayerMap['Layer_MingCao_DQ3'], JS_MingCao_DQ3, 'TC', 'MingCao_DQ3'],
  [LayerMap['Layer_XH_DQ3'], JS_XH_DQ3, 'TC', 'XH_DQ3'],
  [LayerMap['Layer_TYCS_DQ3'], JS_TYCS_DQ3, 'TC', 'TYCS_DQ3'],
  [LayerMap['Layer_SHZZ_DQ3'], JS_SHZZ_DQ3, 'TC', 'SHZZ_DQ3'],
  [LayerMap['Layer_YCX_DQ3'], JS_YCX_DQ3, 'TC', 'YCX_DQ3'],
  [LayerMap['Layer_SJK_DQ3'], JS_SJK_DQ3, 'KW', 'SJK_DQ3'],
  [LayerMap['Layer_BTK_DQ3'], JS_BTK_DQ3, 'KW', 'BTK_DQ3'],
  [LayerMap['Layer_TK_DQ3'], JS_TK_DQ3, 'KW', 'TK_DQ3'],
  [LayerMap['Layer_MJK_DQ3'], JS_MJK_DQ3, 'KW', 'MJK_DQ3'],
  [LayerMap['Layer_ZJK_DQ3'], JS_ZJK_DQ3, 'KW', 'ZJK_DQ3'],
  [LayerMap['Layer_KDCD_DQ3'], JS_KDCD_DQ3, 'TC', 'KDCD_DQ3'],
  [LayerMap['Layer_YFZ_DQ3'], JS_YFZ_DQ3, 'TC', 'YFZ_DQ3'],
  [LayerMap['Layer_HLG_DQ3'], JS_HLG_DQ3, 'TC', 'HLG_DQ3'],
  [LayerMap['Layer_DGSN_DQ3'], JS_DGSN_DQ3, 'TC', 'DGSN_DQ3'],
  [LayerMap['Layer_YJSW_DQ3'], JS_YJSW_DQ3, 'TC', 'YJSW_DQ3'],
  [LayerMap['Layer_YJJB_DQ3'], JS_YJJB_DQ3, 'TC', 'YJJB_DQ3'],
  [LayerMap['Layer_DXQQR_DQ3'], JS_DXQQR_DQ3, 'TC', 'DXQQR_DQ3'],
  [LayerMap['Layer_SYFS_DQ3'], JS_SYFS_DQ3, 'TC', 'SYFS_DQ3'],
  [LayerMap['Layer_LYSS_DQ3'], JS_LYSS_DQ3, 'TC', 'LYSS_DQ3'],
  [LayerMap['Layer_DBT_DQ3'], JS_DBT_DQ3, 'TC', 'DBT_DQ3'],
  [LayerMap['Layer_PPH_DQ3'], JS_PPH_DQ3, 'TC', 'PPH_DQ3'],
  [LayerMap['Layer_XQD_DQ3'], JS_XQD_DQ3, 'TC', 'XQD_DQ3'],
  [LayerMap['Layer_SLM_DQ3'], JS_SLM_DQ3, 'TC', 'SLM_DQ3'],
  [LayerMap['Layer_KFZH_DQ3'], JS_KFZH_DQ3, 'TC', 'KFZH_DQ3'],
  [LayerMap['Layer_QQR_DQ3'], JS_QQR_DQ3, 'TC', 'QQR_DQ3'],
  [LayerMap['Layer_QQRSS_DQ3'], JS_QQRSS_DQ3, 'TC', 'QQRSS_DQ3'],
  [LayerMap['Layer_QQSM_DQ3'], JS_QQSM_DQ3, 'TC', 'QQSM_DQ3'],
  [LayerMap['Layer_ZWCLR_DQ3'], JS_ZWCLR_DQ3, 'TC', 'ZWCLR_DQ3'],
  [LayerMap['Layer_PFL_DQ3'], JS_PFL_DQ3, 'TC', 'PFL_DQ3'],
  [LayerMap['Layer_SCDCD_DQ3'], JS_SCDCD_DQ3, 'TC', 'SCDCD_DQ3'],
  [LayerMap['Layer_HaiDai_DQ3'], JS_HaiDai_DQ3, 'TC', 'HaiDai_DQ3'],
  [LayerMap['Layer_JinGua_DQ3'], JS_JinGua_DQ3, 'TC', 'JinGua_DQ3'],
  [LayerMap['Layer_SongR_DQ3'], JS_SongR_DQ3, 'TC', 'SongR_DQ3'],
  [LayerMap['Layer_PX_DQ3'], JS_PX_DQ3, 'TC', 'PX_DQ3'],
  [LayerMap['Layer_ShouR_DQ3'], JS_ShouR_DQ3, 'TC', 'ShouR_DQ3'],
  [LayerMap['Layer_QR_DQ3'], JS_QR_DQ3, 'TC', 'QR_DQ3'],
  [LayerMap['Layer_YR_DQ3'], JS_YR_DQ3, 'TC', 'YR_DQ3'],
  [LayerMap['Layer_BLB_DQ3'], JS_BLB_DQ3, 'TC', 'BLB_DQ3'],
  [LayerMap['Layer_HLB_DQ3'], JS_HLB_DQ3, 'TC', 'HLB_DQ3'],
  [LayerMap['Layer_MG_DQ3'], JS_MG_DQ3, 'TC', 'MG_DQ3'],
  [LayerMap['Layer_TTH_DQ3'], JS_TTH_DQ3, 'TC', 'TTH_DQ3'],
  [LayerMap['Layer_JYC_DQ3'], JS_JYC_DQ3, 'TC', 'JYC_DQ3'],
  [LayerMap['Layer_BH_DQ3'], JS_BH_DQ3, 'TC', 'BH_DQ3'],
  [LayerMap['Layer_SG_DQ3'], JS_SG_DQ3, 'TC', 'SG_DQ3'],
  [LayerMap['Layer_SM_DQ3'], JS_SM_DQ3, 'TC', 'SM_DQ3'],
  [LayerMap['Layer_RLG_DQ3'], JS_RLG_DQ3, 'TC', 'RLG_DQ3'],
  [LayerMap['Layer_PG_DQ3'], JS_PG_DQ3, 'TC', 'PG_DQ3'],
  [LayerMap['Layer_QD_DQ3'], JS_QD_DQ3, 'TC', 'QD_DQ3'],
  [LayerMap['Layer_MR_DQ3'], JS_MR_DQ3, 'TC', 'MR_DQ3'],
  [LayerMap['Layer_BWHHD_DQ3'], JS_BWHHD_DQ3, 'TC', 'BWHHD_DQ3'],
  [LayerMap['Layer_LYHHR_DQ3'], JS_LYHHR_DQ3, 'TC', 'LYHHR_DQ3'],
  [LayerMap['Layer_DQ3SJ_DQ3'], JS_DQ3SJ_DQ3, 'TC', 'DQ3SJ_DQ3'],
  [LayerMap['Layer_FGS_DQ3'], JS_FGS_DQ3, 'TC', 'FGS_DQ3'],
  [LayerMap['Layer_JH_DQ3'], JS_JH_DQ3, 'TC', 'JH_DQ3'],
  [LayerMap['Layer_HDCB_DQ3'], JS_HDCB_DQ3, 'TC', 'HDCB_DQ3'],
  [LayerMap['Layer_QW_DQ3'], JS_QW_DQ3, 'TC', 'QW_DQ3'],
  [LayerMap['Layer_XYWB_DQ3'], JS_XYWB_DQ3, 'TC', 'XYWB_DQ3'],
  [LayerMap['Layer_QQBY_DQ3'], JS_QQBY_DQ3, 'TC', 'QQBY_DQ3'],
  [LayerMap['Layer_LiuShan_DQ3'], JS_LiuShan_DQ3, 'TC', 'LiuShan_DQ3'],
  [LayerMap['Layer_YingShu_DQ3'], JS_YingShu_DQ3, 'TC', 'YingShu_DQ3'],
  [LayerMap['Layer_YuJiaShu_DQ3'], JS_YuJiaShu_DQ3, 'TC', 'YuJiaShu_DQ3'],
  [LayerMap['Layer_YuShanFeng_DQ3'], JS_YuShanFeng_DQ3, 'TC', 'YuShanFeng_DQ3'],
  [LayerMap['Layer_SongShu_DQ3'], JS_SongShu_DQ3, 'TC', 'SongShu_DQ3'],
  [LayerMap['Layer_ND_DQ3'], JS_ND_DQ3, 'TC', 'ND_DQ3'],
  [LayerMap['Layer_SJQ_DQ3'], JS_SJQ_DQ3, 'TC', 'SJQ_DQ3'],
  [LayerMap['Layer_YM_DQ3'], JS_YM_DQ3, 'TC', 'YM_DQ3'],
  [LayerMap['Layer_MR_DQ'], JS_MR_DQ, 'TC', 'MR_DQ'],
  [LayerMap['Layer_HZDBJ_DQ2'], JS_HZDBJ_DQ2, 'TC', 'HZDBJ_DQ2'],
  [LayerMap['Layer_WQDCD_MD'], JS_WQDCD_MD, 'TC', 'WQDCD_MD'],
  [LayerMap['Layer_WQDCD_LY'], JS_WQDCD_LY, 'TC', 'WQDCD_LY'],
  [LayerMap['Layer_NPCShop_MD'], JS_NPCShop_MD, 'TC', 'NPCShop_MD'],
  [LayerMap['Layer_NPCShop_LY'], JS_NPCShop_LY, 'TC', 'NPCShop_LY'],
  [LayerMap['Layer_NPCShop_DQ'], JS_NPCShop_DQ, 'TC', 'NPCShop_DQ'],
  [LayerMap['Layer_NPCShop_DQ2'], JS_NPCShop_DQ2, 'TC', 'NPCShop_DQ2'],
  [LayerMap['Layer_NPCShop_DQ3'], JS_NPCShop_DQ3, 'TC', 'NPCShop_DQ3'],
  [LayerMap['Layer_JW_YXG'], JS_JW_YXG, 'TC', 'JW_YXG'],
  [LayerMap['Layer_BX_YXG'], JS_BX_YXG, 'TC', 'BX_YXG'],
  [LayerMap['Layer_QKBX_YXG'], JS_QKBX_YXG, 'TC', 'QKBX_YXG'],
  [LayerMap['Layer_DLK_YXG'], JS_DLK_YXG, 'TC', 'DLK_YXG'],
  [LayerMap['Layer_SJRW_YXG'], JS_SJRW_YXG, 'TC', 'SJRW_YXG'],
  [LayerMap['Layer_TFWT_YXG'], JS_TFWT_YXG, 'TC', 'TFWT_YXG'],
  [LayerMap['Layer_DWQ_YXG'], JS_DWQ_YXG, 'TC', 'DWQ_YXG'],
  [LayerMap['Layer_ND_YXG'], JS_ND_YXG, 'TC', 'ND_YXG'],
  [LayerMap['Layer_JWJZ_YXG'], JS_JWJZ_YXG, 'TC', 'JWJZ_YXG'],
  [LayerMap['Layer_SSZPSP_YXG'], JS_SSZPSP_YXG, 'TC', 'SSZPSP_YXG'],
  [LayerMap['Layer_TYCS_YXG'], JS_TYCS_YXG, 'TC', 'TYCS_YXG'],
  [LayerMap['Layer_ShiP_YXG'], JS_ShiP_YXG, 'TC', 'ShiP_YXG'],
  [LayerMap['Layer_SJ_YXG'], JS_SJ_YXG, 'TC', 'SJ_YXG'],
  [LayerMap['Layer_TZ_YXG'], JS_TZ_YXG, 'TC', 'TZ_YXG'],
  [LayerMap['Layer_JG_YXG'], JS_JG_YXG, 'TC', 'JG_YXG'],
  [LayerMap['Layer_NPCShop_YXG'], JS_NPCShop_YXG, 'TC', 'NPCShop_YXG'],
  [LayerMap['Layer_NPC_YXG'], JS_NPC_YXG, 'TC', 'NPC_YXG'],
  [LayerMap['Layer_DYD_YXG'], JS_DYD_YXG, 'TC', 'DYD_YXG'],
  [LayerMap['Layer_MLDCD1_YXG'], JS_MLDCD1_YXG, 'TC', 'MLDCD1_YXG'],
  [LayerMap['Layer_YL_YXG'], JS_YL_YXG, 'TC', 'YL_YXG'],
  [LayerMap['Layer_DBY_YXG'], JS_DBY_YXG, 'TC', 'DBY_YXG'],
  [LayerMap['Layer_SYWD_YXG'], JS_SYWD_YXG, 'TC', 'SYWD_YXG'],
  [LayerMap['Layer_MLDCD_YXG'], JS_MLDCD_YXG, 'TC', 'MLDCD_YXG'],
  [LayerMap['Layer_WQDCD_YXG'], JS_WQDCD_YXG, 'TC', 'WQDCD_YXG'],
  [LayerMap['Layer_XWZM_YXG'], JS_XWZM_YXG, 'TC', 'XWZM_YXG'],
  [LayerMap['Layer_SX_YXG'], JS_SX_YXG, 'TC', 'SX_YXG'],
  [LayerMap['Layer_CSD_YXG'], JS_CSD_YXG, 'CSD', 'CSD_YXG'],
  [LayerMap['Layer_LCMD_YXG'], JS_LCMD_YXG, 'TC', 'LCMD_YXG'],
  [LayerMap['Layer_MJ_YXG'], JS_MJ_YXG, 'TC', 'MJ_YXG'],
  [LayerMap['Layer_FB_YXG'], JS_FB_YXG, 'TC', 'FB_YXG'],
  [LayerMap['Layer_RYLH_YXG'], JS_RYLH_YXG, 'TC', 'RYLH_YXG'],
  [LayerMap['Layer_JHBSC_YXG'], JS_JHBSC_YXG, 'TC', 'JHBSC_YXG'],
  [LayerMap['Layer_SJDJG_YXG'], JS_SJDJG_YXG, 'TC', 'SJDJG_YXG'],
  [LayerMap['Layer_SHZZ_YXG'], JS_SHZZ_YXG, 'TC', 'SHZZ_YXG'],
  [LayerMap['Layer_HLZ_YXG'], JS_HLZ_YXG, 'TC', 'HLZ_YXG'],
  [LayerMap['Layer_YCX_YXG'], JS_YCX_YXG, 'TC', 'YCX_YXG'],
  [LayerMap['Layer_SJK_YXG'], JS_SJK_YXG, 'TC', 'SJK_YXG'],
  [LayerMap['Layer_BTK_YXG'], JS_BTK_YXG, 'TC', 'BTK_YXG'],
  [LayerMap['Layer_TK_YXG'], JS_TK_YXG, 'TC', 'TK_YXG'],
  [LayerMap['Layer_MJK_YXG'], JS_MJK_YXG, 'TC', 'MJK_YXG'],
  [LayerMap['Layer_ZJK_YXG'], JS_ZJK_YXG, 'TC', 'ZJK_YXG'],
  [LayerMap['Layer_KDCD_YXG'], JS_KDCD_YXG, 'TC', 'KDCD_YXG'],
  [LayerMap['Layer_YFZ_YXG'], JS_YFZ_YXG, 'TC', 'YFZ_YXG'],
  [LayerMap['Layer_HLG_YXG'], JS_HLG_YXG, 'TC', 'HLG_YXG'],
  [LayerMap['Layer_DGSN_YXG'], JS_DGSN_YXG, 'TC', 'DGSN_YXG'],
  [LayerMap['Layer_YJZJ_YXG'], JS_YJZJ_YXG, 'TC', 'YJZJ_YXG'],
  [LayerMap['Layer_YJJB_YXG'], JS_YJJB_YXG, 'TC', 'YJJB_YXG'],
  [LayerMap['Layer_DXQQR_YXG'], JS_DXQQR_YXG, 'TC', 'DXQQR_YXG'],
  [LayerMap['Layer_SYFS_YXG'], JS_SYFS_YXG, 'TC', 'SYFS_YXG'],
  [LayerMap['Layer_YSS_YXG'], JS_YSS_YXG, 'TC', 'YSS_YXG'],
  [LayerMap['Layer_DBT_YXG'], JS_DBT_YXG, 'TC', 'DBT_YXG'],
  [LayerMap['Layer_PPH_YXG'], JS_PPH_YXG, 'TC', 'PPH_YXG'],
  [LayerMap['Layer_XQD_YXG'], JS_XQD_YXG, 'TC', 'XQD_YXG'],
  [LayerMap['Layer_SLM_YXG'], JS_SLM_YXG, 'TC', 'SLM_YXG'],
  [LayerMap['Layer_KFZH_YXG'], JS_KFZH_YXG, 'TC', 'KFZH_YXG'],
  [LayerMap['Layer_QQR_YXG'], JS_QQR_YXG, 'TC', 'QQR_YXG'],
  [LayerMap['Layer_QQRSS_YXG'], JS_QQRSS_YXG, 'TC', 'QQRSS_YXG'],
  [LayerMap['Layer_QQSM_YXG'], JS_QQSM_YXG, 'TC', 'QQSM_YXG'],
  [LayerMap['Layer_ZWCLR_YXG'], JS_ZWCLR_YXG, 'TC', 'ZWCLR_YXG'],
  [LayerMap['Layer_PFL_YXG'], JS_PFL_YXG, 'TC', 'PFL_YXG'],
  [LayerMap['Layer_SJQ_YXG'], JS_SJQ_YXG, 'TC', 'SJQ_YXG'],
  [LayerMap['Layer_SHLX_YXG'], JS_SHLX_YXG, 'TC', 'SHLX_YXG'],
  [LayerMap['Layer_HaiCao_YXG'], JS_HaiCao_YXG, 'TC', 'HaiCao_YXG'],
  [LayerMap['Layer_JinGua_YXG'], JS_JinGua_YXG, 'TC', 'JinGua_YXG'],
  [LayerMap['Layer_MR_YXG'], JS_MR_YXG, 'TC', 'MR_YXG'],
  [LayerMap['Layer_SongR_YXG'], JS_SongR_YXG, 'TC', 'SongR_YXG'],
  [LayerMap['Layer_PX_YXG'], JS_PX_YXG, 'TC', 'PX_YXG'],
  [LayerMap['Layer_ShouR_YXG'], JS_ShouR_YXG, 'TC', 'ShouR_YXG'],
  [LayerMap['Layer_QR_YXG'], JS_QR_YXG, 'TC', 'QR_YXG'],
  [LayerMap['Layer_YR_YXG'], JS_YR_YXG, 'TC', 'YR_YXG'],
  [LayerMap['Layer_QD_YXG'], JS_QD_YXG, 'TC', 'QD_YXG'],
  [LayerMap['Layer_RLG_YXG'], JS_RLG_YXG, 'TC', 'RLG_YXG'],
  [LayerMap['Layer_PG_YXG'], JS_PG_YXG, 'TC', 'PG_YXG'],
  [LayerMap['Layer_JYC_YXG'], JS_JYC_YXG, 'TC', 'JYC_YXG'],
  [LayerMap['Layer_BLB_YXG'], JS_BLB_YXG, 'TC', 'BLB_YXG'],
  [LayerMap['Layer_HLB_YXG'], JS_HLB_YXG, 'TC', 'HLB_YXG'],
  [LayerMap['Layer_SG_YXG'], JS_SG_YXG, 'TC', 'SG_YXG'],
  [LayerMap['Layer_TTH_YXG'], JS_TTH_YXG, 'TC', 'TTH_YXG'],
  [LayerMap['Layer_MG_YXG'], JS_MG_YXG, 'TC', 'MG_YXG'],
  [LayerMap['Layer_BH_YXG'], JS_BH_YXG, 'TC', 'BH_YXG'],
  [LayerMap['Layer_SM_YXG'], JS_SM_YXG, 'TC', 'SM_YXG'],
  [LayerMap['Layer_SCDCD_YXG'], JS_SCDCD_YXG, 'TC', 'SCDCD_YXG'],
  [LayerMap['Layer_JH_YXG'], JS_JH_YXG, 'TC', 'JH_YXG'],
  [LayerMap['Layer_BWHHD_YXG'], JS_BWHHD_YXG, 'TC', 'BWHHD_YXG'],
  [LayerMap['Layer_LYHHR_YXG'], JS_LYHHR_YXG, 'TC', 'LYHHR_YXG'],
  [LayerMap['Layer_DQSJ_YXG'], JS_DQSJ_YXG, 'TC', 'DQSJ_YXG'],
  [LayerMap['Layer_FGS_YXG'], JS_FGS_YXG, 'TC', 'FGS_YXG'],
  [LayerMap['Layer_HDCB_YXG'], JS_HDCB_YXG, 'TC', 'HDCB_YXG'],
  [LayerMap['Layer_QW_YXG'], JS_QW_YXG, 'TC', 'QW_YXG'],
  [LayerMap['Layer_XYWB_YXG'], JS_XYWB_YXG, 'TC', 'XYWB_YXG'],
  [LayerMap['Layer_QQBY_YXG'], JS_QQBY_YXG, 'TC', 'QQBY_YXG'],
  [LayerMap['Layer_LiuShan_YXG'], JS_LiuShan_YXG, 'TC', 'LiuShan_YXG'],
  [LayerMap['Layer_YingShu_YXG'], JS_YingShu_YXG, 'TC', 'YingShu_YXG'],
  [LayerMap['Layer_YuJiaShu_YXG'], JS_YuJiaShu_YXG, 'TC', 'YuJiaShu_YXG'],
  [LayerMap['Layer_YuShanFeng_YXG'], JS_YuShanFeng_YXG, 'TC', 'YuShanFeng_YXG'],
  [LayerMap['Layer_SongShu_YXG'], JS_SongShu_YXG, 'TC', 'SongShu_YXG'],

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
  var key = that.attr('data-key').split(' ')[0]
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
      newValue ?
      JSON.stringify({
        stat: now.toString(),
        end: new Date(
          now.setHours(
            now.getHours() + MonosTime[typearray[layerNumber][3]]
          )
        ).toString(),
        layerNumber,
      }) :
      ''
    )
  }

  var doneUrl = newValue ? '_done' : ''
  if (
    layerNumber == 26 ||
    layerNumber == 27 ||
    layerNumber == 150 ||
    layerNumber == 271 ||
    layerNumber == 198 ||
    layerNumber == 290 ||
    layerNumber == 404 ||
    layerNumber == 506
  ) {
    if (that.parent().html().indexOf("宝箱") != -1) {
      if (that.parent().html().indexOf("普通") != -1) {
        var iconUrl =
          'https://assets.yuanshen.site/icons/普通宝箱' + doneUrl + '.png'
      } else if (that.parent().html().indexOf("精致") != -1) {
        var iconUrl =
          'https://assets.yuanshen.site/icons/精致宝箱' + doneUrl + '.png'
      } else if (that.parent().html().indexOf("珍贵") != -1) {
        var iconUrl =
          'https://assets.yuanshen.site/icons/珍贵宝箱' + doneUrl + '.png'
      } else if (that.parent().html().indexOf("华丽") != -1) {
        var iconUrl =
          'https://assets.yuanshen.site/icons/华丽宝箱' + doneUrl + '.png'
      } else {
        var iconUrl =
          'https://assets.yuanshen.site/icons/' + layerNumber + doneUrl + '.svg'
      }
    } else {
      var iconUrl =
        'https://assets.yuanshen.site/icons/' + layerNumber + doneUrl + '.svg'
    }
  } else if (layerNumber == 0 ||
    layerNumber == 1 ||
    layerNumber == 111 ||
    layerNumber == 196 ||
    layerNumber == 288 ||
    layerNumber == 402
  ) {
    var iconUrl =
      'https://assets.yuanshen.site/icons/' + layerNumber + doneUrl + '.svg'
  } else {
    var iconUrl =
      'https://assets.yuanshen.site/icons/' + layerNumber + doneUrl + '.png'
  }
  var currentShowdow = currentIcon.prototype.options.shadowUrl
  var downShadow
  if (
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_on.png' ||
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_off.png'
  ) {
    downShadow = newValue ?
      'https://assets.yuanshen.site/icons/loc_02_on.png' :
      'https://assets.yuanshen.site/icons/loc_02_off.png'
  } else if (
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_stonenot.svg' ||
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_stonefound.svg'
  ) {
    downShadow = newValue ?
      'https://assets.yuanshen.site/icons/loc_stonefound.svg' :
      'https://assets.yuanshen.site/icons/loc_stonenot.svg'
  } else if (
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_on_black.svg' ||
    currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
  ) {
    downShadow = newValue ?
      'https://assets.yuanshen.site/icons/loc_02_on_black.svg' :
      'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
  }
  var doneShadowUrl = currentShowdow ? downShadow : ''
  var newIcon = new currentIcon({
    className: 'mark-' + key + " " + doneUrl,
    iconUrl: iconUrl,
    shadowUrl: doneShadowUrl,
  })
  markers[key].setIcon(newIcon)
  if (newValue) {
    that.addClass('myPopSwitchDone')
    that.removeClass('myPopSwitchTodo')
    setTimeout(function () {
      that.find('.switchButton p').html('Finsih')
    }, 100)
  } else {
    that.addClass('myPopSwitchTodo')
    that.removeClass('myPopSwitchDone')
    setTimeout(function () {
      that.find('.switchButton p').html('todo')
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
        if (
          i == 0 ||
          i == 1 ||
          i == 26 ||
          i == 27 ||
          i == 111 ||
          i == 150 ||
          i == 271 ||
          i == 198 ||
          i == 196 ||
          i == 290 ||
          i == 288 ||
          i == 402 ||
          i == 404 ||
          i == 506
        ) {
          if (feature.properties.popTitle.indexOf("宝箱") != -1) {
            if (feature.properties.popupContent.indexOf("普通") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/普通宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("精致") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/精致宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("珍贵") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/珍贵宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("华丽") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/华丽宝箱' + doneUrl + '.png'
            } else
              var iconUrl =
                'https://assets.yuanshen.site/icons/' + i + doneUrl + '.svg'
          } else
            var iconUrl =
              'https://assets.yuanshen.site/icons/' + i + doneUrl + '.svg'
        } else {
          var iconUrl =
            'https://assets.yuanshen.site/icons/' + i + doneUrl + '.png'
        }
        var currentShowdow = currentIcon.prototype.options.shadowUrl
        var downShadow
        if (
          currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_on.png' ||
          currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_off.png'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_02_on.png' :
            'https://assets.yuanshen.site/icons/loc_02_off.png'
        } else if (
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_stonenot.svg' ||
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_stonefound.svg'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_stonefound.svg' :
            'https://assets.yuanshen.site/icons/loc_stonenot.svg'
        } else if (
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_02_on_black.svg' ||
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_02_on_black.svg' :
            'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
        }
        var doneShadowUrl = currentShowdow ? downShadow : ''
        var marker = L.marker([latlng.lng, latlng.lat], {
          icon: new currentIcon({
            className: 'mark-' + key + " " + doneUrl,
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
        if (
          i == 0 ||
          i == 1 ||
          i == 26 ||
          i == 27 ||
          i == 111 ||
          i == 150 ||
          i == 271 ||
          i == 198 ||
          i == 196 ||
          i == 290 ||
          i == 288 ||
          i == 402 ||
          i == 404 ||
          i == 506
        ) {
          if (feature.properties.popTitle.indexOf("宝箱") != -1) {
            if (feature.properties.popupContent.indexOf("普通") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/普通宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("精致") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/精致宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("珍贵") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/珍贵宝箱' + doneUrl + '.png'
            } else if (feature.properties.popupContent.indexOf("华丽") != -1) {
              var iconUrl =
                'https://assets.yuanshen.site/icons/华丽宝箱' + doneUrl + '.png'
            } else
              var iconUrl =
                'https://assets.yuanshen.site/icons/' + i + doneUrl + '.svg'
          } else
            var iconUrl =
              'https://assets.yuanshen.site/icons/' + i + doneUrl + '.svg'
        } else {
          var iconUrl =
            'https://assets.yuanshen.site/icons/' + i + doneUrl + '.png'
        }
        var currentShowdow = currentIcon.prototype.options.shadowUrl
        var downShadow
        if (
          currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_on.png' ||
          currentShowdow == 'https://assets.yuanshen.site/icons/loc_02_off.png'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_02_on.png' :
            'https://assets.yuanshen.site/icons/loc_02_off.png'
        } else if (
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_stonenot.svg' ||
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_stonefound.svg'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_stonefound.svg' :
            'https://assets.yuanshen.site/icons/loc_stonenot.svg'
        } else if (
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_02_on_black.svg' ||
          currentShowdow ==
          'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
        ) {
          downShadow = markedFlag ?
            'https://assets.yuanshen.site/icons/loc_02_on_black.svg' :
            'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
        }
        var doneShadowUrl = currentShowdow ? downShadow : ''
        var newIcon = new currentIcon({
          className: 'mark-' + key + " " + doneUrl,
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
function checkWebp() {
  try {
    return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
  } catch (err) {
    return false;
  }
}
var isWebP = checkWebp();
let timer
map.on('popupopen', function (e) {
  console.log('e', e)
  state = 1
  var marker = e.popup._source
  var className = marker.options.icon.options.className.split(" ")[0]
  var key = className.substring(5, className.length)
  var markedFlag = localStorage.getItem(key)
  var switchClass = !markedFlag ? 'myPopSwitchTodo' : 'myPopSwitchDone'
  var switchText = !markedFlag ? 'todo' : 'finish'
  const timeValue = localStorage.getItem('done_time_' + key)

  var popupHtml = `
	<div class="myPopContainer">
		<div class="myPopTitle">
			<div class="myPopName" >${marker.feature.properties.popTitle}${marker.feature.id}</div>
		</div>
		<div class="myPopLine"></div>
		<div class="myPopIssue" onclick="openIssue()">反馈<img class="myPopIssueIcon" src=imgs/con_img/popIssue.png></div>
		<div class="myPopClose" onclick="closePop()"></div>
		<div class="myPopComment disable" onclick="change()" style="white-space:pre-line">${marker.feature.properties.popupContent}
			<img class="Select" src=imgs/con_img/Select.png>
		</div>
		<div class="time-wrapper"><span id="time"></span></div>
		<div class="myPopPicture disable">
			<img class="img" />
		</div>
		<div class="${switchClass}" onclick="MarkPoint(this)" data-key="${key}">
			<p class="switchOff">todo</p>
			<p class="switchOn">Finish</p>
			<div class="switchButton">
				<div class="switchButtonIcon">
					<p>${switchText}</p>
				</div>
			</div>
		</div>
		<div class="tipcard"></div>

	</div>`
  if (timeValue) {
    const {
      start,
      end
    } = JSON.parse(timeValue)
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
  if (isWebP) {
    $.ajax({
      url: `comment_png/${key}.jpg`,
      headers: {
        Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      },
      type: "get",
      success: function (data) {
        $('.myPopComment,.myPopPicture').removeClass('disable')
        $('.myPopComment').css({
          cursor: 'point',
        })
        $('.myPopPicture>.img').attr('src', `comment_png/${key}.jpg`)
      }
    });
  } else {
    $.get(`comment_png/${key}.jpg`, function (data) {
      $('.myPopComment,.myPopPicture').removeClass('disable')
      $('.myPopComment').css({
        cursor: 'point',
      })
      $('.myPopPicture>.img').attr('src', `comment_png/${key}.jpg`)
    })
  }
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
          let iconUrl =
            'https://assets.yuanshen.site/icons/' +
            value.layerNumber +
            doneUrl +
            '.png'
          let currentShowdow = currentIcon.prototype.options.shadowUrl
          let downShadow
          if (
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_02_on.png' ||
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_02_off.png'
          ) {
            downShadow = newValue ?
              'https://assets.yuanshen.site/icons/loc_02_on.png' :
              'https://assets.yuanshen.site/icons/loc_02_off.png'
          } else if (
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_stonenot.svg' ||
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_stonefound.svg'
          ) {
            downShadow = newValue ?
              'https://assets.yuanshen.site/icons/loc_stonefound.svg' :
              'https://assets.yuanshen.site/icons/loc_stonenot.svg'
          } else if (
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_02_on_black.svg' ||
            currentShowdow ==
            'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
          ) {
            downShadow = newValue ?
              'https://assets.yuanshen.site/icons/loc_02_on_black.svg' :
              'https://assets.yuanshen.site/icons/loc_02_off_black.svg'
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
