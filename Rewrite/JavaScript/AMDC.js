/*
# 阿里AMDC脚本
# 用于阿里系应用，拦截AMDC请求，并修改响应内容；
# 由向晚重写维护，生成器直接引用；
# 更新时间: 20250421
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/AMDC.js
# 生成器写法：
# AMDC.js =type=http-response, pattern=^https?:\/\/amdc\.m\.taobao\.com, script-path=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/AMDC.js, requires-body=true, max-size=0
*/

var ua = ($request.headers["User-Agent"] || $request.headers["user-agent"] || "").toLowerCase();
var url = $request.url;
var uaPattern = /(?:amap|alibaba|cainiao|dmportal|hema4iphone|moon|%E5%96%B5%E8%A1%97|%E5%A4%A7%E9%BA%A6|%E5%A4%A9%E8%8B%97|%E9%97%B2%E9%B1%BC|%E9%A3%9E%E7%8C%AA)/;
var appkeyPattern = /(?:23782110)/;
var appkeyMatch = url.match(/appkey=(\d+)/);
var appkey = appkeyMatch ? appkeyMatch[1] : "";
if (uaPattern.test(ua) || appkeyPattern.test(appkey)) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
