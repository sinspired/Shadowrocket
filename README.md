### Shadowrocket 配置/模块<br>

#### Rules.conf - 配置介绍
##### 配置功能介绍：<br>
自动分配策略组，无需手动切换节点；<br>
具有强大的广告拦截功能；<br>
具有有效的防追踪/劫持功能；<br>
ChatGPT等AI工具单独分流；<br>
WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
Apple/Microsoft/Google单独分流；<br>
国内地址/国际地址，国内媒体/国际媒体，可单独分流；<br>
使用加密的DoH，防止DNS泄露，并有效屏蔽未加密的DNS查询；<br>
完善的规则，配合Shadowrocket的配置自动更新，一次操作，无须后续操作；<br>

##### 规则地址：<br>
[*Rules.conf--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf)<br>

##### 使用必看：<br>
你所使用的节点，必须包含<香港节点>，<美国节点>，<新加坡节点>的至少一项；<br>
如不完全包含这三个地区节点，则需要自行修改分流/正则；<br>
本策略默认指定：
Telegram使用<新加坡节点>，
谷歌和AI使用<美国节点>，
其他规则使用<香港节点>；<br>

##### 修改分流：<br>
打开Shadowrocket首页，下拉，选择你想要修改的分流，选择策略即可；<br>
为了保证完全接管流量，本策略默认使用<香港节点>兜底，首页的节点选择将被分组替代，完全失效；<br>

#### RulesLite.conf - 配置介绍
##### 配置功能介绍：<br>
基于Rules.conf精简，除不包含策略组以外，其余配置完全相同；<br>
如不需要策略组及自动分流，强烈建议使用此配置；<br>

##### 规则地址：<br>
[*RulesLite.conf--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesLite.conf)<br>

##### 使用办法：<br>
使用手机访问此页面，点击链接，一键安装，应用即可；<br>
如无法加载配置，请切换至[代理]模式，或自行检查网络；<br>

#### 推荐设置：<br>
首页-全局路由：
开启“启用回退”，全局路由选择“配置”；<br>
设置-按需求连接：
开启“始终开启”，其余开关勿动；<br>
设置-代理：
代理设置，代理类型选择“None”；<br>
设置-配置：
开启“自动后台更新”，间隔“7”；<br>
设置-订阅：
开启“自动后台更新”，间隔“24”；<br>
设置-GeoLite2数据库：
开启“自动后台更新”，间隔“7”；<br>
设置-GeoLite2数据库：
国家-URL，输入<https://github.com/Hackl0us/GeoIP2-CN/raw/release/Country.mmdb><br>
设置-排除路由0.0.0.0/31：
关闭<br>

#### MitM&证书模块
建议开启MitM，搭配MitM才能最大化的去除广告；<br>
建议添加证书模块，避免因配置变化导致证书失效；<br>
证书信任之后，请勿在设置中移除证书，否则MitM将会失效；<br>
证书模块添加成功后，“HTTPS解密”开关将不再重要，默认开启（模块的优先级高于配置）；<br>
MitM开启办法：
点击配置文件ⓘ - HTTPS解密 - 证书 - 生成新的CA证书 - 安装证书；<br>
系统设置 - 已下载描述文件 - 安装；<br>
系统设置 - 通用 - 关于本机 - 证书信任设置 - 开启对应Shadowrocket证书信任；<br>
点击「已安装证书的配置文件」后面ⓘ - HTTPS解密 - 证书后面ⓘ - 复制；<br>
打开Shadowrocket，点击[配置]，点击新建模块：<br>
```
#!name = 证书（名字可更改）
[MITM]
enable = true
ca-passphrase = 证书密码（即「已安装证书的配置文件」的证书密码，默认密码是Shadowrocket）
ca-p12 = 证书内容（即剪贴板复制的内容）
```

#### 融合模块：
[*融合模块--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule)<br>
说明：基于“墨鱼去广告模块”定制，修改部分功能，每周一的8时自动构建；<br>
使用办法：使用手机访问此页面，点击链接，一键安装；<br>
融合功能如下：<br>
功能模块：
墨鱼去开屏(ddgksf2013)，
京东历史比价(wf021325)；
<br>
软件净化：
YouTube（Maasea），
哔哩哔哩(ddgksf2013)，
微博(ddgksf2013)，
小红书(ddgksf2013)，
菜鸟裹裹(ddgksf2013)，
知乎(ddgksf2013)，
皮皮虾(ddgksf2013)，
高德地图(XiangwanGuan)，
彩云天气(XiangwanGuan)；
<br>
由于配置及网络的多样及不确定性，本模块仅接受搭配使用<Rules.conf>和<RulesLife.conf>这两配置的Issues，请悉知；<br>

#### 鸣谢：（排名不分先后）<br>
[*@blackmatrix7*](https://github.com/blackmatrix7)
[*@ddgksf2013*](https://github.com/ddgksf2013)
[*@Maasea*](https://github.com/Maasea)
[*@wf021325*](https://github.com/wf021325)
[*@LOWERTOP*](https://github.com/LOWERTOP)
