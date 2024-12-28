[rewrite_local]
# 拒绝 UDP 连接
^https?:\/\/([\w-]+\.)?googlevideo\.com\/.* url reject-dict
^https?:\/\/youtubei\.googleapis\.com\/.* url reject-dict

# YouTube API 响应处理
^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(browse|next|player|search|reel\/reel_watch_sequence|guide|account\/get_setting|get_watch) url script-response-body https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.response.preview.js

# 处理广告请求
^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&oad url reject-200

[mitm]
hostname = *.googlevideo.com, youtubei.googleapis.com


  
[Rule]
AND,((DOMAIN-SUFFIX,googlevideo.com),(PROTOCOL,UDP)),REJECT
AND,((DOMAIN,youtubei.googleapis.com),(PROTOCOL,UDP)),REJECT

[URL Rewrite]
^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&oad - reject-200

[Script]
youtube =type=http-response,pattern=^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(browse|next|player|search|reel\/reel_watch_sequence|guide|account\/get_setting|get_watch),script-path=https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.response.preview.js,requires-body=true,binary-body-mode=true,max-size=-1,argument='{{"blockUpload":true,"blockImmersive":true,"debug":false}}'

[MITM]
hostname = %APPEND% *.googlevideo.com, youtubei.googleapis.com
