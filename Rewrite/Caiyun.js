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
    responseBody = { data: [] };  // 清空小助手相关功能
}
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);  // 保留有用数据
}
else if ($request.url.includes("operation/banners")) {
    responseBody = { data: [] };  // 强制清除广告横幅
}
else if ($request.url.includes("operation/features")) {
    responseBody = JSON.parse($response.body);
    // 清理不需要的特性，特别是与小助手相关的UI组件
    responseBody.data = responseBody.data.filter(item => item.title !== "赏花地图" && (item.icon_url && item.icon_url !== ""));
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
    };  // 自定义广告，去除小助手广告
}
else if ($request.url.includes("notification/message_center")) {
    responseBody = { messages: [] };  // 清空消息
}
else if ($request.url.includes("config/cypage")) {
    responseBody = {
        popups: [],  // 清除弹窗
        actions: []  // 清除操作按钮
    };
}

// 检查是否有底部小助手按钮的数据，需要处理
if ($request.url.includes("wrapper.cyapi.cn") || $request.url.includes("api.caiyunapp.com")) {
    // 强制删除或清除与小助手相关的按钮或数据
    responseBody = JSON.parse($response.body);
    // 假设有`assistant`或类似字段表示小助手
    if (responseBody && responseBody.data && responseBody.data.some(item => item.title === "小助手")) {
        responseBody.data = responseBody.data.filter(item => item.title !== "小助手");
    }
}

$done({ body: JSON.stringify(responseBody) });
