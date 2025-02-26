## [Shadowrocket -- 仓库自述](https://github.com/XiangwanGuan/Shadowrocket)<br>
> 本仓库提供由'向晚'维护的Shadowrocket分流规则、去广告模块，由生成器每日自动构建；<br>
>
------
>
![GitHubStats](https://github-readme-stats.vercel.app/api?username=XiangwanGuan&show_icons=true&theme=default)<br>
>
------
>
### [敬告](#敬告)<br>
> 禁止使用本仓库内的任何内容，进行违法行为或用以牟利！请勿在国内任何平台传播此项目！<br>
> 若有其他需求，可以访问 [Shadowrocket官方群组](https://t.me/ShadowrocketApp)寻求帮助或进行反馈！<br>
>
------
>
### [配置功能介绍](#配置功能介绍)<br>
>
#### `功能介绍：`<br>
> 默认使用**Tun模式**接管所有流量；<br>
> 具有强大的**广告拦截**功能；<br>
> 具有有效的**防追踪/劫持**功能；<br>
> ChatGPT等AI工具单独分流；<br>
> WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
> Apple/Microsoft/Google单独分流；<br>
> 国内地址/国际地址，国内媒体/国际媒体，可单独分流；<br>
> 使用加密的**DoH**，并有效屏蔽未加密的DNS查询；<br>
> 完善的规则，配合Shadowrocket的配置自动更新，一次操作，无须后续操作；<br>
#### `如何安装：`<br>
> 使用手机访问此页面，点击安装链接，一键跳转安装，即可完成安装；<br>
> 如无法加载配置，请将全局路由切换至[代理]模式，或自行检查网络；<br>
>
#### `修改分流：（仅适用于包含策略组的配置）`<br>
> 打开Shadowrocket首页，下拉，选择你想要修改的代理分组，选择策略即可；<br>
>
------
>
### [分流配置介绍](#分流配置介绍)<br>
#### `配置功能介绍：`<br>
> 默认策略既是完整策略，无需调整；<br>
> 自动分配策略组，无需手动切换节点；<br>
>
#### `使用必看：`<br>
> 你所使用的节点，**必须包含`香港节点`，`美国节点`，`新加坡节点`这三项**；<br>
> 如不完全包含这三个地区的节点，则需要自行修改分组/正则；<br>
> 
> 本策略默认规则如下：<br>
> 国内应用直接连接；<br>
> Telegram使用`新加坡节点`，Google，ChatGPT/Copilot/Gemini，使用`美国节点`；<br>
> 其他规则及未匹配到的规则使用`香港节点`；<br>
> 为了保证完全接管流量，本策略**默认使用`香港节点`兜底**，**首页的节点选择将被分组替代，完全失效**；<br>
> **此配置是最适合懒人的配置，如节点包含`港美新`，建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 分流配置](https://img.shields.io/static/v1?label=一键安装&message=Rules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf "一键安装：分流配置")<br>
>
------
>
### [完整配置介绍](#完整配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`构建，包含更多策略组（港台日新美），**默认使用`首页节点`**，可自由配置分组，其余配置完全相同；<br>
> **如需要更自由的策略组及自动分流，建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 完整配置](https://img.shields.io/static/v1?label=一键安装&message=RulesFull.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesFull.conf "一键安装：完整配置")<br>
>
------
>
### [精简配置介绍](#精简配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`构建，除不包含策略组以外，其余配置完全相同；<br>
> **如不需要策略组及自动分流，强烈建议使用此配置！**<br>
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
> [![一键安装 本地分流配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRules.conf "一键安装：本地分流配置")<br>
>
> [![一键安装 本地完整配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesFull.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesFull.conf "一键安装：本地完整配置")<br>
>
> [![一键安装 本地精简配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesLite.conf "一键安装：本地精简配置")<br>
>
> [![一键安装 本地回国配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesBackCN.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules/LocalRulesBackCN.conf "一键安装：本地回国配置")<br>
>
------
>
### [去广告融合模块](#去广告融合模块)<br>
>
#### `模块安装：`<br>
> [![一键安装 融合模块](https://img.shields.io/static/v1?label=一键安装&message=融合模块&color=grey&logo=lvgl&logoColor=white&labelColor=blue&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule "一键安装：融合模块")<br>
>
#### `模块说明：`<br>
> 由'向晚'基于“墨鱼去广告模块”定制，重定义部分功能，由生成器每日自动构建；<br>
> 由于配置及网络的多样及不确定性，**本模块仅接受搭配使用`本仓库内的配置`的Issues**，请悉知；<br>
> 使用要求：使用本模块，**必须开启MitM**，教程参考下方说明；<br>
> 使用办法：使用手机访问此页面，点击上方链接，一键安装；<br>
> 
> 融合功能说明：<br>
> 功能模块：
`墨鱼去开屏(ddgksf2013)`
`京东历史比价(wf021325)`<br>
> 软件净化：
`YouTube（Maasea）`
`哔哩哔哩(ddgksf2013)`
`小红书(ddgksf2013)`
`菜鸟裹裹(ddgksf2013)`
`高德地图(XiangwanGuan)`
`一汽大众(XiangwanGuan)`
>
------
>
### [推荐设置](#推荐设置)<br>
>
#### `MitM&证书模块：`<br>
> 如需使用`融合模块`来去除广告，则**必须开启MitM**，否则模块不能正常去除广告；<br>
> **建议添加证书模块**，避免因配置变化导致证书失效；<br>
> 证书信任之后，**请勿在设置中移除证书**，否则MitM将会失效；<br>
> 证书模块添加成功后，“HTTPS解密”开关将不再重要，默认开启（模块的优先级高于配置）；<br>
> 
> 证书模块制作办法：<br>
> 点击配置文件ⓘ - HTTPS解密 - 证书 - 生成新的CA证书 - 安装证书；<br>
> 系统设置 - 已下载描述文件 - 安装；<br>
> 系统设置 - 通用 - 关于本机 - 证书信任设置 - 开启对应Shadowrocket证书信任；<br>
> 点击「已安装证书的配置文件」后面ⓘ - HTTPS解密 - 证书后面ⓘ - 复制；<br>
> 打开Shadowrocket，点击[配置]，点击新建模块：<br>
```
#!name = 证书模块
[MITM]
enable = true
ca-passphrase = 证书密码（即「已安装证书的配置文件」的证书密码，默认密码是Shadowrocket）
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
> 设置-配置：
开启`自动后台更新`，间隔选择`7`；（如有自定义配置，请勿开启）<br>
> 设置-订阅：
开启`自动后台更新`，间隔选择`24`；<br>
> 设置-GeoLite2数据库：
开启`自动后台更新`，间隔选择`7`；<br>
> 设置-GeoLite2数据库：
国家-URL，输入此链接：[*`Country.mmdb`*](https://github.com/Hackl0us/GeoIP2-CN/raw/release/Country.mmdb)，并点击更新；<br>
> 设置-排除路由0.0.0.0/31：
选择`关闭`；<br>
>
------
>
### [鸣谢：](#鸣谢：)<br>
[*@blackmatrix7*](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket)
[*@ddgksf2013*](https://github.com/ddgksf2013/ddgksf2013)
[*@Maasea*](https://github.com/Maasea/sgmodule)
[*@wf021325*](https://github.com/wf021325/qx)
[*@LOWERTOP*](https://github.com/LOWERTOP/Shadowrocket-First)<br>
>
------
>
