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
    if (obj.data) {
        obj.data = obj.data.filter(item => !item.name || !item.name.includes("小助手"));
    }
}

if ($request.url.indexOf("profile/index/node") !== -1) {
    // 删除 profile/index/node 的提示信息和与小助手相关的卡片
    delete obj.data.tipData;
    if (obj.data?.cardList) {
        obj.data.cardList = obj.data.cardList.filter(a => a.name !== "小助手");
    }
}

if ($request.url.indexOf("ws/message/notice/list") !== -1) {
    // 清空通知消息
    if (obj.data?.noticeList) {
        obj.data.noticeList = [];
    }
}

if ($request.url.indexOf("ws/shield/frogserver/aocs") !== -1) {
    // 清空 ws/shield/frogserver/aocs 中小助手相关的字段
    let keysToClear = [
        "assistant_logo",
        "assistant_position",
        "assistant_tip"
    ];
    for (let key of keysToClear) {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
        }
    }
}

// 返回处理后的响应
$done({ body: JSON.stringify(obj) });
