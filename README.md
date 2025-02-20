## [Shadowrocket -- 仓库自述](https://github.com/XiangwanGuan/Shadowrocket)<br>
> 本仓库提供由'向晚'维护的Shadowrocket分流规则、去广告模块，由生成器每日自动构建；<br>
>
------
>
> [!NOTE]
> 
> 禁止使用本仓库内的任何内容违法或用以牟利！如需转载请`标明作者`或`注明来源`！<br>
> 若有其他需求可以访问 [Shadowrocket 官方群组](https://t.me/ShadowrocketApp)寻求帮助！<br>
>
------
>
### [分流配置介绍](#分流配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 自动分配策略组，无需手动切换节点；<br>
> 具有强大的广告拦截功能；<br>
> 具有有效的防追踪/劫持功能；<br>
> ChatGPT等AI工具单独分流；<br>
> WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
> Apple/Microsoft/Google单独分流；<br>
> 国内地址/国际地址，国内媒体/国际媒体，可单独分流；<br>
> 使用加密的DoH，防止DNS泄露，并有效屏蔽未加密的DNS查询；<br>
> 完善的规则，配合Shadowrocket的配置自动更新，一次操作，无须后续操作；<br>
>
#### `配置安装：`<br>
> [![一键安装 分流配置](https://img.shields.io/static/v1?label=一键安装&message=Rules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf "一键安装：分流配置")<br>
>
#### `使用必看：`<br>
> 本策略**默认使用Tun模式**接管所有流量；<br>
> 你所使用的节点，**必须包含`香港节点`，`美国节点`，`新加坡节点`的至少一项**；<br>
> 如不完全包含这三个地区节点，则需要自行修改分流/正则；<br>
> 
> 本策略默认规则如下：<br>
> 国内应用直接连接；<br>
> Telegram使用`新加坡节点`，Google，ChatGPT/Copilot/Gemini，使用`美国节点`；<br>
> 其他规则及未匹配到的规则使用`香港节点`；<br>
>
#### `修改分流：`<br>
> 打开Shadowrocket首页，下拉，选择你想要修改的分流，选择策略即可；<br>
> 为了保证完全接管流量，本策略**默认使用`香港节点`兜底**，**首页的节点选择将被分组替代，完全失效**；<br>
>
#### `配置使用：`<br>
> 使用手机访问此页面，点击链接，一键安装，应用即可；<br>
> 如无法加载配置，请切换至[代理]模式，或自行检查网络；<br>
>
------
>
### [精简配置介绍](#精简配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`精简，除不包含策略组以外，其余配置完全相同；<br>
> **如不需要策略组及自动分流，强烈建议使用此配置！**<br>
>
#### `配置安装：`<br>
> [![一键安装 精简配置](https://img.shields.io/static/v1?label=一键安装&message=RulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesLite.conf "一键安装：精简配置")<br>
>
------
>
### [本地配置介绍](#本地配置介绍)<br>
>
#### `配置功能介绍：`<br>
> 基于`Rules.conf`或`RulesLite.conf`的规则，由生成器每日自动构建，安装后不依赖外部规则集；<br>
> **此配置很难自定义，如有个性需求，请慎重使用！**<br>
> **此配置尚在开发阶段，有问题及时反馈！**<br>
>
#### `配置安装：`<br>
> [![一键安装 本地分流配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRules.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRules.conf "一键安装：本地分流配置")<br>
>
> [![一键安装 本地精简配置](https://img.shields.io/static/v1?label=一键安装&message=LocalRulesLite.conf&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/LocalRulesLite.conf "一键安装：本地精简配置")<br>
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
> 由于配置及网络的多样及不确定性，**本模块仅接受搭配使用`(Local)Rules.conf`或`(Local)RulesLite.conf`的Issues**，请悉知；<br>
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
开启`自动后台更新`，间隔选择`7`；<br>
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
[*@LOWERTOP*](https://github.com/LOWERTOP/Shadowrocket-First)
<br>
>
------
>
