// 获取响应体数据
var obj = JSON.parse($response.body);

// 处理广告请求，根据 URL 来判断是否是广告请求
if ($request.url.indexOf("getBoothList") !== -1) {
    // 如果返回的数据包含广告，清空广告数据
    if (obj.data && obj.data.ads) {
        obj.data.ads = [];  // 删除广告数据
    }
    // 这里可以做其他字段处理，例如清除缓存相关的数据
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("MEB_OPEN_SCREEN_ADS") !== -1) {
    // 处理针对特定广告的请求
    if (obj.data && obj.data.ad) {
        obj.data.ad = obj.data.ad.filter(ad => {
            ad.set.setting.display_time = 0;  // 设置广告的展示时间为无效
            ad.creative[0].start_time = 2240150400;  // 广告开始时间
            ad.creative[0].end_time = 2240150400;    // 广告结束时间
            return false;  // 删除广告
        });
    }
    $done({ body: JSON.stringify(obj) });
} else {
    // 其他请求，不做任何处理
    $done({ body: JSON.stringify(obj) });
}
