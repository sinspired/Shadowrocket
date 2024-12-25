// 处理 /operation/banners 请求，返回空的广告数据
else if ($request.url.includes("operation/banners")) {
    responseBody = {
        data: []  // 返回空数组，表示没有条幅广告
    };
}

// 处理 /activity 请求，去掉小助手（aichat）相关内容
else if ($request.url.includes("activity")) {
    if ($request.url.includes("type_id=A03")) {
        // 返回空的活动数据，去掉小助手相关内容
        responseBody = {
            status: "ok",
            activities: []  // 返回空的活动列表，表示没有小助手相关活动
        };
    } else {
        // 返回其他活动数据，这里保留空白或其他内容
        responseBody = {
            status: "ok",
            activities: [{
                items: [{}]
            }]
        };
    }
}
