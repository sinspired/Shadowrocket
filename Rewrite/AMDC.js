/*
# 阿里AMDC脚本
# 根据 User-Agent 判断请求来源，并修改匹配的请求的响应内容；
# 由向晚重写维护，生成器直接引用；
# 更新时间: 20250306
*/
/*
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var pattern = /(AMap|Alibaba|Cainiao|DMPortal|Hema4iPhone|Moon|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|%E9%97%B2%E9%B1%BC|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C)/;
if (pattern.test(ua)) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
*/

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var pattern = /(AMap|Alibaba|Cainiao|DMPortal|Hema4iPhone|Moon|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|%E9%97%B2%E9%B1%BC|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C)/;
if (pattern.test(decodeURIComponent(ua))) {
    $done({ response: { status: 403, body: "Forbidden" } });
} else {
    $done({});
}
