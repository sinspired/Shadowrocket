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
    // 去除所有 operation/homefeatures 数据
    obj.data = [];
}

if ($request.url.indexOf("profile/index/node") !== -1) {
    // 删除个人中心的卡片数据
    delete obj.data.tipData;
    obj.data.cardList = [];
}

if ($request.url.indexOf("ws/message/notice/list") !== -1) {
    // 清空通知消息列表
    if (obj.data?.noticeList) {
        obj.data.noticeList = [];
    }
}

if ($request.url.indexOf("ws/shield/frogserver/aocs") !== -1) {
    // 强制清除小助手相关字段
    let keysToClear = ["gd_notch_logo", "home_business_position_config", "his_input_tip", "operation_layer"];
    for (let key of keysToClear) {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
        }
    }
}

// 保持其他接口逻辑不变
if ($request.url.indexOf("operation/feeds") !== -1) {
    obj.data = obj.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);
} else if ($request.url.indexOf("operation/banners") !== -1) {
    obj.data = [];
} else if ($request.url.indexOf("operation/features") !== -1) {
    obj.data = obj.data.filter(item => {
        return item.title !== "赏花地图" && (item.icon_url && item.icon_url !== "");
    });
    obj.data.forEach(item => {
        if (item.icon_url === "path_to_unused_icon") {
            item.icon_url = "";
        }
    });
} else if ($request.url.indexOf("campaigns") !== -1) {
    obj.campaigns = [
        {
            name: "driveweather",
            title: "驾驶天气新功能",
            url: "cy://page_driving_weather",
            cover: "https://cdn-w.caiyunapp.com/p/banner/test/668d442c4fe75aca7251c161.png"
        }
    ];
} else if ($request.url.indexOf("notification/message_center") !== -1) {
    obj.messages = [];
} else if ($request.url.indexOf("config/cypage") !== -1) {
    obj.popups = [];
    obj.actions = [];
}

// 返回处理后的响应
$done({ body: JSON.stringify(obj) });
