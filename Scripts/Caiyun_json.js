let chxm1024 = {}, chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const headers = Object.fromEntries(Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v]));

if (typeof $response == "undefined") {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps';
  chxm1024.headers = { ...headers, 'device-token': token };
  if (headers['app-version'] > '7.19.0') { chxm1024.headers['authorization'] = `Bearer ${token}`; }
} else {
  const data = { "is_auto_renewal": true, "expires_time": 4092599349 };
  if (/banners|entries|friend_cards|trial_card\/info|req\?app_name=weather|conditions/.test(url)) {
    chxm1023 = {};
  }
  if (/user\?app_name/.test(url)) {
    chxm1023.result = { ...chxm1023.result, "is_vip": true, "vip_expired_at": 4092599349, "svip_given": 1, "is_xy_vip": true, "xy_svip_expire": 4092599349, "wt": { ...chxm1023.result.wt, "vip": { ...chxm1023.result.wt.vip, "expired_at": 0, "enabled": true, "svip_apple_expired_at": 4092599349, "is_auto_renewal": true, "svip_expired_at": 4092599349 }, "svip_given": 1 }, "vip_take_effect": 1, "xy_vip_expire": 4092599349, "svip_expired_at": 4092599349, "svip_take_effect": 1, "vip_type": "s" };
  }
  if (/user_detail/.test(url)) {
    chxm1023.vip_info.show_upcoming_renewal = false;
    chxm1023.vip_info.svip = data;
  }
  if (/vip_info/.test(url)) {
    chxm1023.show_upcoming_renewal = false;
    chxm1023.svip = data;
  }
  if (/features|homefeatures/.test(url)) {
    chxm1023["data"] = [{  "badge_type" : "",  "title" : "叮当猫",  "url" : "https://t.me/chxm1023",  "feature_type" : "",  "avatar" : "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm2.png"  },...chxm1023.data];
  }
  chxm1024.body = JSON.stringify(chxm1023);
}

if (/activity\?app_name/.test(url)) {
  chxm1024.body = headers['app-version'] < '7.20.0'  ? '{"status":"ok","activities":[{"items":[{}]}]}'  : '{"status":"ok","activities":[]}';
}
$done(chxm1024);
