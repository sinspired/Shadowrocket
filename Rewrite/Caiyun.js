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

// 处理 "operation/homefeatures" 的请求
if ($request.url.includes("operation/homefeatures")) {
    responseBody = { data: [] };
}
// 处理 "operation/feeds" 的请求
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);
}
// 处理 "operation/banners" 的请求
else if ($request.url.includes("operation/banners")) {
    responseBody = { data: [] };
}
// 处理 "operation/features" 的请求
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
// 处理 "campaigns" 的请求
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
// 处理 "notification/message_center" 的请求
else if ($request.url.includes("notification/message_center")) {
    responseBody = { messages: [] };
}
// 处理 "config/cypage" 的请求
else if ($request.url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] };
}
// 处理“小助手”相关的请求
else if ($request.url.includes("assistant")) { 
    responseBody = {
        data: [] // 将小助手的内容去除，返回一个空数组
    };
}

$done({ body: JSON.stringify(responseBody) });
