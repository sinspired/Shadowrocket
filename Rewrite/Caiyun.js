/*
// 彩云天气Pro
// 仅作去广告处理，去除广告，去除“小助手”；

[rewrite_local]
^https?:\/\/ad\.cyapi\.cn\/v\d url reject-200
^https?:\/\/wrapper\.cyapi\.cn\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/api\.caiyunapp\.com\/v\d\/activity url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/homefeatures url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/notification/message_center url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/config/cypage url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/feeds url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/banners url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/operation/features url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js
^https?:\/\/starplucker\.cyapi\.cn\/v\d/campaigns url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Caiyun.js

[mitm]
hostname = wrapper.cyapi.cn, api.caiyunapp.com, starplucker.cyapi.cn, ad.cyapi.cn
*/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes("/activity")) {
    // 彩云推广
    if (["&type_id=A03&"]?.includes(url)) {
      // 彩云AI
      if (obj?.interval) {
        obj.interval = 2592000; // 30天===2592000秒
      }
      if (obj?.activities?.length > 0) {
        let newActs = [];
        for (let item of obj.activities) {
          if (item?.type === "tabbar" && item?.feature) {
            item.feature = false;
          } else {
            continue;
          }
          newActs.push(item);
        }
        obj.activities = newActs;
      }
    } else {
      // 其他请求
      obj = {
        status: "ok",
        interval: 2592000,
        id: "1",
        activities: [
          {
            items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
            type: "activity_icon",
            name: "",
            carousel: "5000"
          }
        ]
      };
    }
}
$done({ body: JSON.stringify(obj) });
