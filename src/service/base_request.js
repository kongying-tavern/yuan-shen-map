import { api } from '../boot/axios'
import { get_user_token } from "../api/common"
function default_request(url, data, method = 'post') {
    return api({
        method: method,
        url: url,
        data: JSON.stringify(data),
        transformRequest: (data) => {
            if (get_user_token() == null) {
                alert('用户凭证已过期，请刷新页面')
                window.location.reload();
            }
            return data
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${get_user_token()}`
        }
    })
}
/**
 * 列出地区
 * @param {Number} parentId 父级ID,默认为-1
 * @param {Boolean} isTraverse 是否遍历子地区
 * @returns 地区信息
 */
function query_area(data) {
    return default_request('/area/get/list', data);
}
/**
 * 列出物品类型
 * @param {Number} self 查询自身还是查询子级，0为查询自身，1为查询子级
 * @param {Array} typeIdList 父级类型ID列表
 * @param {Number} current 当前页，从0开始
 * @param {Number} size 每页大小，默认为10
 * @returns 物品类型信息
 */
function query_type(self, data) {
    return default_request(`/item/get/type/${self}`, data);
}
/**
 * 列出物品列表
 * @param {Array} typeIdList 末端物品类型ID列表
 * @param {Array} areaIdList 末端地区ID列表
 * @param {Number} current 当前页，从0开始
 * @param {Number} size 每页大小，默认为10
 * @returns 物品列表信息
 */
function query_itemlist(data) {
    return default_request(`/item/get/list`, data);
}
/**
 * 列出物品信息列表
 * @param {Array} typeIdList 物品类型ID列表
 * @param {Array} areaIdList 地区ID列表
 * @param {Array} itemIdList 物品ID列表
 * @param {Number} getBeta 获取测试点位,默认为0，不获取，为1时只获取测试点
 * @returns 物品点位id信息
 */
function query_itemlayer_infolist(data) {
    return default_request(`/marker/get/list_byinfo`, data);
}
/**
 * 列出所有图标
 * @param {Array} iconIdList 物品类型ID列表
 * @param {Array} typeIdList 地区ID列表
 * @returns 物品点位图标信息
 */
function query_iconlist(data) {
    return default_request(`/icon/get/list`, data);
}
export {
    query_area,
    query_type,
    query_itemlist,
    query_itemlayer_infolist,
    query_iconlist,
}