let responseBody = {};

if ($request.url.includes("activity")) {
    // 只返回相关活动信息，去除广告部分
    if ($request.url.includes("type_id=A03")) {
        responseBody = {
            status: "ok",
            activities: [
                {
                    type: "tabbar",
                    name: "aichat",
                    feature: false
                }
            ]
        };
    } else {
        responseBody = {
            status: "ok",
            activities: [
                {
                    items: [{}]  // 保证只返回正常活动项
                }
            ]
        };
    }
} else if ($request.url.includes("operation/homefeatures")) {
    // 仅去除首页顶部的广告数据，不影响正常内容
    responseBody = {
        data: []  // 不修改首页顶部的广告数据
    };
} else if ($request.url.includes("operation/feeds")) {
    // 保留需要的推荐项，移除广告
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.category_times_text.indexOf("人查看") !== -1);  // 保留有效推荐项
} else if ($request.url.includes("operation/banners")) {
    // 只修改返回的数据，确保去除广告并返回一个有效的图片链接
    responseBody = {
        data: [
            {
                avatar: "https://cdn-w.caiyunapp.com/p/app/operation/prod/banner/668502d5c3a2362582a2a5da/d9f198473e7f387d13ea892719959ddb.jpg",
                url: "https://cdn-w.caiyunapp.com/p/app/operation/prod/article/66850143c3a2362582a2a5d9/index.html",
                title: "暴雨来袭，这些避险“秘籍”你学会了吗？",
                banner_type: "article"
            }
        ]
    };
} else if ($request.url.includes("operation/features")) {
    // 只保留有效内容，不影响其他非广告内容，特别是防止误修改地图或其他重要部分
    responseBody = JSON.parse($response.body);
    responseBody.data = responseBody.data.filter(e => e.url.indexOf("cy://") !== -1);  // 仅过滤有效链接
} else if ($request.url.includes("campaigns")) {
    // 返回正常的广告活动信息，避免影响其他功能
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
} else if ($request.url.includes("notification/message_center")) {
    // 清空通知信息，防止广告推送
    responseBody = {
        messages: []
    };
} else if ($request.url.includes("config/cypage")) {
    // 清空弹窗和动作，防止广告干扰
    responseBody = {
        popups: [],
        actions: []
    };
}

// 返回修改后的数据
$done({ body: JSON.stringify(responseBody) });
