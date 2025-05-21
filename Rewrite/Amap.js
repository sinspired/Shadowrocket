/*
# 高德地图
# 高德地图应用净化；
# 由向晚重写维护；
# 更新时间: 20250521
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
^https?:\/\/.*\.amap\.com\/ws\/shield\/frogserver\/aocs\/updatable url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/nearbyrec_smart url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/promotion-web\/resource url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/faas\/amap-navigation\/main-page url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/msgbox\/pull url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/dsp\/profile\/index\/nodefaas url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js
^https?:\/\/.*\.amap\.com\/ws\/shield\/search\/new_hotword url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/Amap.js

[mitm]
hostname = *.amap.com
*/

const obj = JSON.parse($response.body);
let modified = false;

if ($request.url.includes("search/nearbyrec_smart")) {
    const fieldsToRemove = ["coupon", "scene", "activity", "commodity_rec", "operation_activity"];
    if (obj.data) {
        fieldsToRemove.forEach(field => {
            if (obj.data.hasOwnProperty(field)) {
                delete obj.data[field];
                modified = true;
            }
        });
        if (Array.isArray(obj.data?.modules)) {
            const originalLength = obj.data.modules.length;
            obj.data.modules = obj.data.modules.filter(module => !fieldsToRemove.includes(module.name));
            if (obj.data.modules.length !== originalLength) modified = true;
        }
    }
} else if ($request.url.includes("valueadded/alimama/splash_screen")) {
    if (Array.isArray(obj.data?.ad)) {
        obj.data.ad.forEach(ad => {
            if (ad.set?.setting && typeof ad.set.setting === "object") {
                ad.set.setting.display_time = 0;
                modified = true;
            }
            if (Array.isArray(ad.creative)) {
                ad.creative.forEach(creative => {
                    creative.start_time = 2240150400;
                    creative.end_time = 2240150400;
                });
                modified = true;
            }
        });
    }
} else if ($request.url.includes("faas/amap-navigation/main-page")) {
    if (Array.isArray(obj.data?.cardList)) {
        const originalLength = obj.data.cardList.length;
        const allowedCards = new Set(["LoginCard", "FrequentLocation"]);
        obj.data.cardList = obj.data.cardList.filter(a => allowedCards.has(a.dataType));
        if (obj.data.cardList.length !== originalLength) modified = true;
    }
    if (Array.isArray(obj.data?.pull3?.msgs) && obj.data.pull3.msgs.length > 0) {
        obj.data.pull3.msgs = [];
        modified = true;
    }
    if (Array.isArray(obj.data?.business_position) && obj.data.business_position.length > 0) {
        obj.data.business_position = [];
        modified = true;
    }
    if (Array.isArray(obj.data?.mapBizList) && obj.data.mapBizList.length > 0) {
        obj.data.mapBizList = [];
        modified = true;
    }
} else if ($request.url.includes("profile/index/nodefaas")) {
    if (obj.data?.tipData) {
        delete obj.data.tipData;
        modified = true;
    }
    if (Array.isArray(obj.data?.cardList)) {
        const originalLength = obj.data.cardList.length;
        const allowedCards = new Set(["MyOrderCard"]);
        obj.data.cardList = obj.data.cardList.filter(a => allowedCards.has(a.dataType));
        if (obj.data.cardList.length !== originalLength) modified = true;
    }
} else if ($request.url.includes("new_hotword")) {
    if (Array.isArray(obj.data?.header_hotword) && obj.data.header_hotword.length > 0) {
        obj.data.header_hotword = [];
        modified = true;
    }
} else if ($request.url.includes("ws/promotion-web/resource")) {
    const resourceTypes = ["icon", "banner", "tips", "popup", "bubble", "other"];
    resourceTypes.forEach(type => {
        if (Array.isArray(obj.data?.[type]) && obj.data[type].length > 0) {
            obj.data[type] = [];
            modified = true;
        }
    });
} else if ($request.url.includes("ws/msgbox/pull")) {
    if (Array.isArray(obj.msgs) && obj.msgs.length > 0) {
        obj.msgs = [];
        modified = true;
    }
    if (Array.isArray(obj.pull3?.msgs) && obj.pull3.msgs.length > 0) {
        obj.pull3.msgs = [];
        modified = true;
    }
} else if ($request.url.includes("ws/message/notice/list")) {
    if (Array.isArray(obj.data?.noticeList) && obj.data.noticeList.length > 0) {
        obj.data.noticeList = [];
        modified = true;
    }
} else if ($request.url.includes("ws/shield/frogserver/aocs")) {
    const keysToClear = ["gd_notch_logo", "home_business_position_config", "his_input_tip", "operation_layer"];
    keysToClear.forEach(key => {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
            modified = true;
        }
    });
} else if ($request.url.includes("/boss/order_web/friendly_information")) {
    const items = ["banners", "carouselTips", "integratedBanners", "integratedTips", "skins", "skinAndTips", "tips"];
    if (obj?.data?.["105"]) {
        items.forEach(i => {
            if (obj.data["105"].hasOwnProperty(i)) {
                delete obj.data["105"][i];
                modified = true;
            }
        });
    }
}

$done({ body: modified ? JSON.stringify(obj) : $response.body });
