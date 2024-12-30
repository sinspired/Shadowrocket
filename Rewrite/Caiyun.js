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

let responseBody = {};
if ($request.url.includes("operation/homefeatures")) {
    responseBody = { data: [] };
}
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);
}
else if ($request.url.includes("operation/banners")) {
    responseBody = {
        data: []
    };
}
else if ($request.url.includes("operation/features")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(item => {
        return item.title !== "赏花地图" && (item.icon_url && item.icon_url !== "");
    });
    responseBody.data.forEach(item => {
        if (item.icon_url === "path_to_unused_icon") {
            item.icon_url = "";
        }
    });
}
else if ($request.url.includes("campaigns")) {
    responseBody = {
        campaigns: [
            {
                name: "driveweather",
                title: "驾驶天气新功能",
                url: "cy://page_driving_weather",
                cover: "https://cdn-w.caiyunapp.com/p/banner/test/668d442c4fe75aca7251c161.png"
            }
        ]
    };
}
else if ($request.url.includes("notification/message_center")) {
    responseBody = { messages: [] };
}
else if ($request.url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] };
}
// 彩云小助手（彩云AI）处理逻辑
else if ($request.url.includes("/api.caiyunapp.com/v1/activity")) {
    let obj = JSON.parse($response.body);
    if ($request.url.includes("&type_id=A03&")) {
        // 底栏控制项目 主页图标 天气助手 彩云ai
        if (obj?.interval) {
            obj.interval = 2592000; // 30天 === 2592000秒
        }
        if (obj?.activities?.length > 0) {
            for (let item of obj.activities) {
                if (item?.name && item?.type && item?.feature) {
                    item.feature = false;  // 禁用某些功能
                }
            }
        }
    }
    responseBody = obj;  // 更新返回体
}

$done({ body: JSON.stringify(responseBody) });
