/***********************************

> ScriptName        知乎净化助手2.0[墨鱼版]
> Author            @ddgksf2013
> ForHelp           APP内哪里还有广告，请发邮件告知
> WechatID          墨鱼手记
> Contributor       @blackmatrix7, @paynexss
> TgChannel         https://t.me/ddgksf2021
> Contribute        https://t.me/ddgksf2013_bot
> Feedback          📮 ddgksf2013@163.com 📮
> UpdateTime        2024-12-01
> Suitable          自行观看“# > ”注释内容
> Attention         如需引用请注明出处，谢谢合作！
> ScriptURL         https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js


[rewrite_local]

# > 知乎_拦截DNS解析@blackmatrix7
^https?:\/\/118\.89\.204\.198 url reject-200
^https?:\/\/103\.41\.167\.237 url reject-200
^https?:\/\/2402:4e00:1200:ed00:0:9089:6dac:96b6 url reject-200

# > 知乎_屏蔽远程配置@blackmatrix7
^https?:\/\/api\.zhihu\.com\/ab\/api\/v1\/products\/zhihu\/platforms\/ios\/config url reject-200

# > 知乎_我的页面开通会员CARD@ddgksf2013
^https?:\/\/api\.zhihu\.com\/unlimited/go/my_card url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_开屏广告@ddgksf2013
^https?:\/\/api\.zhihu\.com\/commercial_api.*launch_v2 url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_品牌提问广告@blackmatrix7
^https?:\/\/api\.zhihu\.com\/brand\/question\/\d+/card\? url reject-dict
^https?:\/\/www\.zhihu\.com\/api\/v\d+\/brand\/question/\d+/card\? url reject-dict

# > 知乎_去除底部标签页关注人角标@blackmatrix7
^https?:\/\/api\.zhihu\.com\/moments\/tab_v2 url reject-dict

# > 知乎_去除消息通知角标@blackmatrix7
^https?:\/\/api\.zhihu\.com\/(notifications\/v\d\/count) url reject-dict

# > 知乎_拦截回答下的卡片广告@blackmatrix7
^https?:\/\/www\.zhihu\.com\/api\/v\d\/answers\/\d+\/recommendations url reject-dict

# > 知乎_拦截应用内弹窗@blackmatrix7
^https?:\/\/api\.zhihu\.com\/me\/guides url reject-dict

# > 知乎_去除关注页最常访问@blackmatrix7
^https?:\/\/api\.zhihu\.com\/moments\/recent url reject-dict

# > 知乎_拦截推荐页顶部广告@blackmatrix7
^https?:\/\/api\.zhihu\.com\/api\/v4\/ecom_data\/config url reject-dict

# > 知乎_底栏加号的广告@blackmatrix7
^https?:\/\/api\.zhihu\.com\/content-distribution-core\/bubble\/common\/settings url reject-dict

# > 知乎_推荐页搜索栏左侧图标@blackmatrix7
^https?:\/\/api\.zhihu\.com\/feed\/render\/revisit\/current_reading url reject-dict

# > 知乎_疑似推荐页内容更新红点@blackmatrix7
^https?:\/\/api\.zhihu\.com\/feed\/render\/revisit\/tag_config url reject-dict

# > 知乎_暂不清楚作用@blackmatrix7
^https?:\/\/api\.zhihu\.com\/commercial_api url reject-dict
^https?:\/\/api\.zhihu\.com\/ad-style-service\/request url reject

# > 知乎_用户信息@ddgksf2013
^https?:\/\/api\.zhihu\.com\/people/self$ url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_文章页去除底部广告@blackmatrix7
^https?:\/\/www\.zhihu\.com\/api\/v\d\/articles\/\d+\/recommendation url reject-dict

# > 知乎_推荐信息流去广告@ddgksf2013
^https?:\/\/api\.zhihu\.com\/topstory\/recommend url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_搜索页去除推广@ddgksf2013
^https?:\/\/api\.zhihu\.com\/search\/preset_words url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_猜你想搜下面条目['猜你想搜'四个字无法去除]@ddgksf2013
^https?:\/\/api\.zhihu\.com\/search\/recommend_query url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_删除会员页面会员购@ddgksf2013
^https?:\/\/api\.zhihu\.com\/bazaar\/vip_tab\/tabs url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_热榜页去除广告@ddgksf2013
^https?:\/\/api\.zhihu\.com\/v2\/topstory\/hot-lists url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_我的页面下方内容@ddgksf2013
^https?:\/\/api\.zhihu\.com\/api\/v4\/profile\/cards url reject-dict

# > 知乎_会员页面顶部处理@ddgksf2013
^https?:\/\/api\.zhihu\.com\/bazaar\/vip_tab\/header url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_热榜页去除直播@ddgksf2013
^https?:\/\/api\.zhihu\.com\/drama\/hot-drama-list url reject

# > 知乎_回答信息流去广告@ddgksf2013
^https?:\/\/api\.zhihu\.com\/next-data url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js
^https?:\/\/api\.zhihu\.com\/next-render url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_回答页面顶部推广@ddgksf2013
^https?:\/\/www\.zhihu\.com\/api\/v4\/topics\/rank_list\/question\/\d+\/related url reject

# > 知乎_问题回答列表@ddgksf2013
^https?:\/\/api\.zhihu\.com\/(v4\/)?questions\/\d+\/feeds url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_回答内容优化@ddgksf2013
^https?:\/\/www\.zhihu\.com\/appview\/v2\/answer\/ url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_会员页面购物处理@ddgksf2013
^https?:\/\/api\.zhihu\.com\/bazaar\/vip_tab\/modules url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_修改用户盐值@blackmatrix7
^https?:\/\/api\.zhihu\.com\/user-credit\/basis url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_消息页@blackmatrix7
^https?:\/\/api\.zhihu\.com\/notifications\/v3\/(message|timeline\/entry\/system_message) url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_首页右下角悬浮窗@blackmatrix7
^https?:\/\/api\.zhihu\.com\/commercial_api\/app_float_layer url reject

# > 知乎_关注页面去除今日话题和为您推荐@ddgksf2013
^https?:\/\/api\.zhihu\.com\/moments_v3 url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

# > 知乎_回答页面相关搜索词@ddgksf2013
^https?:\/\/www\.zhihu\.com\/api\/v4\/search\/related_queries\/answer\/ url reject-dict

# > 知乎_首页左侧图标@ddgksf2013
^https?:\/\/api\.zhihu\.com\/root\/window url reject-dict

# > 知乎_我的页面底部@ddgksf2013
^https?:\/\/www\.zhihu\.com\/appview\/v\d\/zhmore url reject-200

# > 知乎_搜索发现@ddgksf2013
https://api.zhihu.com/search/hot_search url script-response-body https://gist.githubusercontent.com/ddgksf2013/d43179d848586d561dbb968dee93bae8/raw/Zhihu.Adblock.js

[mitm] 

hostname = 118.89.204.198,103.41.167.237,2402:4e00:1200:ed00:0:9089:6dac:96b6,www.zhihu.com,api.zhihu.com,zhuanlan.zhihu.com,appcloud2.zhihu.com,m-cloud.zhihu.com,103.41.167.236,103.41.167.234,103.41.167.235,103.41.167.226


***********************************/






const version = 'V1.0.74';


var _0xodZ='jsjiami.com.v7';const _0x1664d3=_0x614e;if(function(_0x5633c1,_0xe53e97,_0x41cc51,_0x33e015,_0x3337e4,_0x36070b,_0x1ad978){return _0x5633c1=_0x5633c1>>0x3,_0x36070b='hs',_0x1ad978='hs',function(_0x1bc01a,_0x178dc2,_0x449ce2,_0x4323f9,_0x3ee0b8){const _0x2b88e2=_0x614e;_0x4323f9='tfi',_0x36070b=_0x4323f9+_0x36070b,_0x3ee0b8='up',_0x1ad978+=_0x3ee0b8,_0x36070b=_0x449ce2(_0x36070b),_0x1ad978=_0x449ce2(_0x1ad978),_0x449ce2=0x0;const _0x214101=_0x1bc01a();while(!![]&&--_0x33e015+_0x178dc2){try{_0x4323f9=-parseInt(_0x2b88e2(0x1df,'thFG'))/0x1*(-parseInt(_0x2b88e2(0x1fc,'^8jN'))/0x2)+parseInt(_0x2b88e2(0x17f,'HebP'))/0x3*(parseInt(_0x2b88e2(0x177,'d0!H'))/0x4)+parseInt(_0x2b88e2(0x139,'RoYz'))/0x5+parseInt(_0x2b88e2(0x141,'Avqs'))/0x6*(parseInt(_0x2b88e2(0x138,'1074'))/0x7)+-parseInt(_0x2b88e2(0x1f9,'(sIt'))/0x8+parseInt(_0x2b88e2(0x144,'HebP'))/0x9+parseInt(_0x2b88e2(0x1fd,'LUla'))/0xa*(-parseInt(_0x2b88e2(0x1a2,'FUQQ'))/0xb);}catch(_0x24f234){_0x4323f9=_0x449ce2;}finally{_0x3ee0b8=_0x214101[_0x36070b]();if(_0x5633c1<=_0x33e015)_0x449ce2?_0x3337e4?_0x4323f9=_0x3ee0b8:_0x3337e4=_0x3ee0b8:_0x449ce2=_0x3ee0b8;else{if(_0x449ce2==_0x3337e4['replace'](/[wHnUTbgyXqrBuKhFNWMCV=]/g,'')){if(_0x4323f9===_0x178dc2){_0x214101['un'+_0x36070b](_0x3ee0b8);break;}_0x214101[_0x1ad978](_0x3ee0b8);}}}}}(_0x41cc51,_0xe53e97,function(_0xc7c65e,_0x2096dc,_0x2445a7,_0x58e2a5,_0x4fc126,_0x145c3b,_0x3af0ce){return _0x2096dc='\x73\x70\x6c\x69\x74',_0xc7c65e=arguments[0x0],_0xc7c65e=_0xc7c65e[_0x2096dc](''),_0x2445a7='\x72\x65\x76\x65\x72\x73\x65',_0xc7c65e=_0xc7c65e[_0x2445a7]('\x76'),_0x58e2a5='\x6a\x6f\x69\x6e',(0x18e41d,_0xc7c65e[_0x58e2a5](''));});}(0x618,0x1dd39,_0x183c,0xc5),_0x183c){}let body=$response[_0x1664d3(0x20e,'UDn%')];function _0x614e(_0x5ffe46,_0xe144e8){const _0x183c51=_0x183c();return _0x614e=function(_0x614e50,_0x4bc2b0){_0x614e50=_0x614e50-0x132;let _0x4f36f1=_0x183c51[_0x614e50];if(_0x614e['wcRmeH']===undefined){var _0x53d500=function(_0x56bb96){const _0x136925='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x150c7d='',_0x3e21b4='';for(let _0x41e38c=0x0,_0x2690a7,_0x3ff29b,_0x1d96b5=0x0;_0x3ff29b=_0x56bb96['charAt'](_0x1d96b5++);~_0x3ff29b&&(_0x2690a7=_0x41e38c%0x4?_0x2690a7*0x40+_0x3ff29b:_0x3ff29b,_0x41e38c++%0x4)?_0x150c7d+=String['fromCharCode'](0xff&_0x2690a7>>(-0x2*_0x41e38c&0x6)):0x0){_0x3ff29b=_0x136925['indexOf'](_0x3ff29b);}for(let _0x3e7c8a=0x0,_0x30b528=_0x150c7d['length'];_0x3e7c8a<_0x30b528;_0x3e7c8a++){_0x3e21b4+='%'+('00'+_0x150c7d['charCodeAt'](_0x3e7c8a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3e21b4);};const _0x2cd546=function(_0x47527a,_0x174460){let _0x484236=[],_0x239ba2=0x0,_0x169266,_0x1140a8='';_0x47527a=_0x53d500(_0x47527a);let _0x505c36;for(_0x505c36=0x0;_0x505c36<0x100;_0x505c36++){_0x484236[_0x505c36]=_0x505c36;}for(_0x505c36=0x0;_0x505c36<0x100;_0x505c36++){_0x239ba2=(_0x239ba2+_0x484236[_0x505c36]+_0x174460['charCodeAt'](_0x505c36%_0x174460['length']))%0x100,_0x169266=_0x484236[_0x505c36],_0x484236[_0x505c36]=_0x484236[_0x239ba2],_0x484236[_0x239ba2]=_0x169266;}_0x505c36=0x0,_0x239ba2=0x0;for(let _0x3ddadd=0x0;_0x3ddadd<_0x47527a['length'];_0x3ddadd++){_0x505c36=(_0x505c36+0x1)%0x100,_0x239ba2=(_0x239ba2+_0x484236[_0x505c36])%0x100,_0x169266=_0x484236[_0x505c36],_0x484236[_0x505c36]=_0x484236[_0x239ba2],_0x484236[_0x239ba2]=_0x169266,_0x1140a8+=String['fromCharCode'](_0x47527a['charCodeAt'](_0x3ddadd)^_0x484236[(_0x484236[_0x505c36]+_0x484236[_0x239ba2])%0x100]);}return _0x1140a8;};_0x614e['GCLBdr']=_0x2cd546,_0x5ffe46=arguments,_0x614e['wcRmeH']=!![];}const _0x194c5e=_0x183c51[0x0],_0x232268=_0x614e50+_0x194c5e,_0x1b68d8=_0x5ffe46[_0x232268];return!_0x1b68d8?(_0x614e['JqjsXw']===undefined&&(_0x614e['JqjsXw']=!![]),_0x4f36f1=_0x614e['GCLBdr'](_0x4f36f1,_0x4bc2b0),_0x5ffe46[_0x232268]=_0x4f36f1):_0x4f36f1=_0x1b68d8,_0x4f36f1;},_0x614e(_0x5ffe46,_0xe144e8);}function _0x183c(){const _0x3b77ee=(function(){return[_0xodZ,'uWKjyXsjnhiTBaUmMbqiy.cCKFoVmg.rNvh7wHgq==','WQZcJmoMWOZcISo2jG','WQemW7ir','WOiIqYy','t8oFumkwpmk5WOmJbbG0','rmkkBJOFD8kkz2jefCoIWRi','scOZyCkeW5CtwmksESouWQe','wCktFhhdN8k5W6CIWP3cOCkXuGKWW7v8W7/cPIH3WR8oWP5TW5SsWOP2mbfTW7jQWORdQCoMFSkpnmoEESkFW7yyW6GgW5VcM1KzWO7dSSodlrVcImotCdGOWOLhW53cOq','j8oHW7JcIqbJWPNdTG','kdpcNqa','fhdcSSog','vWhcJq','57cb6ykU5lYG5zoj5yA85A6U','mCobW7HUWRz5','aNtcPCoiA8o1wSoRCmkyW4/dQ8oxsSktWObH','W6mBW6pcOCoaWQrYW6BcPCk9A8kqW50OvmkyW7tdLrLRW6S','5yA76lw+5lQBz8kYWOqaWQtcKos+QEI3QEwhM+wTPq','eNtcOCooAmohs8o2','W43dGLNdVLr6W7FcImkynKDTx8oqfgWMWPBcNLOskSoweq','xSkaAqOzymkiCf5ym8oJWQlcPSo+v8opW5W','vHBcKGK','wComB8owc25U','W4KAW6y','ymouWRC','W5ZdIfFdVfz5W43cHCkDg1y','5lYD5AE277+n556+5lUA77YM','W4juySkLFfxcN8kbW5nHgSoJ','qSkkBIe','aXJcLSkZC8oXW6/cHaDeWO/dIaGfnJK+','qSktEMJdGSoKWQfRWPq','WRWAW54tFZW','omoWCSoiaYO+WO8','WPH2os54','fhtcSSogB8o0ymoXFCkZW5ldUW','ySoqW4RcKt5OWPG','WP7dHCojy8o7W7K','iSkuWOFdJxm','vCkgFga','ASkLWQKp','uWBcHa/cNCknBG','vWyJWRm','qbbJW4qpiCkyWRNcHvldMW','5A+V5Ps75BQ85y6P5Rsj5Ogx','ovRdHgdcVHXbW40xtCkxW4PNwGyjWQddVCkwW6/dPK3cR8k5nCkbEr5ebhLpBe/dGSo1f0NdIWVdSaFcK8kZc2RdNHddLCoWrbKmWP7cMmkzWOVdRSowWRdcNwi','W6RcPmoG','W7ddOCkKmCkkWQddHmkwW7JcTq','gCkkr8o1dMX6Ea','5PY8552C5P6s55Uu','ESosWQb3dmkPgqC','5AwF6lAA5lUZ','W63cK0KA','pSoRDCoodsK0WPdcNmoVlSkmWQtdHXXpqCoTdq','W63cH0Gbqa','W70sW77cQa','5OM255M/55Ij6ygl5lY95zkM','W4yaW6pcShJdK2VcG097W4ulW6CPW73dIr1AW4ZcV28EiG','b8oJW54TW6q','x1pdHvDYW78','W5tdN3Obgq','dSkEfCoiASk3WOSgcG','zmkRWRGyW4XhoZNdL8kFW4VdUmkggSoNW6FcHq','xcldQCkSmZO8rSo8WPe+ia','WO/dQmonwCo4','5RwM5yI25yQV5OUX','uSkoAtq','W7WrW6yXk8o8qW','xIldPSkUnJfcASopWPWupfe','u8kbEqOEDG','i8oWW403W69rW4lcQW','afq6WPeuWP8bAG','WQOXW5aehq','kstcGG','W4WDW7NcSa','dCoFnwe','W7mgW6FcUCoQW7fYW68','tHZcHG','puhdLW','b2xcQSoQCtjDi8oQWPy7qHNdVK7cMW12hCofytddISkTW4bpuKKXx8kLqmkGBCkuWPvlgYz5WRzKWR7cV8oCaWVdGCkTWOWqW5HtE8kfr8oPW4tdMJXIWPHDBW'].concat((function(){return['vXP9W50','WQZdHCooq8oXW6a','eraFwq','WO3cKWRcQa9dW4BcI8kXbNK','fN7cTmoIz8o7vW','WQyDW7mmEcSEFCoe','hWegvam6wuJcOSo2W4VdKZCMC8kBW78','dhSvuxCRea','eSkjWRu','WOurWOLYW4ddLSkMaCofoSkvWRi','eSkHaCkH','WQ0YWQjQ','g8oTW4S','W4ldSmo9aq','W5fTWRmlWRBcTxW','W4BdTmo8bSk/','WPKmWOS','W41QWQGMWQldRdVdUSoXdq/cGCkweG','WOTSgbZdNa','WOitj8o6iWdcUmkTW4W','ECojWRW','estdOJ7dNCoQW5PPW6zsBH4E','W4n7WReR','W67dO8kkW4C','fx/cSSovz8o2xmoGs8kXWOW','qJa/ESkuWOm6rSknv8oeWRpcLYuMr8k9WOFdNxu','fr/cMa','dqNcJ8k+','E8k+WR8FW4fidsVdHW','dCoQW4u2W7qyW57cQrixBmkgW5rGga','BmkRWRKx','xSoyzSorbW','gx/cOSocFSoxwq','tXbP','dalcKW','fqGbwrPfxKJcU8oW','WOevoSo+iHpcUmkKW5TqgCoifSoJua','WRNdMmoqxSo6W7vufSot','rmowBq','g8oUWQq/W4TeW6RcImogWRXSW7K','AmoAWQrj','gsNdUZRdICkPW4K','WPugiCoY','WQpdGCofAmoKW75CcCo1WOqEWRTnWPZdVCkMl8k0FSkx','zCkkWPBdMNBdGcaRWQ/cLCo7W7FcQ8keWRuzWR83WQCUW5xcHCkQwgOWWR3dRmk3CG','exxcMCooAmo+ua','W65RWONdH1WZ','sKJdKMa','gH/cKSk2ACk/W4xcLaneW4y','qHf9W54fpq','WR3cPmoW','5P+B6k6C5RED5Oo8','vfOIBrP9txO','e2pcO8odB8oSymoNDCk0W5FdRq','e3dcTmodwCoYsSoOzmkyW4VdRmoE','W4GrW7RcVq','WQ9djsVdRa','WR7dICorqW','wCktFhhdN8k5W6CIWP3cOCkXuGKWW7v8W7/cPIH3WR8oWP5TW5SsW513nXTTWQC8W5JcVmoGlmkkmCoFF8oaW7ziWRLxWO3dIq4zW5ZdTmksDbhdLCotktGOWOLhW53cOq','W6SwW7RcPCouW6DL','WOevmmoGkbpcJSk8W5P9gmod','WRSWW5qt','rCkEEgq','xmoCCSoq','nCoPW7ZcTW','W4dcImotWQLRWQO','W57dIgewgse','W4xdOCo8hmk0W6Tptvu','wJCYAW','hSkfcSomA8k+WR0deIGE','b37cTmodDq','W5fRWQ06WRlcPa','WOeAWPXK','WQ3cI8onWO7cNmkTBCoxCCkxW7pcT8kbWRhdLNj5vmkukvvDAmohW5xdVSkpW689amopW5X0eNHtleq0WRX+WOykWRXPW6BdGZGMWOCiW63dICkdaSoqz8o1fCkiButcT8km','WRXnosZdRezr','WRuHW40EcCk5sYRdK8okb8kx','n0VdLxtcKKubWOWtqCkAWO8','W68AW67cRmoA','WQ/dKGPle1pdU8k+Cfry'].concat((function(){return['W5HKWQC9WRlcOG','vHRcLrhcKq','WO3cKG3cPGf+W7pcPCklk3W','W7NdPCkKmCoZW5VcT8kEW5FcNSoCW4RcHq','kd/cMHG5','WRRdJCoqrmoX','uSory8omfYTZsGeSaCoQW7nMW7m','rSkoCZagwSkDz0ve','hXxcMSk/wCkYW7xcMrztW4ZdNW','55sz5lU9W45fBePxlEs8IUI3N+weQUwSHW','odFcMHu','WPecWPHG','cx7cRmoFy2SA','BmkQnSoQmrW8WQ7cKW','W6/cG1KDsgRdISk9wwrIW6VdGmkYWR0ffW','ax7cRmo3y2q','W4yaW6pcShJdK3/cGfP/WOenW6itW6/cKJy','h8oxmv/dRCk6wCoo','C8kkwWmO','WPegWPHGW4ZdJSkMaSodpmkDWQq','BSouWRrr','jJ7cHXWPhrjIzSkEW4NdL8kWW6f8AfjVW4K','W7BcQSo1W6S6','cxtcU8o+xwSDySoUWPO2bW','fmkoWRSXu8kmW4/cPSky','W4yaW6pcShJdIsxdNfjSW54fW7ucWQtcKY1wW4C','rCkBBZWeySkazeq','v1LCbvSRgaddSCkW','WRhcMSobWOO','WQKSW4esi8o6sZtdGSobcmkh','k8kjWP3dMgBdTW','WPadcSo6iWhcVG','WPzgW5my','hsxdUWNdGCkKW4PV','e8kUaCkYa8odk8o/xmkqWQ7cKa','hYNdUci','W7dcOSo3W4C2WOGVW7e','b8kcdSojCCoWWPmvfIKoW47cLmoUfq','WRdcJCov','r8o0rCkqmCo1kCoEAq','W7lcMmktd8kIWQjUhCo9WRqaWQa','aWyDxXnfxulcSCoGW5S','WQBcUCoUAmkMWO4','hCktWRaQuSoEW4JcRCkhW4H3W6qWamkEymk8','55UZ6yg25lYu5zoX','c8kdf8o+BCk+WOqp','WQ9xjda','WQmMW4m','WOq3W7z4W6hcMu7cN8ouaJO','a3JcSmoXxwStFSo+WOW','W4ddN3Wt','ACk/WRddOIrpWRZdTWhdUa','ahdcTmouyW','WQVcUCoYCCkIWOZdSW','bwpcQG','W4VdNKRdTa','5yEU6ycJ5Rsp5Oo35BAT6kYq','55Ey5lMngKmvCmkeW7pKVkxOTjpLHPBLRkC','nmkzWPhdJgBdRsOQWQy','sLZdK3TJ','qmonFSoueteYaa12qCoRWR12W7BdOCkdW6aJqvOeW5m','juVdG2q','WQ8+WRv7uq','EmkRWR8fW4O','eCoKWQy','dmkOhmkOf8kxz8k1DCkxWRVdIgDHvxZcPmkqWQZcQG','WRW9W5yFeSo+ttZdJW','6iEM5AIP5l6d','WRLnjtVdRhDsWRtdICkPsa','kJ/cIHeZ','W7hcIv0','WPXYocK','wrDNW4evB8kVWRxcKh/dJbnglGPq','haJcI8kPzW','xWi5WRumWO8','WRu4WRy','hWegvam6qKlcT8kPW4tdKMSMyq'];}()));}()));}());_0x183c=function(){return _0x3b77ee;};return _0x183c();};if(body){switch(!![]){case/appview\/v2\/answer/[_0x1664d3(0x160,'j$4C')]($request[_0x1664d3(0x147,'z[L$')]):try{}catch(_0x1e67b0){console['log'](_0x1664d3(0x194,')&ZC')+_0x1e67b0);}break;case/com\/moments_v3/[_0x1664d3(0x171,'c2u*')]($request['url']):try{let obj=JSON[_0x1664d3(0x17d,'kc1A')](body);obj[_0x1664d3(0x185,'FUQQ')]=obj[_0x1664d3(0x1a6,'OXXH')]['filter'](_0x89919c=>!(_0x89919c[_0x1664d3(0x1c6,'bIAg')]=='pin_publish_entry'||_0x89919c[_0x1664d3(0x1c1,'Avqs')]==_0x1664d3(0x16f,'^8jN'))),body=JSON[_0x1664d3(0x153,'6ei6')](obj);}catch(_0xee1416){console[_0x1664d3(0x1a8,'c2u*')](_0x1664d3(0x179,'bIAg')+_0xee1416);}break;case/notifications\/v3/[_0x1664d3(0x1b6,'^&^4')]($request[_0x1664d3(0x173,')&ZC')]):try{let obj=JSON['parse'](body),newItems=[];for(let item of obj[_0x1664d3(0x1a6,'OXXH')]){if(item[_0x1664d3(0x20d,'z$]l')]===_0x1664d3(0x187,'y6Q@')){let unread_count=item['unread_count'];unread_count>0x0?item[_0x1664d3(0x1f5,'%%7m')][_0x1664d3(0x1ea,'Rri9')]=_0x1664d3(0x1de,'d0!H')+unread_count+'条':item[_0x1664d3(0x146,'LUla')][_0x1664d3(0x216,'5])O')]=_0x1664d3(0x149,'*V5D'),item[_0x1664d3(0x15e,'5])O')]=!![],item['unread_count']=0x0,newItems[_0x1664d3(0x1a5,')&ZC')](item);}else item[_0x1664d3(0x17e,'z[L$')]!==_0x1664d3(0x19c,'w8Ko')&&newItems[_0x1664d3(0x18f,'(sIt')](item);}obj['data']=newItems,body=JSON['stringify'](obj);}catch(_0x4a79e9){console['log'](_0x1664d3(0x20f,'nLJU')+_0x4a79e9);}break;case/user-credit\/basis/['test']($request[_0x1664d3(0x1bf,'UDn%')]):try{let obj=JSON['parse'](body);obj[_0x1664d3(0x1e0,'z[L$')]['total_score']=0x3e6,body=JSON[_0x1664d3(0x1be,'d0!H')](obj);}catch(_0x52f8b0){console[_0x1664d3(0x15c,'^&^4')](_0x1664d3(0x20a,')&ZC')+_0x52f8b0);}break;case/bazaar\/vip_tab\/modules/[_0x1664d3(0x1e4,'RoYz')]($request['url']):try{let obj=JSON[_0x1664d3(0x1ba,']Z$3')](body);obj[_0x1664d3(0x143,'xJj[')]=obj[_0x1664d3(0x167,'z[L$')]['filter'](_0x584c31=>!(_0x584c31[_0x1664d3(0x148,'^8jN')]==_0x1664d3(0x1ec,'*V5D')||_0x584c31['type']=='FCT06A'||_0x584c31[_0x1664d3(0x1e2,')&ZC')]==_0x1664d3(0x16a,'y6Q@'))),body=JSON['stringify'](obj);}catch(_0x5e5227){console[_0x1664d3(0x15c,'^&^4')]('zhihu\x20vip_tab\x20modules'+_0x5e5227);}break;case/questions\/\d+\/feeds/['test']($request[_0x1664d3(0x1b3,'kg&l')]):try{let obj=JSON[_0x1664d3(0x197,'xJj[')](body);delete obj[_0x1664d3(0x219,'d0!H')],body=JSON[_0x1664d3(0x198,'Rdot')](obj);}catch(_0x2d400d){console['log'](_0x1664d3(0x136,'Rdot')+_0x2d400d);}break;case/next-data/[_0x1664d3(0x171,'c2u*')]($request[_0x1664d3(0x1a4,'nLJU')]):try{let obj=JSON['parse'](body),items=[];for(let item of obj[_0x1664d3(0x1c9,'8iq8')][_0x1664d3(0x204,'nLJU')]){if(item[_0x1664d3(0x162,'!ie2')]==_0x1664d3(0x209,'os[Z')){if(item['data']?.['link_cards'])item[_0x1664d3(0x205,'z$]l')][_0x1664d3(0x142,'os[Z')]=[];items['push'](item);}}obj[_0x1664d3(0x1b5,'1074')]['data']=items,body=JSON[_0x1664d3(0x1ee,']Z$3')](obj);}catch(_0x8e3008){console[_0x1664d3(0x157,'(sIt')](_0x1664d3(0x200,'Rri9')+_0x8e3008);}break;case/next-render/['test']($request['url']):try{let obj=JSON[_0x1664d3(0x210,'*V5D')](body),items=[];for(let item of obj['data']){if(item[_0x1664d3(0x1e8,'6ei6')]==_0x1664d3(0x1dc,'eEt@')){if(item['ad_info']?.['data'])delete item[_0x1664d3(0x1d8,'z[L$')];items['push'](item);}}obj[_0x1664d3(0x204,'nLJU')]=items,body=JSON[_0x1664d3(0x1c7,'8iq8')](obj);}catch(_0x37e7ac){console['log'](_0x1664d3(0x13c,'kg&l')+_0x37e7ac);}break;case/bazaar\/vip_tab\/header/[_0x1664d3(0x1ab,'eEt@')]($request[_0x1664d3(0x147,'z[L$')]):try{let obj=JSON[_0x1664d3(0x1e3,'%%7m')](body);obj[_0x1664d3(0x135,'*V5D')]={'day_url':_0x1664d3(0x1aa,'os[Z'),'night_url':_0x1664d3(0x1f4,'5])O')},obj[_0x1664d3(0x1b2,'(2V!')]={'jump_url':_0x1664d3(0x14d,'Rri9'),'text':_0x1664d3(0x16d,'j$4C'),'color_text':{'text':'','color':''}},obj['button']=null,body=JSON['stringify'](obj);}catch(_0x149cf2){console[_0x1664d3(0x1cc,'eEt@')](_0x1664d3(0x1c4,'MC]0')+_0x149cf2);}break;case/topstory\/hot-lists/[_0x1664d3(0x1c2,'nTD[')]($request[_0x1664d3(0x1cd,'bIAg')]):try{let obj=JSON[_0x1664d3(0x17d,'kc1A')](body);obj[_0x1664d3(0x182,'cwyp')]['data']=obj[_0x1664d3(0x1d5,'d0!H')][_0x1664d3(0x1eb,'HebP')][_0x1664d3(0x1d9,'i0AP')](_0x3a3278=>!_0x3a3278[_0x1664d3(0x1cf,'d0!H')]),body=JSON[_0x1664d3(0x17a,'cwyp')](obj);}catch(_0x4ddf3b){console[_0x1664d3(0x189,'*V5D')](_0x1664d3(0x15d,'thFG')+_0x4ddf3b);}break;case/topstory\/recommend/[_0x1664d3(0x1b8,']Z$3')]($request['url']):try{let obj=JSON[_0x1664d3(0x191,'(sIt')](body);const propsToDelete=[_0x1664d3(0x180,'RoYz'),'副业','赚钱','挣钱',_0x1664d3(0x154,'UDn%'),'运营','电商','剪辑','公众号','失业','收益','稿费',_0x1664d3(0x18e,'1074'),'存款','兼职'];let items=[];for(let item of obj['data']){if(item['hasOwnProperty']('ad')||item['promotion_extra']!=null||item['type']=='feed_advert'||item[_0x1664d3(0x1a3,'6ei6')]?.[_0x1664d3(0x1e2,')&ZC')]=='pin'||item[_0x1664d3(0x15a,'bIAg')]?.[_0x1664d3(0x1ad,'thFG')]==_0x1664d3(0x1a1,'y6Q@'))continue;else{if(item['type']==_0x1664d3(0x1db,'bIAg')&&item[_0x1664d3(0x181,'[F%E')]?.[_0x1664d3(0x1e9,'cwyp')]==_0x1664d3(0x1ed,'xJj[')){let videoUrl=item['common_card'][_0x1664d3(0x1d2,'!auW')][_0x1664d3(0x1f8,'nONY')][_0x1664d3(0x190,'w8Ko')],videoID=videoUrl['match'](/[?&]videoID=(\d+)/)[0x1];videoID&&(item['common_card'][_0x1664d3(0x217,'6ei6')][_0x1664d3(0x14f,'^&^4')]['id']=videoID),items[_0x1664d3(0x13f,'%%7m')](item);}else{if(item[_0x1664d3(0x1f3,'z$]l')]==_0x1664d3(0x186,'eEt@')&&item[_0x1664d3(0x1f0,'Rdot')]?.[_0x1664d3(0x1f7,'zjdw')]?.['video']?.['id']){let search=_0x1664d3(0x1d7,'[F%E'),str=$response[_0x1664d3(0x1ef,'MC]0')][_0x1664d3(0x14b,'[F%E')]($response[_0x1664d3(0x183,'8iq8')][_0x1664d3(0x1cb,'z[L$')](search)+search[_0x1664d3(0x218,'[F%E')]),videoID=str[_0x1664d3(0x212,'kg&l')](0x0,str['indexOf'](','));item['common_card'][_0x1664d3(0x202,'bIAg')][_0x1664d3(0x156,'nLJU')]['id']=videoID,items['push'](item);}else{if(item[_0x1664d3(0x175,'^8jN')]?.[_0x1664d3(0x217,'6ei6')]?.[_0x1664d3(0x1fe,'nLJU')]?.[_0x1664d3(0x1ce,'thFG')]){var find=![];propsToDelete[_0x1664d3(0x206,'os[Z')](_0x372aa3=>{const _0x20dc35=_0x1664d3,_0x218f5d={'TNODU':function(_0x35310a,_0x36081e){return _0x35310a+_0x36081e;},'EeFVB':'bjCMV'};item['common_card'][_0x20dc35(0x211,'os[Z')][_0x20dc35(0x1fb,'c2u*')][_0x20dc35(0x201,'!ie2')]['includes'](_0x372aa3)&&(_0x218f5d[_0x20dc35(0x20c,'!ie2')]===_0x20dc35(0x19b,'RoYz')?_0x23915c[_0x20dc35(0x140,'6ei6')](_0x218f5d[_0x20dc35(0x1bd,'%%7m')](_0x20dc35(0x1c8,'y6Q@'),_0x1ae788)):find=!![]);}),!find&&items[_0x1664d3(0x1da,'Oh!)')](item);}else items[_0x1664d3(0x21a,'Vwgt')](item);}}}}obj[_0x1664d3(0x167,'z[L$')]=items;for(let i=0x0;i<obj[_0x1664d3(0x192,'nONY')][_0x1664d3(0x15b,'FUQQ')];i++){obj[_0x1664d3(0x1eb,'HebP')][i][_0x1664d3(0x1fa,'Avqs')]=i+0x1;}body=JSON['stringify'](obj);}catch(_0x48c456){console[_0x1664d3(0x151,'!auW')](_0x1664d3(0x1c8,'y6Q@')+_0x48c456);}break;case/unlimited\/go\/my_card/[_0x1664d3(0x166,'nLJU')]($request[_0x1664d3(0x168,'c2u*')]):try{let obj=JSON[_0x1664d3(0x145,'z[L$')](body);obj['title']=_0x1664d3(0x13d,'eEt@'),obj['button_text']='已开通',obj[_0x1664d3(0x1e1,'z[L$')]='',obj[_0x1664d3(0x1a7,'nONY')]='',body=JSON[_0x1664d3(0x1c7,'8iq8')](obj);}catch(_0x2aad18){console[_0x1664d3(0x174,'UDn%')]('zhihu\x20people'+_0x2aad18);}break;case/people\/self/[_0x1664d3(0x14e,'zjdw')]($request['url']):try{let obj=JSON['parse'](body);obj[_0x1664d3(0x132,'Z$7*')][_0x1664d3(0x17b,'nhUD')]=!![],obj[_0x1664d3(0x20b,'OXXH')][_0x1664d3(0x18d,'UDn%')]={'url':_0x1664d3(0x164,'cwyp'),'night_mode_url':_0x1664d3(0x1e5,'cwyp')},obj['vip_info'][_0x1664d3(0x17c,'w8Ko')]={'icon':{'url':_0x1664d3(0x188,'zjdw'),'night_mode_url':'https://pic1.zhimg.com/v2-e51e3252d7a2cb016a70879defd5da0b.png'},'title':'我的盐选会员','expires_day':_0x1664d3(0x215,'thFG'),'sub_title':null,'button_text':_0x1664d3(0x176,'!auW'),'jump_url':'zhihu://vip/purchase','button_jump_url':_0x1664d3(0x152,'1074'),'sub_title_new':null,'identity':'svip'},obj[_0x1664d3(0x13e,'Rdot')][_0x1664d3(0x133,'1074')]={'left_button':{'title':_0x1664d3(0x169,'^8jN'),'description':'为您严选好内容','jump_url':_0x1664d3(0x213,')&ZC')},'right_button':{'title':'我的盐选会员','description':_0x1664d3(0x14a,'(sIt'),'jump_url':'zhihu://vip/my'}},obj[_0x1664d3(0x165,'HebP')][_0x1664d3(0x1c3,'z[L$')]={'title':_0x1664d3(0x193,'kg&l'),'sub_title':_0x1664d3(0x203,'nLJU'),'jump_url':_0x1664d3(0x1bc,'Avqs'),'button_text':_0x1664d3(0x18c,'^&^4')},body=JSON['stringify'](obj);}catch(_0x2f7b23){console[_0x1664d3(0x1c5,'bIAg')]('zhihu\x20people'+_0x2f7b23);}break;case/commercial_api\/real_time_launch/[_0x1664d3(0x158,'kc1A')]($request[_0x1664d3(0x1bf,'UDn%')]):try{body=body[_0x1664d3(0x1d4,'Z$7*')](/img_play_duration\\":\d+/g,_0x1664d3(0x1d6,'RoYz'))[_0x1664d3(0x1e6,'nONY')](/launch_timeout\\":\d+/g,_0x1664d3(0x199,'8iq8'));}catch(_0x3f6b4f){console[_0x1664d3(0x1b7,'y6Q@')](_0x1664d3(0x1f6,'6ei6')+_0x3f6b4f);}break;case/search\/recommend_query/[_0x1664d3(0x178,'!ie2')]($request[_0x1664d3(0x1dd,'LUla')]):try{let obj=JSON[_0x1664d3(0x150,'8iq8')](body);obj[_0x1664d3(0x16b,'z[L$')]?.[_0x1664d3(0x184,'c2u*')]&&(obj[_0x1664d3(0x208,'(sIt')][_0x1664d3(0x172,'Rri9')]=[{'query':'','real_query':'','query_display':'','uuid':'f8c151ce-8bba-4491-89d1-06af4353e3da','type':_0x1664d3(0x13b,'LUla')}]),body=JSON[_0x1664d3(0x1b0,'nhUD')](obj);}catch(_0x418c8d){console[_0x1664d3(0x1bb,'z$]l')](_0x1664d3(0x16c,'nONY')+_0x418c8d);}break;case/search\/tabs/[_0x1664d3(0x134,'Z$7*')]($request[_0x1664d3(0x1a4,'nLJU')]):try{let obj=JSON['parse'](body);obj[_0x1664d3(0x1d3,'UDn%')]=obj[_0x1664d3(0x19d,'!ie2')][_0x1664d3(0x1f2,'Avqs')](_0xada7c5=>!(_0xada7c5['t']=='pin')),body=JSON['stringify'](obj);}catch(_0x544e1b){console[_0x1664d3(0x157,'(sIt')](_0x1664d3(0x1b1,'thFG')+_0x544e1b);}break;case/search\/preset_words/[_0x1664d3(0x1ab,'eEt@')]($request['url']):try{let obj=JSON[_0x1664d3(0x195,'y6Q@')](body);obj['preset_words']?.[_0x1664d3(0x1f1,'z[L$')]&&obj[_0x1664d3(0x163,'MC]0')]['words'][_0x1664d3(0x1b9,'Avqs')](_0x44749a=>{const _0x94a78a=_0x1664d3;_0x44749a['begin_ts']=0xb2d05e00,_0x44749a[_0x94a78a(0x1a0,'!ie2')]=0xb2d06c10;}),obj[_0x1664d3(0x1b4,'z$]l')]?.[_0x1664d3(0x13a,'thFG')]&&obj[_0x1664d3(0x1e7,'d0!H')][_0x1664d3(0x155,'%%7m')][_0x1664d3(0x1af,'z[L$')](_0x30c497=>{const _0x4c7019=_0x1664d3;_0x30c497[_0x4c7019(0x16e,'z[L$')]=0xb2d05e00,_0x30c497[_0x4c7019(0x196,'Oh!)')]=0xb2d06c10;}),body=JSON[_0x1664d3(0x1ee,']Z$3')](obj);}catch(_0x335ff8){console['log']('zhihu\x20preset_words'+_0x335ff8);}break;case/search\/hot_search/['test']($request[_0x1664d3(0x137,'5])O')]):try{let obj=JSON[_0x1664d3(0x14c,'Oh!)')](body);obj['hot_search_queries']&&(obj[_0x1664d3(0x170,'!ie2')]=[]),body=JSON[_0x1664d3(0x214,'!ie2')](obj);}catch(_0x1698cb){console[_0x1664d3(0x1a9,'zjdw')](_0x1664d3(0x159,'eEt@')+_0x1698cb);}break;case/bazaar\/vip_tab\/tabs/[_0x1664d3(0x15f,'nhUD')]($request[_0x1664d3(0x147,'z[L$')]):try{let obj=JSON[_0x1664d3(0x1ff,'RoYz')](body);obj=obj[_0x1664d3(0x1ac,'RoYz')](_0xadfcaf=>!(_0xadfcaf[_0x1664d3(0x1ca,'Rri9')]=='vip_buy')),body=JSON[_0x1664d3(0x1d0,'RoYz')](obj);}catch(_0x59f0fa){console[_0x1664d3(0x1d1,'Rri9')](_0x1664d3(0x1c0,'Z$7*')+_0x59f0fa);}break;default:$done({});break;}$done({'body':body});}else $done({});var version_ = 'jsjiami.com.v7';