/*
// 彩云天气Pro
// 仅作去广告处理，去除广告，去除“小助手”；

[rewrite_local]
^https?:\/\/ad\.cyapi\.cn\/v\d url reject-200
^https?:\/\/wrapper\.cyapi\.cn\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/api\.caiyunapp\.com\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/homefeatures url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/notification/message_center url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/config/cypage url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/feeds url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/banners url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/features url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/campaigns url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js

[mitm]
hostname = wrapper.cyapi.cn, api.caiyunapp.com, starplucker.cyapi.cn, ad.cyapi.cn
*/

var obj = JSON.parse($response.body);

if ($request.url.indexOf("operation/homefeatures") !== -1) {
    // 清空 operation/homefeatures 的所有数据
    obj.data = [];
}

if ($request.url.indexOf("profile/index/node") !== -1) {
    // 清空 profile/index/node 的卡片列表
    delete obj.data.tipData;
    obj.data.cardList = [];
}

if ($request.url.indexOf("ws/message/notice/list") !== -1) {
    // 清空通知消息
    obj.data.noticeList = [];
}

if ($request.url.indexOf("ws/shield/frogserver/aocs") !== -1) {
    // 清空 ws/shield/frogserver/aocs 的数据
    obj.data = {};
}

if ($request.url.indexOf("ws/promotion-web/resource") !== -1) {
    // 清空广告资源
    let resourceTypes = ["icon", "banner", "tips", "popup", "bubble", "other"];
    resourceTypes.forEach(type => {
        if (obj.data?.[type]) {
            obj.data[type] = [];
        }
    });
}

if ($request.url.indexOf("ws/msgbox/pull") !== -1) {
    // 清空消息通知
    obj.msgs = [];
    if (obj.pull3?.msgs) {
        obj.pull3.msgs = [];
    }
}

if ($request.url.indexOf("faas/amap-navigation/main-page") !== -1) {
    // 删除高德导航的多余内容
    if (obj.data?.cardList) {
        obj.data.cardList = [];
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
}

// 返回处理后的响应
$done({ body: JSON.stringify(obj) });
