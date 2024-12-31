/*
// 高德地图
// 去除广告和无关内容；

[rewrite_local]
^https?://.*.amap.com/ws/boss/order_web/\w{8}_information url reject-200
^https?://.*.amap.com/ws/asa/ads_attribution url reject
^https?://.*.amap.com/ws/shield/scene/recommend url reject-dict
^https?://.*.amap.com/uploadimg/\w+.gif url reject-img
^https?://.*.amap.com/ws/valueadded/weather url reject-dict
^http:\/\/amdc\.m\.taobao\.com url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/valueadded/alimama/splash_screen url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/message/notice/list url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/shield/frogserver/aocs/updatable url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/shield/search/nearbyrec_smart url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/promotion-web/resource url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/faas/amap-navigation/main-page url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/msgbox/pull url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/shield/dsp/profile/index/nodefaas url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js
^https?://.*.amap.com/ws/shield/search/new_hotword url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js

[mitm]
hostname = *.amap.com
*/

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var pattern = /(AMap|Cainiao|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|Alibaba|Hema4iPhone|Moon|DMPortal)/;
if (pattern.test(ua)) {
    $done({ body: "adsblock" });
} else {
    $done({});
}
var obj = JSON.parse($response.body);
if ($request.url.indexOf("search/nearbyrec_smart") !== -1) {
    let fieldsToRemove = ["coupon", "scene", "activity", "commodity_rec", "operation_activity"];
    if (obj.data) {
        fieldsToRemove.forEach(field => {
            delete obj.data[field];
        });
        if (obj.data.modules) {
            obj.data.modules = obj.data.modules.filter(module => 
                !fieldsToRemove.includes(module)
            );
        }
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("valueadded/alimama/splash_screen") !== -1) {
    if (obj.data && obj.data.ad) {
        for (let ad of obj.data.ad) {
            ad.set.setting.display_time = 0;
            ad.creative[0].start_time = 2240150400;
            ad.creative[0].end_time = 2240150400;
        }
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("faas/amap-navigation/main-page") !== -1) {
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList).filter(a => 
            a.dataType === "LoginCard" || a.dataType === "FrequentLocation"
        );
    }
    if (obj.data?.pull3?.msgs) {
        obj.data.pull3.msgs = [];
    }
    if (obj.data?.business_position) {
        obj.data.business_position = [];
    }
    if (obj.data?.mapBizList) {
        obj.data.mapBizList = [];
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("profile/index/node") !== -1) {
    delete obj.data.tipData;
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList).filter(a => 
            a.dataType === "MyOrderCard" || a.dataType === "GdRecommendCard"
        );
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("new_hotword") !== -1) {
    if (obj.data?.header_hotword) {
        obj.data.header_hotword = [];
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("ws/promotion-web/resource") !== -1) {
    let resourceTypes = ["icon", "banner", "tips", "popup", "bubble", "other"];
    for (let type of resourceTypes) {
        if (obj.data?.[type]) {
            obj.data[type] = [];
        }
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("ws/msgbox/pull") !== -1) {
    if (obj.msgs) {
        obj.msgs = [];
    }
    if (obj.pull3?.msgs) {
        obj.pull3.msgs = [];
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("ws/message/notice/list") !== -1) {
    if (obj.data?.noticeList) {
        obj.data.noticeList = [];
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("ws/shield/frogserver/aocs") !== -1) {
    let keysToClear = [
        "gd_notch_logo", 
        "home_business_position_config", 
        "his_input_tip", 
        "operation_layer"
    ];
    for (let key of keysToClear) {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
        }
    }
    $done({ body: JSON.stringify(obj) });
} else {
    $done({ body: JSON.stringify(obj) });
}
