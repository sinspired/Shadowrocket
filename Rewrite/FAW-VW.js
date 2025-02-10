/*
// 一汽大众
// 需卸载重装APP；

[rewrite_local]
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* url reject-200
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/recommend\/getRecommendInfoFlows\/v1\?.* url reject-200
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/FAW-VW.js

[mitm]
hostname = oneapp-api.faw-vw.com
*/

// 获取请求的 URL
const url = $request.url;

// 如果 URL 中包含 "showPositionCode=VWAPP"，才进行处理
if (/^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP/.test(url)) {
    try {
        // 从 URL 中获取 showPositionCode 参数
        const showPositionCode = new URL(url).searchParams.get('showPositionCode');

        // 指定需要处理的广告类型列表
        const adsToReject = [
            "VWAPP_ICE_OPEN_SCREEN_ADS",
            "VWAPP_MEB_OPEN_SCREEN_ADS",
            "VWAPP_ICE_HOME_BUOY",
            "VWAPP_MEB_HOME_BUOY",
            "VWAPP_ICE_HOME_OWNER_BANNER",
            "VWAPP_MEB_HOME_OWNER_BANNER",
            "VWAPP_ICE_HOME_KONGO",
            "VWAPP_MEB_HOME_KONGO",
            "VWAPP_ICE_HOME_CUSTOM_BANNER",
            "VWAPP_MEB_HOME_CUSTOM_BANNER",
            "VWAPP_ICE_HOME_CUSTOM_KONGO",
            "VWAPP_MEB_HOME_CUSTOM_KONGO",
            "VWAPP_ICE_HOME_PROSPECTS_BANNER",
            "VWAPP_MEB_HOME_PROSPECTS_BANNER",
            "VWAPP_ICE_CAR_ZHIHU_COLLEGE",
            "VWAPP_MEB_CAR_ZHIHU_COLLEGE"
        ];

        // 如果 showPositionCode 在指定列表中，则返回空的广告响应
        if (adsToReject.includes(showPositionCode)) {
            const jsonResponse = {
                "returnStatus": "SUCCEED",
                "total": 0,
                "pageNo": 1,
                "pageSize": 1,
                "hasMore": false,
                "data": []
            };
            $response.body = JSON.stringify(jsonResponse);
        }
    } catch (e) {
        // 解析失败时，不做任何修改
    }
}
