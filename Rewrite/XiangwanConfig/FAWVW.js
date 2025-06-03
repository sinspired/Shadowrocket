/*
# 一汽大众
# 一汽大众应用净化；
# 由向晚制作维护；

# 更新时间: 20250603
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/XiangwanConfig/FAWVW.js

[rewrite_local]
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/benefits\/benefitsCard\/getInfo\/v1\?.* url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/(recommend\/getRecommendInfoFlows|customize\/getCustomizePageName)\/v1\?.* url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_HOME_BUOY url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_OPEN_SCREEN_ADS url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_CAR_ZHIHU_COLLEGE url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_(OWNER_BANNER|PROSPECTS_BANNER|CUSTOM_BANNER|KONGO|CUSTOM_KONGO) url script-response-body https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/FAWVW.js

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
