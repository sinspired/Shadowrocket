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

// 直接处理小助手相关逻辑
if ($request.url.includes("operation/homefeatures")) {
    responseBody = { data: [] };  // 清除所有数据，包括小助手
} 
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    // 过滤去掉不需要的数据，依旧保留一些合理的数据
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);
} 
else if ($request.url.includes("operation/banners")) {
    responseBody = { data: [] };  // 清空所有横幅广告，包括小助手
} 
else if ($request.url.includes("operation/features")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(item => {
        return item.title !== "赏花地图" && (item.icon_url && item.icon_url !== "");
    });
    responseBody.data.forEach(item => {
        if (item.icon_url === "path_to_unused_icon") {
            item.icon_url = "";  // 清空无效图标
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
    responseBody = { messages: [] };  // 清空所有消息
} 
else if ($request.url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] };  // 清除配置中的小助手元素
}

// 进一步处理"小助手"的清除
if ($request.url.includes("wrapper.cyapi.cn") || $request.url.includes("api.caiyunapp.com")) {
    try {
        responseBody = JSON.parse($response.body);
        if (responseBody.data && Array.isArray(responseBody.data)) {
            // 查找是否有"小助手"相关的项，直接过滤掉
            responseBody.data = responseBody.data.filter(item => item.title !== "小助手");
        }
    } catch (e) {
        console.error("Error parsing response body for wrapper.cyapi.cn or api.caiyunapp.com");
    }
}

$done({ body: JSON.stringify(responseBody) });
