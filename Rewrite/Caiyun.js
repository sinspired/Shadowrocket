/*
//彩云天气

[rewrite_local]
^https?:\/\/(biz|wrapper|starplucker)\.(cyapi|caiyunapp)\.(cn|com)\/(.+\/(user\?app_name|activity\?app_name|visitors|operation\/banners|operation\/homefeatures|config)|p\/v\d\/(vip_info|user_info|entries|privileges|trial_card\/info)) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/caiyuntianqi.js
^https?:\/\/(api|wrapper)\.(cyapi|caiyunapp)\.(cn|com)\/v\d\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/chxm1023/Rewrite/main/caiyuntianqi.js

[mitm]
hostname =  *.cyapi.cn, *.caiyunapp.com, adx.sogaha.cn
*/

