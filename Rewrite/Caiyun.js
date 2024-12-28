/*
//彩云天气

[rewrite_local]
^https:\/\/biz\.cyapi\.cn\/(p\/v1\/entries|p\/v1\/trial_card\/info|v2\/product) url reject-dict
^https:\/\/starplucker\.cyapi\.cn\/v3\/(config\/cypage\/\w+\/conditions|notification\/message_center|operation\/homefeatures) url reject-dict
^https:\/\/api\.caiyunapp\.com\/v1\/activity\? url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
^https:\/\/wrapper\.cyapi\.cn\/v1\/activity\? url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js

[mitm]
hostname = api.caiyunapp.com, *.cyapi.cn
*/

if (url.includes("/api.caiyunapp.com/v1/activity")) {
    if (url.includes("&type_id=A03&")) {
        if (obj?.interval) {
            obj.interval = 2592000; // 30天 === 2592000秒
        }
        if (obj?.activities?.length > 0) {
            obj.activities = obj.activities.filter(item => !item?.name?.includes('彩云AI'));
        }
    }
} else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
    if (obj?.activities) {
        obj.activities = [];
    }
}
