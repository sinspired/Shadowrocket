/*
# 高德地图
# 高德地图应用净化；
# 由向晚重写维护；
# 更新时间: 20250522
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js

[rewrite_local]
^https?:\/\/.*\.amap\.com\/uploadimg\/.*\.gif url reject-img
^https?:\/\/.*\.amap\.com\/ws\/faas\/amap-navigation\/card-service-route-plan\? url reject-dict
^https?:\/\/.*\.amap\.com\/ws\/shield\/scene\/recommend url reject-dict
^https?:\/\/.*\.amap\.com\/ws\/shield\/dsp\/app\/startup\/init\? url reject-dict
^https?:\/\/.*\.amap\.com\/ws\/asa\/ads_attribution url reject
^https?:\/\/.*\.amap\.com\/ws\/boss\/order_web\/\w{8}_information url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/valueadded\/alimama\/splash_screen url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/message\/notice\/list url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/msgbox\/pull url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/frogserver\/aocs\/updatable url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/dsp\/profile\/index\/nodefaas url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/nearbyrec_smart url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/poi\/detail url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/poi\/homepage url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/poi\/search\/sp url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search_poi\/sug url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/new_hotword url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/promotion-web\/resource url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/faas\/amap-navigation\/main-page url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js

[mitm]
hostname = *.amap.com
*/

const obj = JSON.parse($response.body);
let modified = false;

const url = $request.url;

function clearArrayField(obj, field) {
    if (Array.isArray(obj?.[field]) && obj[field].length > 0) {
        obj[field] = [];
        modified = true;
    }
}

if (url.includes("search/nearbyrec_smart")) {
    const fieldsToRemove = ["coupon", "scene", "activity", "commodity_rec", "operation_activity"];
    if (obj.data) {
        fieldsToRemove.forEach(field => {
            if (obj.data.hasOwnProperty(field)) {
                delete obj.data[field];
                modified = true;
            }
        });
        if (Array.isArray(obj.data.modules)) {
            const originalLength = obj.data.modules.length;
            obj.data.modules = obj.data.modules.filter(m => !fieldsToRemove.includes(m.name));
            if (obj.data.modules.length !== originalLength) modified = true;
        }
    }
} else if (url.includes("valueadded/alimama/splash_screen")) {
    if (Array.isArray(obj.data?.ad)) {
        obj.data.ad.forEach(ad => {
            if (ad.set?.setting && typeof ad.set.setting === "object") {
                ad.set.setting.display_time = 0;
                modified = true;
            }
            if (Array.isArray(ad.creative)) {
                ad.creative.forEach(creative => {
                    creative.start_time = 3818332800;
                    creative.end_time = 3818419199;
                });
                modified = true;
            }
        });
    }
} else if (url.includes("faas/amap-navigation/main-page")) {
    if (Array.isArray(obj.data?.cardList)) {
        const allowed = new Set(["LoginCard", "FrequentLocation"]);
        const originalLength = obj.data.cardList.length;
        obj.data.cardList = obj.data.cardList.filter(c => allowed.has(c.dataType));
        if (obj.data.cardList.length !== originalLength) modified = true;
    }
    clearArrayField(obj.data, "pull3.msgs");
    clearArrayField(obj.data, "business_position");
    clearArrayField(obj.data, "mapBizList");
} else if (url.includes("profile/index/nodefaas")) {
    if (obj.data?.tipData) {
        delete obj.data.tipData;
        modified = true;
    }
    if (Array.isArray(obj.data?.cardList)) {
        const allowed = new Set(["MyOrderCard"]);
        const originalLength = obj.data.cardList.length;
        obj.data.cardList = obj.data.cardList.filter(c => allowed.has(c.dataType));
        if (obj.data.cardList.length !== originalLength) modified = true;
    }
} else if (url.includes("new_hotword")) {
    clearArrayField(obj.data, "header_hotword");
} else if (url.includes("ws/promotion-web/resource")) {
    ["icon", "banner", "tips", "popup", "bubble", "other"].forEach(type => {
        clearArrayField(obj.data, type);
    });
} else if (url.includes("ws/msgbox/pull")) {
    clearArrayField(obj, "msgs");
    clearArrayField(obj.pull3, "msgs");
} else if (url.includes("ws/message/notice/list")) {
    clearArrayField(obj.data, "noticeList");
} else if (url.includes("/shield/search_poi/homepage")) {
    if (obj?.history_tags) {
        delete obj.history_tags;
        modified = true;
    }
} else if (url.includes("/shield/search_poi/search/sp") || url.includes("/shield/search_poi/mps")) {
    let list;
    if (obj?.data?.list_data) {
        list = obj.data.list_data.content[0];
    } else if (obj?.data?.district?.poi_list) {
        const poi = obj.data.district.poi_list[0];
        if (poi?.transportation) {
            delete poi.transportation;
            modified = true;
        }
        if (poi?.feed_rec_tab) {
            delete poi.feed_rec_tab;
            modified = true;
        }
    } else if (obj?.data?.modules?.not_parse_result?.data?.list_data) {
        list = obj.data.modules.not_parse_result.data.list_data.content[0];
    }

    if (list) {
        if (list.hookInfo?.data) {
            const hookData = list.hookInfo.data;
            if (hookData.header) {
                delete hookData.header;
                modified = true;
            }
            if (hookData.house_info) {
                delete hookData.house_info;
                modified = true;
            }
        }
        if (list.map_bottom_bar?.hotel) {
            delete list.map_bottom_bar.hotel;
            modified = true;
        }
        if (list.poi?.item_info?.tips_bottombar_button?.hotel) {
            delete list.poi.item_info.tips_bottombar_button.hotel;
            modified = true;
        }
        if (list.map?.main_point) {
            delete list.map.main_point;
            modified = true;
        }
        if (list.tips_operation_info) {
            delete list.tips_operation_info;
            modified = true;
        }
        if (list.bottom?.bottombar_button?.hotel) {
            delete list.bottom.bottombar_button.hotel;
            modified = true;
        }
        if (list.card) {
            if ((list.card.card_id === "SearchCardBrand" && list.item_type === "brandAdCard") ||
                (list.card.card_id === "NearbyGroupBuy" && list.item_type === "toplist") ||
                (list.card.card_id === "ImageBanner" && list.item_type === "ImageBanner")) {
                delete list.card;
                modified = true;
            }
        }
    }

    if (obj?.data?.modules?.list_data?.data?.content?.length > 0) {
        obj.data.modules.list_data.data.content = obj.data.modules.list_data.data.content.filter(item =>
            !["brandAdCard", "toplist_al"].includes(item.item_type)
        );
        modified = true;
    }
} else if (url.includes("/shield/search_poi/sug")) {
    if (Array.isArray(obj.data?.sug)) {
        obj.data.sug = obj.data.sug.filter(item => item.show_type !== "ad");
        modified = true;
    }
}

if (modified) {
    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}
