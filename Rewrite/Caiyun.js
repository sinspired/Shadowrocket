/*
//Caiyun.js

[rewrite_local]
^https:\/\/wrapper\.cyapi\.cn\/v1\/activity\? url reject-dict
^https:\/\/api\.caiyunapp\.com\/v1\/activity\? url reject-dict
^https:\/\/biz\.cyapi\.cn\/(p\/v1\/vip_info|v2\/user) url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js

[mitm]
hostname = *.cyapi.cn

*/

const url = $request.url;
let obj = JSON.parse($response.body);
if (url.includes("/api.caiyunapp.com/v1/activity")) {
  if (url.includes("&type_id=A03&")) {
    // 底栏控制项目 主页图标 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      for (let item of obj.activities) {
        if (item?.name && item?.type && item?.feature) {
          item.feature = false;
        }
      }
    }
  } else {
    // 其他请求
    obj = { status: "ok", activities: [{ items: [] }] };
  }
} else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
  // 彩云推广
  if (["&type_id=A03&"]?.includes(url)) {
    // 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      obj.activities = [];
    }
  } else {
    // 其他请求
    obj = { status: "ok", activities: [{ items: [] }] };
  }
}
$done({ body: JSON.stringify(obj) });
