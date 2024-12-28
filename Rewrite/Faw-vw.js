/*
// 一汽大众
// 去开屏广告

[rewrite_local]
^https?:\/\/one-app-h5\.faw-vw\.com\/prod-api\/mobile\/one-app\/general\/public\/v1\/official_activity\/get_animation_putaway_list\?appkey.* url reject-200
^https?:\/\/one-app-h5\.faw-vw\.com\/prod-api\/mobile\/one-app\/general\/public\/v1\/first_page\/get_carousel_list?appkey.* url reject-200

[mitm]
hostname = one-app-h5.faw-vw.com
*/
