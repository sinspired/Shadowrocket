/*
//Caiyun.js

[rewrite_local]
hostname = *.cyapi.cn, *.caiyunapp.com
^https?:\/\/(biz|wrapper|starplucker)\.(cyapi|caiyunapp)\.(cn|com)\/(.+\/(operation\/banners)|p\/v\d\/(vip_info|user_info)) url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js
^https?:\/\/(api|wrapper)\.(cyapi|caiyunapp)\.(cn|com)\/v\d\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/refs/heads/main/Rewrite/Caiyun.js

[mitm]

*/

let response = {}, requestData = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const headers = Object.fromEntries(Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v]));

if (typeof $response == "undefined") {
} else {
  if (/banners|entries|friend_cards|trial_card\/info|req\?app_name=weather|conditions/.test(url)) {
    requestData = {};
  }
  response.body = JSON.stringify(requestData);
}
$done(response);
