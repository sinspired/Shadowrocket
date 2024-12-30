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
    responseBody = { data: [] }; // 清空主页面的功能项
}
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.category_times_text && e.category_times_text.indexOf("人查看") !== -1); // 过滤掉不需要的内容
}
else if ($request.url.includes("operation/banners")) {
    responseBody = { data: [] }; // 清空广告
}
else if ($request.url.includes("operation/features")) {
    responseBody = JSON.parse($response.body);
    // 过滤掉“小助手”相关的功能或无关内容
    responseBody.data = responseBody.data.filter(item => item.title !== "赏花地图" && item.title !== "小助手");
    responseBody.data.forEach(item => {
        if (item.icon_url === "path_to_unused_icon") {
            item.icon_url = "";
        }
    });
}
else if ($request.url.includes("campaigns")) {
    responseBody = { campaigns: [] }; // 清空活动内容
}
else if ($request.url.includes("notification/message_center")) {
    responseBody = { messages: [] }; // 清空通知（例如小助手通知）
}
else if ($request.url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] }; // 清空弹窗、行为等可能与“小助手”相关的内容
}
$done({ body: JSON.stringify(responseBody) });
