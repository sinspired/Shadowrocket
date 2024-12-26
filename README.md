### Shadowrocket 配置/模块<br>

#### Rules.conf - 配置介绍
##### 配置功能介绍：<br>
自动分配策略组，无需手动切换节点；<br>
具有强大的广告拦截功能；<br>
具有有效的防追踪/劫持功能；<br>
ChatGPT等AI工具单独分流；<br>
WeChat/Telegram单独分流，规避因配置变化导致的封号风险；<br>
Apple/Microsoft/Goole单独分流；<br>
国内地址/国际地址，国内媒体/国际媒体，可单独分流；<br>
使用加密的DoH，防止DNS泄露，并有效屏蔽未加密的DNS查询；<br>
完善的规则，配合Shadowrocket的配置自动更新，一次操作，无须后续操作；<br>

##### 使用必看：<br>
你所使用的节点，必须包含<美国节点>，<新加坡节点>；<br>
如不包含这两地区节点，则需要自行修改正则；<br>
本策略默认指定Telegram使用<新加坡节点>，其他规则使用<美国节点>；<br>

##### 修改分流：<br>
打开Shadowrocket首页，下拉，选择你想要修改的分流，选择策略即可；<br>
为了保证完全接管流量，本策略默认使用<美国优先>兜底；<br>

#### RulesLite.conf - 配置介绍
##### 配置功能介绍：<br>
基于Rules.conf精简，除不包含策略组以外，其余配置完全相同；<br>
如不需要策略组及自动分流，建议使用此配置；<br>

##### 规则地址：<br>
[*RulesLite.conf--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/RulesLite.conf)<br>

##### 使用办法：<br>
使用手机访问此页面，点击链接，一键安装，应用即可；<br>
如无法加载配置，请切换至[代理]模式，或自行检查网络；<br>


##### 规则地址：<br>
[*Rules.conf--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://config/add/https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules.conf)<br>

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
说明：基于“墨鱼去广告模块”定制，修改部分功能，每日自动构建；<br>
使用办法：使用手机访问此页面，点击下面的链接，一键安装；<br>
[*融合模块--点击链接，一键安装；*](https://lowertop.github.io/Shadowrocket-First/redirect.html?url=shadowrocket://install?module=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Module.sgmodule)<br>
融合功能如下： 
墨鱼去开屏，京东历史比价；<br>
软件净化：YouTube，喜马拉雅，哔哩哔哩，微博，高德地图，小红书，网易云音乐，菜鸟裹裹，豆瓣，起点，知乎，百度网盘；<br>

#### 本策略依赖如下项目：<br>
[*blackmatrix7/ios_rule_script*](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Shadowrocket)<br>

#### 鸣谢：（排名不分先后）<br>
[*@blackmatrix7*](https://github.com/blackmatrix7)
[*@ddgksf2013*](https://github.com/ddgksf2013)
[*@Maasea*](https://github.com/Maasea)
[*@wf021325*](https://github.com/wf021325)
[*@iab0x00*](https://github.com/iab0x00)
[*@LOWERTOP*](https://github.com/LOWERTOP)
