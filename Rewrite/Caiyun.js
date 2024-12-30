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
const isQuanX = typeof $task !== "undefined";
let header = $request.headers;

if (typeof $response === "undefined") {
  const cyTK = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps";
  header["device-token"] = cyTK;
  if (compareVersions(header.version, "7.19.0") > 0) {
    if (isQuanX) {
      header["Authorization"] = "Bearer " + cyTK;
    } else {
      header["authorization"] = "Bearer " + cyTK;
    }
  }
  $done({ headers: header });
} else {
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
            item.feature = false;  // 去掉广告和推荐功能
          }
        }
      }
    } else {
      // 其他请求，清空广告活动
      obj = { status: "ok", activities: [{ items: [] }] };
    }
  } else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
    // 彩云推广广告屏蔽
    if (["&type_id=A03&"].includes(url)) {
      // 天气助手 彩云ai
      if (obj?.interval) {
        obj.interval = 2592000; // 30天===2592000秒
      }
      if (obj?.activities?.length > 0) {
        obj.activities = [];  // 清除广告活动
      }
    } else {
      // 其他请求，清空活动
      obj = { status: "ok", activities: [{ items: [] }] };
    }
  } else if (url.includes("/v1/vip_info") || url.includes("/v2/user")) {
    // 不做VIP相关修改，保持原始状态
    // 仅处理广告相关部分
    // 不做任何VIP相关处理
  }
  
  // 继续返回广告屏蔽后的数据
  $done({ body: JSON.stringify(obj) });
}

function compareVersions(t, r) {
  const e = t.split(".").map(Number);
  const n = r.split(".").map(Number);
  for (let t = 0; t < Math.max(e.length, n.length); t++) {
    const r = e[t] || 0;
    const i = n[t] || 0;
    if (r > i) return 1;
    if (r < i) return -1;
  }
  return 0;
}
