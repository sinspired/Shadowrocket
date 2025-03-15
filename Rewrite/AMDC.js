/*
# 阿里AMDC脚本
# 根据 User-Agent 判断请求来源，并修改匹配的请求的响应内容；
# 由向晚重写维护，生成器直接引用；
# 更新时间: 20250306
*/

var ua = ($request.headers["User-Agent"] || $request.headers["user-agent"] || "").toLowerCase();
var pattern = /(amap|alibaba|cainiao|dmportal|hema4iphone|moon|喵街|天猫|闲鱼|飞猪旅行)/;
if (pattern.test(decodeURIComponent(ua))) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
