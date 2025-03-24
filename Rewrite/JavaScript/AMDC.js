/*
# 阿里AMDC脚本
# 用于阿里系应用，拦截AMDC请求，并修改响应内容；
# 由向晚重写维护，生成器直接引用；
# 更新时间: 20250324
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/AMDC.js
*/

var ua = ($request.headers["User-Agent"] || $request.headers["user-agent"] || "").toLowerCase();
var pattern = /(?:amap|alibaba|cainiao|dmportal|hema4iphone|moon|喵街|天猫|闲鱼|飞猪旅行)/;
try {
    ua = decodeURIComponent(ua); 
} catch (e) {}
if (pattern.test(ua)) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
