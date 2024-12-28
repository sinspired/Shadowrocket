/*
// 高德地图
// 引用自：https://raw.githubusercontent.com/ddgksf2013/Rewrite/master/AdBlock/Amap.conf

[rewrite_local]

开屏广告
^https?://.*.amap.com/ws/valueadded/alimama/splash_screen url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

底部tab栏角标
^https?://.*.amap.com/ws/message/notice/list url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

路线规划下方广告
^https?://.*.amap.com/ws/faas/amap-navigation/card-service-route-plan? url reject-dict

首页右中广告
^https?://.*.amap.com/ws/shield/frogserver/aocs/updatable url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

附近页面
^https?://.*.amap.com/ws/shield/search/nearbyrec_smart url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

打车页面处理
^https?://.*.amap.com/ws/promotion-web/resource url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

Tip请求
^https?://.*.amap.com/ws/boss/order_web/\w{8}_information url reject-200

首页底部处理
^https?://.*.amap.com/ws/faas/amap-navigation/main-page url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

通用广告请求
^https?://.*.amap.com/ws/asa/ads_attribution url reject

首页顶部推广
^https?://.*.amap.com/ws/msgbox/pull url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

我的页面
^https?://.*.amap.com/ws/shield/dsp/profile/index/nodefaas url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

搜索框热词
^https?://.*.amap.com/ws/shield/search/new_hotword url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/amap.js

搜索框scene
^https?://.*.amap.com/ws/shield/scene/recommend url reject-dict

首页左上角gif
^https?://.*.amap.com/uploadimg/\w+.gif url reject-img

左下天气
^https?://.*.amap.com/ws/valueadded/weather url reject-dict

[mitm]
hostname = *.amap.com

*/


// 获取 User-Agent
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// 定义需要匹配的关键字或 URL 编码的关键字
var pattern = /(AMap|Cainiao|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|Alibaba|Hema4iPhone|Moon|DMPortal)/;

// 检查 User-Agent 是否匹配指定的关键字
if (pattern.test(ua)) {
    // 如果匹配到关键字，返回特定的响应体
    $done({ body: "adsblock" });
} else {
    // 如果没有匹配关键字，则正常完成请求
    $done({});
}

// 解析 $response.body 为 JSON 对象
var obj = JSON.parse($response.body);

// 如果请求 URL 包含 "valueadded/alimama/splash_screen"，处理开屏广告
if ($request.url.indexOf("valueadded/alimama/splash_screen") !== -1) {
    if (obj.data && obj.data.ad) {
        for (let ad of obj.data.ad) {
            // 设置广告的显示时间为 0
            ad.set.setting.display_time = 0;
            // 设置广告的开始和结束时间为未来的某个时间点（几乎不可能显示）
            ad.creative[0].start_time = 2240150400;
            ad.creative[0].end_time = 2240150400;
        }
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "faas/amap-navigation/main-page"，处理高德导航主页广告
} else if ($request.url.indexOf("faas/amap-navigation/main-page") !== -1) {
    if (obj.data?.cardList) {
        // 过滤只保留 "LoginCard" 和 "FrequentLocation" 类型的卡片
        obj.data.cardList = Object.values(obj.data.cardList).filter(a => 
            a.dataType === "LoginCard" || a.dataType === "FrequentLocation"
        );
    }
    if (obj.data?.pull3?.msgs) {
        // 清空消息列表
        obj.data.pull3.msgs = [];
    }
    if (obj.data?.business_position) {
        // 清空业务位置
        obj.data.business_position = [];
    }
    if (obj.data?.mapBizList) {
        // 清空地图业务列表
        obj.data.mapBizList = [];
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "profile/index/node"，处理用户个人主页节点
} else if ($request.url.indexOf("profile/index/node") !== -1) {
    // 删除提示数据
    delete obj.data.tipData;
    if (obj.data?.cardList) {
        // 过滤只保留 "MyOrderCard" 和 "GdRecommendCard" 类型的卡片
        obj.data.cardList = Object.values(obj.data.cardList).filter(a => 
            a.dataType === "MyOrderCard" || a.dataType === "GdRecommendCard"
        );
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "new_hotword"，清空热词
} else if ($request.url.indexOf("new_hotword") !== -1) {
    if (obj.data?.header_hotword) {
        obj.data.header_hotword = [];
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "ws/promotion-web/resource"，清空多种推广资源
} else if ($request.url.indexOf("ws/promotion-web/resource") !== -1) {
    let resourceTypes = ["icon", "banner", "tips", "popup", "bubble", "other"];
    for (let type of resourceTypes) {
        if (obj.data?.[type]) {
            obj.data[type] = [];
        }
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "ws/msgbox/pull"，清空消息列表
} else if ($request.url.indexOf("ws/msgbox/pull") !== -1) {
    if (obj.msgs) {
        obj.msgs = [];
    }
    if (obj.pull3?.msgs) {
        obj.pull3.msgs = [];
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "ws/message/notice/list"，清空通知列表
} else if ($request.url.indexOf("ws/message/notice/list") !== -1) {
    if (obj.data?.noticeList) {
        obj.data.noticeList = [];
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "ws/shield/frogserver/aocs"，屏蔽指定的配置项
} else if ($request.url.indexOf("ws/shield/frogserver/aocs") !== -1) {
    let keysToClear = [
        "gd_notch_logo", 
        "home_business_position_config", 
        "his_input_tip", 
        "operation_layer"
    ];
    for (let key of keysToClear) {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
        }
    }
    $done({ body: JSON.stringify(obj) });

// 如果请求 URL 包含 "search/nearbyrec_smart"，清除推荐信息
} else if ($request.url.indexOf("search/nearbyrec_smart") !== -1) {
    let fieldsToRemove = ["coupon", "scene", "activity", "commodity_rec", "operation_activity"];
    if (obj.data) {
        // 删除指定字段
        fieldsToRemove.forEach(field => {
            delete obj.data[field];
        });
        // 过滤模块列表，去除包含上述字段的模块
        if (obj.data.modules) {
            obj.data.modules = obj.data.modules.filter(module => 
                !fieldsToRemove.includes(module)
            );
        }
    }
    $done({ body: JSON.stringify(obj) });

// 默认情况下，直接返回数据
} else {
    $done({ body: JSON.stringify(obj) });
}
