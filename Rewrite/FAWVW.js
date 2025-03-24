/*
# 一汽大众
# 一汽大众应用净化；
# 由向晚制作维护；
# 更新时间: 20250316
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/FAWVW.js

[rewrite_local]
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/benefits\/benefitsCard\/getInfo\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/recommend\/getRecommendInfoFlows\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/customize\/getCustomizePageName\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_HOME_BUOY url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_OPEN_SCREEN_ADS url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_OWNER_BANNER url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_KONGO url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_CUSTOM_BANNER url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_CUSTOM_KONGO url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_PROSPECTS_BANNER url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_CAR_ZHIHU_COLLEGE url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/FAWVW.js

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
