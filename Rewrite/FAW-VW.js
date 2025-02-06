#!name=测试模块
#!desc=一汽大众去广告

[URL Rewrite]
# 拒绝开屏广告请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/.*Code=VWAPP_(ICE|MEB)_OPEN_SCREEN_ADS - reject-200

# 拒绝车主广告横幅请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_OWNER_BANNER - reject-200

# 拒绝KONGO广告请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_KONGO - reject-200

# 拒绝浮动广告请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_HOME_BUOY - reject-200

# 拒绝潜在客户广告横幅请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_(ICE|MEB)_HOME_PROSPECTS_BANNER - reject-200

# 拒绝推荐信息流请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/recommend\/getRecommendInfoFlows\/v1\?.* - reject-200

# 拒绝搜索提示列表请求
^https?:\/\/oneapp-api\.faw-vw\.com\/search\/firstPage\/getPromptList\/v1\?.* - reject-200

# 拒绝智虎学院广告请求
^https?:\/\/oneapp-api\.faw-vw\.com\/content\/booth\/getBoothList\/v1\?.*showPositionCode=VWAPP_MEB_CAR_ZHIHU_COLLEGE - reject-200

[MITM]
hostname = %APPEND% oneapp-api.faw-vw.com,
