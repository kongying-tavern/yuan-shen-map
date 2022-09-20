//点位相关
import * as L from 'leaflet'
import "leaflet/dist/leaflet.css";
// import "../api/leaflet_markercluster/leaflet.markercluster-src.js";
// import "../api/leaflet_markercluster/MarkerCluster.css"
// import "../api/leaflet_markercluster/MarkerCluster.Default.css"
/**
* 生成点位背景
* @param {Object} data 点位数据对象
* @param {string} type 点位背景的类型 off：默认；on：选中态；none：无背景
* @returns {Object} icon对象
*/
function create_icon_options(url, type = "off") {
    let options = {
        type: type,
        teleport: false,
        iconUrl: url == '' ? 'https://assets.yuanshen.site/icons/-1.png' : url,
        shadowUrl: `https://assets.yuanshen.site/icons/loc_02_${type}.png`,
        iconSize: [22, 22], // size of the icon
        shadowSize: [32, 36], // size of the shadow
        iconAnchor: [11, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [16, 35], // the same for the shadow
        popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
    };
    if (type == 'off' || type == 'on') {
        return options
    }
    else {
        options = {
            ...options,
            shadowUrl: undefined,
            teleport: true
        }
        switch (type) {
            case "七天神像":
                options = {
                    ...options,
                    iconSize: [30, 43], // size of the icon
                    shadowSize: [24, 24], // size of the shadow
                    iconAnchor: [15, 21.5], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 24], // the same for the shadow
                    popupAnchor: [0, -21.5], // point from which the popup should open relative to the iconAnchor
                };
                return options;
            case "传送锚点":
                options = {
                    ...options,
                    iconSize: [23, 33], // size of the icon
                    shadowSize: [24, 24], // size of the shadow
                    iconAnchor: [11.5, 16.5], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 24], // the same for the shadow
                    popupAnchor: [0, -16.5], // point from which the popup should open relative to the iconAnchor
                };
                return options;
            case "秘境":
            case "征讨领域":
            default:
                options = {
                    ...options,
                    iconSize: [33, 33], // size of the icon
                    shadowSize: [24, 24], // size of the shadow
                    iconAnchor: [16.5, 16.5], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 24], // the same for the shadow
                    popupAnchor: [0, -16.5], // point from which the popup should open relative to the iconAnchor
                };
                return options;
        }

    }

}
/**
* 生成点位
* @param {array} data  要生成点位的点位数据数组
* @param {String} iconurl 点位图标链接
* @returns {Object} marker对象
*/
function layer_register(data, iconurl, type) {
    let marker = L.marker(data.position.split(','), {
        icon: L.icon(create_icon_options(iconurl, type)),
        data: { ...data },
        draggable: false,
    })
    return marker
}
/**
* 生成点位组
* @param {array} data  要生成点位的点位数据数组
* @param {String} iconurl 点位图标链接
* @returns {Object} layerGroup对象
*/
function layergroup_register(data = [], iconurl) {
    let layerGroup = L.layerGroup();
    for (let i of data) {
        layerGroup.addLayer(layer_register(i, iconurl));
    }
    return layerGroup
}
/**
* 标记/取消标记点位
* @param {array} layer  要标记/取消标记的点位
* @returns {Object} 标记/取消标记后的点位
*/
function layer_mark(layer, marktype) {
    let type = marktype == undefined ? layer.options.icon.options.type : marktype;
    let icon = ''
    if (type == 'on') {
        icon = L.icon(create_icon_options(layer.options.icon.options.iconUrl, 'off'))
    }
    else {
        icon = L.icon(create_icon_options(layer.options.icon.options.iconUrl, 'on'))
    }
    layer = layer.setIcon(icon);
    return layer

}
/**
* 为点位着色
* @param {array} layer  要着色的点位
* @returns {Object} 着色后的点位
*/
function layer_dye(layer, type) {
    let icon = L.icon(create_icon_options(layer.options.icon.options.iconUrl, type));
    layer = layer.setIcon(icon);
    return layer
}
export {
    create_icon_options,
    layer_register,
    layergroup_register,
    layer_mark
}