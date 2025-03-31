> [!CAUTION]<br>
> **禁止在中国大陆的任何平台传播此项目！**<br>
> **禁止将本仓库中的任何内容用于违法活动或用于盈利目的！**<br>
> **本项目仅供学习交流及测试，使用本项目中的内容所造成的一切后果，均由使用者承担！**<br>
>
------
>
## [Shadowrocket -- 仓库简介](https://github.com/XiangwanGuan/Shadowrocket)<br>
> [!NOTE]<br>
> **本仓库提供由`向晚`维护的`Shadowrocket`的多款`配置文件`、一款`融合模块`，部分资源由生成器自动构建；**<br>
> **如果此项目对您有帮助，欢迎给予Star；若有其他需求或问题，请提交Issues！**<br>
>
------
>
### [配置功能介绍](#配置功能介绍)<br>
>
#### `重要提醒`<br>
##### 2025-03-13更新
> 出于种种考虑，本仓库内的配置，已于**2025-03-13**暂时移除如下规则集：<br>
> `BlockHttpDNS.list`<br>
> `AdvertisingLite.list`<br>
> 生成器会继续支持如上规则集更新，随时可能会移除，请及时**更新配置**！<br>
##### 2025-03-25更新
> 本仓库的分流规则已同步替换为QuanX的规则集，移除DOMAIN-SET的相关分流；<br>
> 请及时**更新配置**，或自行删除DOMAIN-SET的相关配置，以免产生大量重复；<br>
>
#### `功能介绍`<br>
> 所有配置，默认使用**TUN模式**接管所有流量；<br>
> 使用加密的**DoH**进行DNS解析，并劫持未加密的查询；<br>
> 具有有效的**劫持保护、隐私保护**的策略；<br>
> ChatGPT等AI工具单独分流；<br>
> Apple/Microsoft/Google单独分流；<br>
> WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
> 国内地址/国际地址，国内媒体/国际媒体，单独分流；<br>
> **本仓库所使用的规则集源于[blackmatrix7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/QuantumultX)，由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Update%20RuleFiles.yml)每日自动同步**；<br>
#### `如何安装`<br>
> 使用安装Shadowrocket的手机访问此页面，点击安装链接，一键跳转安装；<br>
> 如无法加载配置，请将全局路由切换至[代理]模式，或自行检查网络；<br>
>
#### `修改分流`<br>
> **仅适用于包含代理分组的配置；**<br>
> 打开Shadowrocket首页，下拉，选择你想要修改的代理分组，选择策略即可；<br>
>
------
>
### [基础配置介绍](#基础配置介绍)<br>
#### `配置功能介绍`<br>
> [基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rules.conf)的默认策略既是完善的策略，如无特殊需求，无需自行调整；<br>
> 代理分组内的策略自动分流，自动测试节点的可用性，优先选择延迟较低的节点，无需手动切换节点；<br>
>
#### `使用必看`<br>
> 你所使用的节点，**尽量包含`港美新`这三项**；<br>
> 如**不完全包含**这三个地区的节点，则需要自行修改代理分组/正则，或使用[完整配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesFull.conf)或[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesLite.conf)；<br>
> 基础配置默认规则如下：<br>
> 国内应用直接连接；<br>
> Telegram使用`新加坡节点`，Google，ChatGPT/Copilot/Gemini，使用`美国节点`；<br>
> 其他规则及未匹配到的规则使用`香港节点`；<br>
> 为了保证完全接管流量，本配置**默认使用`香港节点`兜底**，**首页的节点选择将被分组替代，完全失效**；<br>
> **此配置是最适合大众的配置，添加后无需调整，如节点包含`港美新`，建议使用此配置！**<br>
>
#### `配置安装`<br>
> [![一键安装 基础配置](https://img.shields.io/static/v1?label=一键安装&message=Rules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf "一键安装：基础配置")<br>
>
------
>
### [完整配置介绍](#完整配置介绍)<br>
>
#### `配置功能介绍`<br>
> [完整配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesFull.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rules.conf)构建，包含更多代理分组：`港台日新美`，**默认使用`首页节点`进行代理**，可更自由的配置代理分组，其余配置完全相同；<br>
> **如需要更自由的代理分组及自动分流，建议使用此配置！**<br>
>
#### `配置安装`<br>
> [![一键安装 完整配置](https://img.shields.io/static/v1?label=一键安装&message=RulesFull.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesFull.conf "一键安装：完整配置")<br>
>
------
>
### [精简配置介绍](#精简配置介绍)<br>
>
#### `配置功能介绍`<br>
> [精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesLite.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rules.conf)构建，除不包含代理分组以外，其余配置完全相同；<br>
> **如不需要代理分组及自动分流，强烈建议使用此配置！**<br>
>
#### `配置安装`<br>
> [![一键安装 精简配置](https://img.shields.io/static/v1?label=一键安装&message=RulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesLite.conf "一键安装：精简配置")<br>
>
------
>
### [回国配置介绍](#回国配置介绍)<br>
>
#### `配置功能介绍`<br>
> [回国配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesBackCN.conf)基于[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/RulesLite.conf)构建，适合外国华侨使用，国内域名代理，其余域名直连；<br>
> **此配置需搭配`回国机场`使用，不适合国内用户使用！**<br>
>
#### `配置安装`<br>
> [![一键安装 回国分流配置](https://img.shields.io/static/v1?label=一键安装&message=RulesBackCN.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesBackCN.conf "一键安装：回国分流配置")<br>
>
------
>
### [融合模块介绍](#融合模块介绍)<br>
>
#### `模块安装`<br>
> [![一键安装 融合模块](https://img.shields.io/static/v1?label=一键安装&message=融合模块&color=grey&logo=lvgl&logoColor=white&labelColor=blue&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule "一键安装：融合模块")<br>
>
#### `模块说明`<br>
> **[融合模块](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Module.sgmodule)由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Update%20ModuleRules.yml)调用[生成器](https://github.com/XiangwanGuan/Shadowrocket/blob/main/ModuleBuild/ModuleBuild.py)依据[规则](https://github.com/XiangwanGuan/Shadowrocket/blob/main/ModuleBuild/BuildList.conf)而构建，随规则变化，不定期更新；**<br>
> **规则构成：以[向晚](https://t.me/xiangwanguan)基于[奶思重写合集](https://github.com/fmz200/wool_scripts/blob/main/QuantumultX/rewrite/chongxie.txt)，定制部分功能，并手动维护的[重写合集](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/RewriteBuild.conf)为基础，融合：[YouTube](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/YouTube.conf)、[高德地图](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/Amap.js)、[一汽大众](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/FAWVW.js)、[京东历史比价](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/JDPriceComparison.conf)；**<br>
> **所有[远程资源](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/JavaScriptCheck.md)由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Update%20RewriteFiles.yml)每日自动备份&监测，所有规则指向的资源已重定向至[当前仓库](https://github.com/XiangwanGuan/Shadowrocket/tree/main/Rewrite/JavaScript)；**<br>
> 使用办法：使用安装Shadowrocket的手机访问此页面，点击[安装链接](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule)，一键跳转安装；<br>
> 使用须知：使用融合模块，**必须开启MitM**，教程参考下方说明；<br>
> 特别说明：使用融合模块，会**禁用QUIC协议**，请自行评估影响；<br>
> **特别警告：融合模块不做“解锁”功能，请支持开发者！如本项目侵犯了您的利益，请联系本人进行移除，谢谢！**<br>
>
------
>
### [推荐设置](#推荐设置)<br>
>
#### `MitM&证书模块`<br>
> 如需使用`融合模块`来净化应用，则**必须开启MitM**，否则模块将不能正常工作；<br>
> **建议添加证书模块**，避免因配置变化导致证书失效；<br>
> 证书信任之后，**请勿在设置中移除证书**，否则MitM将会失效；<br>
> 证书模块添加成功后，“HTTPS解密”开关将不再重要，默认开启（模块的优先级高于配置）；<br>
>
> 证书模块制作办法：<br>
> 配置 > 点击配置文件的 ⓘ 图标 > HTTPS 解密 > 证书 > 生成新的 CA 证书 > 安装证书；<br>
> 同一iCloud的多设备用户，另一台设备请选择“粘贴”，请勿重新生成新的证书，否则上一证书将会失效；<br>
> 系统设置 > 已下载描述文件 > 安装；<br>
> 系统设置 > 通用 > 关于本机 > 证书信任设置 > 启用此证书的根证书完全信任；<br>
> 打开Shadowrocket，点击「已安装证书的配置文件」后面的 ⓘ 图标 > HTTPS 解密 > 证书后面的 ⓘ 图标 > 复制；<br>
> 配置 > 模块 > 新建模块，粘贴并自行修改以下内容：<br>
```
#!name = 证书模块
[MITM]
enable = true
# 确认"ca-passphrase="后面填写的「已安装证书的配置文件」的证书密码是否正确，Shadowrocket是默认密码；
ca-passphrase = Shadowrocket
# 须在"ca-p12="后面粘贴证书内容；
ca-p12 = 
```
> 按说明确认`证书密码`和填写`证书内容`，保存即可；<br>
>
#### `软件配置`<br>
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
> 更多使用说明，可参阅：[Shadowrocket使用手册](https://github.com/LOWERTOP/Shadowrocket)
>
------
>
### [特别鸣谢](#特别鸣谢)<br>
[*@blackmatrix7*](https://github.com/blackmatrix7)
[*@ddgksf2013*](https://github.com/ddgksf2013/ddgksf2013)
[*@fmz200*](https://github.com/fmz200/wool_scripts)
[*@iab0x00*](https://github.com/iab0x00/ProxyRules)
[*@LOWERTOP*](https://github.com/LOWERTOP/Shadowrocket-First)
[*@Hackl0us*](https://github.com/Hackl0us/GeoIP2-CN)
[*@mw418*](https://github.com/mw418/Loon)
[*@githubdulong*](https://github.com/githubdulong/Script)
[*@Keywos*](https://github.com/Keywos/rule)
[*@Maasea*](https://github.com/Maasea/sgmodule)
[*@NobyDa*](https://github.com/NobyDa/Script)
[*@Sliverkiss*](https://github.com/Sliverkiss/QuantumultX)
[*@ZenmoFeiShi*](https://github.com/ZenmoFeiShi/Qx)
[*@app2smile*](https://github.com/app2smile/rules)
[*@kokoryh*](https://github.com/kokoryh/Script)
[*@zZPiglet*](https://github.com/zZPiglet/Task)
[*@zirawell*](https://github.com/zirawell/Ad-Cleaner)<br>
>
------
>
