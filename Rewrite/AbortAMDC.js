/*
# 阿里AMDC脚本
# 根据 User-Agent 判断请求来源，并修改匹配的请求的响应内容；
# 由向晚重写维护；

[rewrite_local]
^http:\/\/amdc\.m\.taobao\.com url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/AbortAMDC.js

*/

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var pattern = /(AMap|Cainiao|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|%E9%97%B2%E9%B1%BC|Alibaba|Hema4iPhone|Moon|DMPortal)/;
if (pattern.test(ua)) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
