// Shadowrocket 脚本：同时拦截 VWAPP_ICE_OPEN_SCREEN_ADS 和 VWAPP_MEB_OPEN_SCREEN_ADS 广告 API 请求，返回空数据
let url = $request.url;

// 判断请求中是否包含这两种广告类型的标识
if (url.includes("showPositionCode=VWAPP_ICE_OPEN_SCREEN_ADS") || url.includes("showPositionCode=VWAPP_MEB_OPEN_SCREEN_ADS")) {
    // 返回空数据，避免广告加载
    let emptyResponse = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [] }) // 返回空的广告数据
    };
    $done(emptyResponse);  // 返回修改后的响应
} else {
    $done({});
}
