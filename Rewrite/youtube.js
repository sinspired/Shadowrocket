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
