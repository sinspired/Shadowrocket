/*
// 一汽大众
// 需卸载重装APP；

[rewrite_local]
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* url reject-200
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/recommend\/getRecommendInfoFlows\/v1\?.* url reject-200
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.* url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/FAW-VW.js

[mitm]
hostname = oneapp-api.faw-vw.com
*/

var obj = JSON.parse($response.body);

if ($request.url.includes("ad/get")) {
    let adFields = ["banner", "popup", "recommend", "splash"];
    adFields.forEach(field => {
        if (obj.data?.[field]) {
            obj.data[field] = [];
        }
    });
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.includes("push/get_messages")) {
    if (obj.data?.messages) {
        obj.data.messages = obj.data.messages.filter(msg => !msg.type.includes("ad"));
    }
    $done({ body: JSON.stringify(obj) });
} else {
    $done({ body: JSON.stringify(obj) });
}
