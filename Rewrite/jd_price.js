/*
# 京东比价
# 由向晚维护；
# 脚本修改来源 https://raw.githubusercontent.com/mw418/Loon/main/script/jd_price.js

[rewrite_local]
^https?:\/\/in\.m\.jd\.com\/product\/graphext\/\d+\.html url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/jd_price.js

[mitm]
hostname = in.m.jd.com
*/

const consolelog = false;
const url = $request.url;
const $ = new Env("京东比价");
var regex = /product\/graphext\/(\d+)\.html/;
var match = url.match(regex);
let shareUrl = "https://item.m.jd.com/product/" + match[1] + '.html'

request_history_price(shareUrl).then(data => {
    if (data) {
        if (data.ok === 1 && data.single) {
            const lower = lowerMsgs(data.single);
            const detail = priceSummary(data);
            const tip = data.PriceRemark.Tip + "(仅供参考)";
            const message =  `${lower} ${tip}`;
            $.msg(data.single.title, message, detail)
        } else if (data.ok === 0 && data.msg.length > 0) {
            const message = "慢慢买提示您：" + data?.msg;
            $.msg('比价结果', '', message)
        }
        $done({});
    } else {
        $done({});
    }
}).catch(() => {
    $done({});
});

function lowerMsgs(single) {
    const lower = single.lowerPriceyh
    const timestamp = parseInt(single.lowerDateyh.match(/\d+/), 10);
    const lowerDate = $.time('yyyy-MM-dd', timestamp);
    const lowerMsg = "历史最低:¥" + String(lower) + `(${lowerDate}) `
    return lowerMsg
}

function priceSummary(data) {
    let summary = "";
    let listPriceDetail = data.PriceRemark.ListPriceDetail.slice(0, 4);
    let list = listPriceDetail.concat(historySummary(data.single));
    const maxWidth = list.reduce((max, item) => Math.max(max, item.Price.length), 0);
    list.forEach(item => {
        const nameMap = {
            "双11价格": "双十一价格",
            "618价格": "六一八价格"
        };
        item.Name = nameMap[item.Name] || item.Name;
        Delimiter = '  ';
        if(item.Price=='-'){return}
        let len = item.Price.length
        if (len < maxWidth){
            item.Price = item.Price.includes('.')||(len + 1 == maxWidth)?item.Price:`${item.Price}.`
            let flag = item.Price.includes('.')?'0':' '
            item.Price = item.Price.padEnd(maxWidth, flag)        
        }
        summary += `${item.Name}${Delimiter}${item.Price}${Delimiter}${item.Date}${Delimiter}${item.Difference=='-'?'':item.Difference}\n`;
    });
    summary = summary.replace(/\n$/, "")
    return summary;
}

function historySummary(single) {
    let currentPrice, lowest30, lowest90, lowest180, lowest360;
    const singleArray = JSON.parse(`[${single.jiagequshiyh}]`);
    const singleFormatted = singleArray.map(item => ({
        Date: item[0],
        Price: item[1],
        Name: item[2]
    }));
    let list = singleFormatted.reverse().slice(0, 360);
    const createLowest = (name, price, date) => ({
        Name: name,
        Price: `¥${price}`,
        Date: date,
        Difference: difference(currentPrice, price),
        price
    });
    list.forEach((item, index) => {
        const date = $.time('yyyy-MM-dd', item.Date)
        let price = item.Price;
        if (index === 0) {
            currentPrice = price;
            lowest30 = createLowest("三十天最低", price, date);
            lowest90 = createLowest("九十天最低", price, date);
            lowest180 = createLowest("一百八最低", price, date);
            lowest360 = createLowest("三百六最低", price, date);
        }
        const updateLowest = (lowest, days) => {
            if (index < days && price < lowest.price) {
                lowest.price = price;
                lowest.Price = `¥${price}`;
                lowest.Date = date;
                lowest.Difference = difference(currentPrice, price);
            }
        };
        updateLowest(lowest30, 30);
        updateLowest(lowest90, 90);
        updateLowest(lowest180, 180);
        updateLowest(lowest360, 360);
    });
    return [lowest30, lowest90, lowest180, lowest360];
}

function difference(currentPrice, price, precision = 2) {
    const diff = (parseFloat(currentPrice) - parseFloat(price)).toFixed(precision);
    return diff == 0 ? "-" : `${diff > 0 ? "↑" : "↓"}${Math.abs(diff)}`;
}

function request_history_price(share_url) {
    return new Promise((resolve, reject) => {
        const options = {
            url: "https://apapia-history.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                "User-Agent": "iPhone/CFNetwork/Darwin"
            },
            body: 'methodName=getHistoryTrend&p_url=' + encodeURIComponent(share_url)
        };
        $.post(options, (error, response, data) => {
            if (error) {
                consolelog && console.log("Error:\n" + error);
                reject(error);
            } else {
                consolelog && console.log("Data:\n" + data);
                resolve(JSON.parse(data));
            }
        });
    });
}

function Env(t, e) {
    class s {
      constructor(t) {
        this.env = t;
      }
      send(t, e = "GET") {
        t = "string" == typeof t ? { url: t } : t;
        let s = this.get;
        if ("POST" === e) s = this.post;
        const i = new Promise((e, i) => {
          s.call(this, t, (t, s, o) => {
            t ? i(t) : e(s);
          });
        });
        return t.timeout
          ? ((t, e = 1000) =>
              Promise.race([t, new Promise((t, s) => {
                setTimeout(() => {
                  s(new Error("请求超时"));
                }, e);
              })]))(i, t.timeout)
          : i;
      }
      get(t) {
        return this.send.call(this.env, t);
      }
      post(t) {
        return this.send.call(this.env, t, "POST");
      }
    }
    return new class {
      constructor(t, e) {
        this.name = t;
        this.http = new s(this);
        this.data = null;
        this.dataFile = "box.dat";
        this.isMute = false;
        this.isNeedRewrite = false;
        this.startTime = new Date().getTime();
        Object.assign(this, e);
      }
      msg(e = "", s = "", i = "", o = {}) {
        if (!this.isMute) {
          const r = t => {
            const { $open: e, $copy: s, $media: i, $mediaMime: o } = t;
            switch (typeof t) {
              case "string":
                return { url: t };
              case "object":
                const r = {};
                let a = t.openUrl || t.url || t["open-url"] || e;
                a && Object.assign(r, { action: "open-url", url: a });
                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                n && Object.assign(r, { action: "clipboard", text: n });
                if (i) {
                  let t, e, s;
                  if (i.startsWith("http")) t = i;
                  else if (i.startsWith("data:")) {
                    const [a] = i.split(";");
                    [, o] = i.split(",");
                    e = o;
                    s = a.replace("data:", "");
                  } else {
                    e = i;
                    s = (t => {
                      const e = { JVBERi0: "application/pdf", R0lGODdh: "image/gif", iVBORw0KGgo: "image/png" };
                      for (var s in e)
                        if (0 === t.indexOf(s)) return e[s];
                      return null;
                    })(i);
                  }
                  Object.assign(r, { "media-url": t, "media-base64": e, "media-base64-mime": o ?? s });
                }
                return Object.assign(r, { "auto-dismiss": t["auto-dismiss"], sound: t.sound });
              default:
                return {};
            }
          };
          $notification.post(e, s, i, r(o));
        }
      }
      done(t = {}) {
        const e = (new Date().getTime() - this.startTime) / 1000;
        $done(t);
      }
    }(t, e);
  }
