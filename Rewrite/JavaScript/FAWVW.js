/*
# 一汽大众
# 一汽大众应用净化；
# 由向晚制作维护；
# 更新时间: 20250421
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/FAWVW.js

[rewrite_local]
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/benefits\/benefitsCard\/getInfo\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/(recommend\/getRecommendInfoFlows|customize\/getCustomizePageName)\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_((ICE|MEB)_(OPEN_SCREEN_ADS|HOME_OWNER_BANNER|HOME_KONGO|HOME_CUSTOM_BANNER|HOME_CUSTOM_KONGO|HOME_PROSPECTS_BANNER|CAR_ZHIHU_COLLEGE)|HOME_BUOY) url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js

[mitm]
hostname = oneapp-api.faw-vw.com
*/

try {
    const jsonResponse = {
        returnStatus: "SUCCEED",
        hasMore: false,
        data: []
    };
    const responseBody = JSON.stringify(jsonResponse);
    const responseHeaders = {
        "Content-Type": "application/json"
    };
    $done({
        status: 200,
        body: responseBody,
        headers: responseHeaders
    });
} catch (e) {
    $done();
}
