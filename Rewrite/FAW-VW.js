var obj = JSON.parse($response.body);

// 根据 URL 匹配不同广告请求，删除广告相关数据
if ($request.url.indexOf("getBoothList") !== -1) {
    if (obj.data && obj.data.ads) {
        obj.data.ads = [];  // 删除广告相关数据
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("splash_screen") !== -1) {
    if (obj.data && obj.data.ad) {
        obj.data.ad = obj.data.ad.filter(ad => {
            ad.set.setting.display_time = 0;
            ad.creative[0].start_time = 2240150400;  // 广告展示时间设置为无效时间
            ad.creative[0].end_time = 2240150400;
            return false;  // 不显示广告
        });
    }
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf("main-page") !== -1) {
    // 删除广告数据
    if (obj.data?.cardList) {
        obj.data.cardList = Object.values(obj.data.cardList).filter(card =>
            card.dataType !== "AdCard"  // 只保留非广告卡片
        );
    }
    $done({ body: JSON.stringify(obj) });
} else {
    $done({ body: JSON.stringify(obj) });
}
