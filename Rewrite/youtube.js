[rewrite_local]
^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&oad url reject-200

^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(browse|next|player|search|reel\/reel_watch_sequence|guide|account\/get_setting|get_watch) url script-response-body https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.response.preview.js

[mitm]
hostname = *.googlevideo.com, youtubei.googleapis.com
