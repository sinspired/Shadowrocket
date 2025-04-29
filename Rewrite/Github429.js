/*
# 暂时修复Github 429错误;
# 由向晚制作维护；
# 更新时间: 20250429
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Github429.js

[rewrite_local]
^https:\/\/(raw|gist)\.githubusercontent\.com\/ url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Github429.js
^https:\/\/github\.com\/ url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Github429.js

[mitm]
hostname = raw.githubusercontent.com,gist.githubusercontent.com,github.com

*/

if ($request && $request.headers) {
    const headers = $request.headers;
    headers['Accept-Language'] = 'en-us';
    $done({ headers });
  } else {
    $done({});
  }

