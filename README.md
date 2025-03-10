> [!CAUTION]<br>
> **禁止在中国大陆的任何平台传播此项目！**<br>
> **禁止将本仓库中的任何内容用于违法活动或盈利目的！**<br>
> **使用本项目中的内容所造成的一切后果，均由使用者承担！**<br>
>
------
>
## [Shadowrocket -- 仓库简介](https://github.com/XiangwanGuan/Shadowrocket)<br>
> [!NOTE]<br>
> **本仓库提供由`向晚`维护的`Shadowrocket`的多款`配置文件`、一款`融合模块`，由生成器每日自动构建；**<br>
> **如果此项目对您有帮助，欢迎给予Star！**<br>
> **如有您有其他需求或问题，请提交Issues！**<br>
>
------
>
### [配置功能介绍](#配置功能介绍)<br>
>
#### `功能介绍：`<br>
> 默认使用**TUN模式**接管所有流量；<br>
> 具有强大的**骚扰拦截**功能；<br>
> 具有有效的**防追踪/劫持**功能；<br>
> 使用加密的**DoH**，并有效屏蔽未加密的DNS查询；<br>
> ChatGPT等AI工具单独分流；<br>
> WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
> Apple/Microsoft/Google单独分流；<br>
> 国内地址/国际地址，国内媒体/国际媒体，单独分流；<br>
> 如搭配Shadowrocket的配置自动更新，一次操作，可无须后续管理；<br>
#### `如何安装：`<br>
> 使用手机访问此页面，点击安装链接，一键跳转安装，即可完成安装；<br>
> 如无法加载配置，请将全局路由切换至[代理]模式，或自行检查网络；<br>
>
#### `修改分流：`<br>
> **仅适用于包含代理分组的配置**<br>
> 打开Shadowrocket首页，下拉，选择你想要修改的代理分组，选择策略即可；<br>
>
------
>
### [基础配置介绍](#基础配置介绍)<br>
#### `配置功能介绍：`<br>
> 默认策略既是完善的策略，如无特殊需求，无需自行调整；<br>
> 代理分组内的策略自动分流，自动测试节点的可用性，优先选择延迟较低的节点，无需手动切换节点；<br>
>
#### `使用必看：`<br>
> 你所使用的节点，**尽量包含`港美新`这三项**；<br>
> 如不完全包含这三个地区的节点，则需要自行修改代理分组/正则，或使用`精简配置`、`完整配置`；<br>
> 
> 本配置默认规则如下：<br>
> 国内应用直接连接；<br>
> Telegram使用`新加坡节点`，Google，ChatGPT/Copilot/Gemini，使用`美国节点`；<br>
> 其他规则及未匹配到的规则使用`香港节点`；<br>
> 为了保证完全接管流量，本配置**默认使用`香港节点`兜底**，**首页的节点选择将被分组替代，完全失效**；<br>
> **此配置是最适合懒人的配置，如节点包含`港美新`，建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 基础配置](https://img.shields.io/static/v1?label=一键安装&message=Rules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf "一键安装：基础配置")<br>
>
------
>
### [完整配置介绍](#完整配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`构建，包含更多代理分组：`港台日新美`*，**默认使用`首页节点`进行代理**，可更自由的配置代理分组，其余配置完全相同；<br>
> **如需要更自由的代理分组及自动分流，建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 完整配置](https://img.shields.io/static/v1?label=一键安装&message=RulesFull.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesFull.conf "一键安装：完整配置")<br>
>
------
>
### [精简配置介绍](#精简配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`构建，除不包含代理分组以外，其余配置完全相同；<br>
> **如不需要代理分组及自动分流，强烈建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 精简配置](https://img.shields.io/static/v1?label=一键安装&message=RulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesLite.conf "一键安装：精简配置")<br>
>
------
>
### [回国配置介绍](#回国配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`RulesLite.conf`构建，适合外国华侨使用，国内域名代理，其余域名直连；<br>
> **此配置需搭配`回国机场`使用，不适合国内用户使用！**<br>
>
#### `配置安装：`<br>
> [![一键安装 回国分流配置](https://img.shields.io/static/v1?label=一键安装&message=RulesBackCN.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesBackCN.conf "一键安装：回国分流配置")<br>
>
------
>
### [本地配置介绍](#本地配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 同步提供本仓库所有配置`本地化配置`，由生成器每日自动构建，安装后不依赖外部规则集；<br>
> **此类配置很难自定义，如有个性需求，请慎重使用！**<br>
> **此类配置尚在开发阶段，有问题及时反馈！**<br>
>
#### `配置安装：`<br>
> [![一键安装 本地基础配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRules.conf "一键安装：本地基础配置")<br>
>
> [![一键安装 本地完整配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesFull.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesFull.conf "一键安装：本地完整配置")<br>
>
> [![一键安装 本地精简配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesLite.conf "一键安装：本地精简配置")<br>
>
> [![一键安装 本地回国配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesBackCN.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesBackCN.conf "一键安装：本地回国配置")<br>
>
------
>
### [融合模块介绍](#融合模块介绍)<br>
>
#### `模块安装：`<br>
> [![一键安装 融合模块](https://img.shields.io/static/v1?label=一键安装&message=融合模块&color=grey&logo=lvgl&logoColor=white&labelColor=blue&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule "一键安装：融合模块")<br>
>
#### `模块说明：`<br>
> 由[向晚](https://t.me/xiangwanguan)基于[墨鱼](https://raw.githubusercontent.com/ddgksf2013/Rewrite/master/AdBlock/StartUp.conf)和[奶思](https://github.com/fmz200/wool_scripts/raw/main/QuantumultX/rewrite/chongxie.txt)的规则定制，可去除常见应用的开屏，及净化部分应用，部分规则由生成器每日自动构建；<br>
> 由于配置及网络的多样及不确定性，**本模块仅接受搭配使用`本仓库内的配置`的Issues**，请悉知；<br>
> 使用要求：使用本模块，**必须开启MitM**，教程参考下方说明；<br>
> 使用办法：使用手机访问此页面，点击上方链接，一键安装；<br>
> 特别说明：使用`京东历史比价`，**必须开启Shadowrocket的通知权限**；<br>
> **特别警告：本模块不做任何“解锁”等相关支持，如侵犯了您的利益，请联系本人进行移除，谢谢！**<br>
>
#### `融合说明：`<br>
##### `功能模块：`<br>
> [墨鱼去开屏](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/StartUp.conf) `ddgksf2013`<br>
> [京东历史比价](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JDPriceComparison.conf) `mw418`<br>
##### `软件净化：`<br>
> [YouTube](https://raw.githubusercontent.com/iab0x00/ProxyRules/main/Rewrite/YouTubeNoAd.sgmodule) `iab0x00`<br>
> [知乎](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Zhihu.conf) `fmz200`<br>
> [网易云音乐](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Music163.conf) `fmz200`<br>
> [芒果TV](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/MGTV.conf) `fmz200`<br>
> [优酷](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Youku.conf) `fmz200`<br>
> [爱奇艺](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Iqiyi.conf) `fmz200`<br>
> [皮皮虾](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Pipixia.conf) `fmz200`<br>
> [小红书](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/XiaoHongShu.conf) `fmz200`<br>
> [哔哩哔哩系列](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Bilibili.conf) `fmz200`<br>
> [起点读书](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Qidian.conf) `fmz200`<br>
> [百度全家桶](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Baidu.conf) `fmz200`<br>
> [阿里巴巴系列](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Alibaba.conf) `fmz200`<br>
> [腾讯系列](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Tencent.conf) `fmz200`<br>
> [什么值得买](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/SMZDM.conf) `fmz200`<br>
> [京东系列](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Jingdong.conf) `fmz200`<br>
> [四大运营商](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/CommsProvider.conf) `fmz200`<br>
> [高德地图](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js) `XiangwanGuan`<br>
> [一汽大众](https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/FAWVW.js) `XiangwanGuan`<br>
>
------
>
### [推荐设置](#推荐设置)<br>
>
#### `MitM&证书模块：`<br>
> 如需使用`融合模块`来净化应用，则**必须开启MitM**，否则模块将不能正常工作；<br>
> **建议添加证书模块**，避免因配置变化导致证书失效；<br>
> 证书信任之后，**请勿在设置中移除证书**，否则MitM将会失效；<br>
> 证书模块添加成功后，“HTTPS解密”开关将不再重要，默认开启（模块的优先级高于配置）；<br>
> 
> 证书模块制作办法：<br>
> 配置 > 点击配置文件的 ⓘ 图标 > HTTPS 解密 > 证书 > 生成新的 CA 证书 > 安装证书；<br>
> 系统设置 > 已下载描述文件 > 安装；<br>
> 系统设置 > 通用 > 关于本机 > 证书信任设置 > 启用此证书的根证书完全信任；<br>
> 打开Shadowrocket，点击「已安装证书的配置文件」后面的 ⓘ 图标 > HTTPS 解密 > 证书后面的 ⓘ 图标 > 复制；<br>
> 配置 > 模块 > 新建模块，粘贴并自行修改以下内容：<br>
```
#!name = 证书模块
[MITM]
enable = true
ca-passphrase = Shadowrocket（即「已安装证书的配置文件」的证书密码，Shadowrocket是默认密码；）
ca-p12 = 证书内容（即剪贴板复制的内容）
```
>按说明填写`证书密码`和`证书内容`，保存即可；<br>
>
#### `软件配置：`<br>
> 首页-全局路由：
开启`启用回退`；<br>
> 首页-全局路由：
全局路由-选择`配置`；<br>
> 设置-按需求连接：
开启`始终开启`，其余开关勿动；<br>
> 设置-代理：
代理类型选择`None`，代理地址选择`198.18.0.3`；<br>
> 设置-配置：
开启`自动后台更新`，间隔选择`7`；**（如有自定义配置，请勿开启）**<br>
> 设置-订阅：
开启`自动后台更新`，间隔选择`24`；<br>
> 设置-GeoLite2数据库：
开启`自动后台更新`，间隔选择`7`；<br>
> 设置-GeoLite2数据库：
国家-URL，长按后复制此链接：[Country.mmdb](https://github.com/Hackl0us/GeoIP2-CN/raw/release/Country.mmdb)，输入后点击更新；<br>
> 设置-排除路由0.0.0.0/31：
选择`关闭`；<br>
>更多使用说明，可参阅：[Shadowrocket使用手册](https://github.com/LOWERTOP/Shadowrocket)
>
------
>
### [鸣谢：](#鸣谢：)<br>
[*@blackmatrix7*](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket)
[*@ddgksf2013*](https://github.com/ddgksf2013/ddgksf2013)
[*@fmz200*](https://github.com/fmz200/wool_scripts)
[*@iab0x00*](https://github.com/iab0x00/ProxyRules)
[*@mw418*](https://github.com/mw418/Loon)
[*@LOWERTOP*](https://github.com/LOWERTOP/Shadowrocket-First)<br>
>
------
>
![GitHubStats](https://github-readme-stats.vercel.app/api?username=XiangwanGuan&show_icons=true&theme=default)<br>
>
------
>