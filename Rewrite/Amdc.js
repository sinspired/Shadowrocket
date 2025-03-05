/*
*/
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var pattern = /(AMap|Cainiao|%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C|%E5%96%B5%E8%A1%97|%E5%A4%A9%E7%8C%AB|%E9%97%B2%E9%B1%BC|Alibaba|Hema4iPhone|Moon|DMPortal)/;
if (pattern.test(ua)) {
    $done({ body: "SUCCEED" });
} else {
    $done({});
}
