/*
//彩云天气

[rewrite_local]
# > 图层推广@ddgksf2013
^https?:\/\/wrapper\.cyapi\.cn\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 活动推广@ddgksf2013
^https?:\/\/api\.caiyunapp\.com\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 首页顶部推广@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/homefeatures url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > SVIP提醒推广@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/notification/message_center url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 雨季特惠提醒@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/config/cypage url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 发现页信息流推荐@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/feeds url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 发现页banners@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/banners url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 发现页中间部分@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/features url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 发现页活动@ddgksf2013
^https?:\/\/starplucker\.cyapi\.cn\/v\d/campaigns url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
# > 通用广告请求@ddgksf2013
^https?:\/\/ad\.cyapi\.cn\/v\d url reject-200

[mitm]
hostname =  wrapper.cyapi.cn, api.caiyunapp.com, starplucker.cyapi.cn, ad.cyapi.cn
*/

let responseBody = {};

// 判断请求 URL 是否包含 "/v2/user"
if ($request.url.includes("/v2/user")) {
    responseBody = JSON.parse($response.body);
    
    // 修改响应中的 VIP 状态信息
    responseBody.result.is_vip = 1;
    responseBody.result.svip_expired_at = 1892260800; // 设置过期时间
    responseBody.result.wt.vip.expired_at = 1892260800; // 设置过期时间
    responseBody.result.svip_take_effect = 1;
    responseBody.result.vip_type = "s"; // 设置 VIP 类型为 "s"
}
// 判断请求 URL 是否包含 "user_detail"
else if ($request.url.includes("user_detail")) {
    responseBody = JSON.parse($response.body);
    
    // 遍历 vip_info 中的 svip 和 vip 项，设置过期时间和自动续费
    ["svip", "vip"].forEach(e => {
        if (responseBody.vip_info[e]) {
            responseBody.vip_info[e] = {
                expires_time: "1892260800", // 设置过期时间
                is_auto_renewal: true // 设置自动续费为 true
            };
        }
    });
}
// 判断请求 URL 是否包含 "activity"
else if ($request.url.includes("activity")) {
    // 根据 type_id 判断返回不同的活动内容
    if ($request.url.includes("type_id=A03")) {
        responseBody = {
            status: "ok",
            activities: [
                { type: "tabbar", name: "aichat", feature: false }
            ]
        };
    } else {
        responseBody = {
            status: "ok",
            activities: [
                { items: [{}] }
            ]
        };
    }
}
// 判断请求 URL 是否包含 "operation/homefeatures"
else if ($request.url.includes("operation/homefeatures")) {
    responseBody = { data: [] }; // 返回空的 homefeatures 数据
}
// 判断请求 URL 是否包含 "operation/feeds"
else if ($request.url.includes("operation/feeds")) {
    responseBody = JSON.parse($response.body);
    // 过滤出 category_times_text 中包含 "人查看" 的数据
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);
}
// 判断请求 URL 是否包含 "operation/banners"
else if ($request.url.includes("operation/banners")) {
    responseBody = {
        data: [] // 返回空的广告横幅数据，避免显示任何广告
    };
}
// 判断请求 URL 是否包含 "operation/features"
else if ($request.url.includes("operation/features")) {
    responseBody = JSON.parse($response.body);
    
    // 过滤掉无效的条目（如“赏花地图”图标和其他不需要的条目）
    responseBody.data = responseBody.data.filter(item => {
        // 过滤掉包含 "赏花地图" 的条目
        return item.title !== "赏花地图" && (item.icon_url && item.icon_url !== "");
    });

    // 如果有图标链接，清空无效的字段
    responseBody.data.forEach(item => {
        if (item.icon_url === "path_to_unused_icon") {
            item.icon_url = "";  // 清空无效的图标链接
        }
    });
}
// 判断请求 URL 是否包含 "campaigns"
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
// 判断请求 URL 是否包含 "notification/message_center"
else if ($request.url.includes("notification/message_center")) {
    responseBody = { messages: [] }; // 返回空的消息数据
}
// 判断请求 URL 是否包含 "config/cypage"
else if ($request.url.includes("config/cypage")) {
    responseBody = { popups: [], actions: [] }; // 返回空的弹窗和动作数据
}

// 最终返回修改后的响应体
$done({ body: JSON.stringify(responseBody) });
