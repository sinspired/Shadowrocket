/*
# 京东比价
# 由向晚维护；
# 脚本修改来源 https://github.com/mw418/Loon/blob/main/script/jd_price.js

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
    class HttpClient {
      constructor(env) {
        this.env = env;
      }
      send(t, e = "GET") {
        const method = e === "POST" ? this.post : this.get;
        const requestPromise = new Promise((resolve, reject) => {
          method.call(this.env, t, (err, response) => {
            err ? reject(err) : resolve(response);
          });
        });
        return t.timeout ? this.timeout(requestPromise, t.timeout) : requestPromise;
      }
      timeout(promise, ms) {
        return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("请求超时")), ms))]);
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
        this.http = new HttpClient(this);
        this.data = null;
        this.dataFile = "box.dat";
        this.isMute = false;
        this.isNeedRewrite = false;
        this.encoding = "utf-8";
        this.startTime = new Date().getTime();
        Object.assign(this, e);
      }
      getEnv() {
        return typeof $rocket !== "undefined" ? "Shadowrocket" : undefined;
      }
      getdata(t) {
        return this.isShadowrocket() ? $persistentStore.read(t) : this.data && this.data[t] || null;
      }
      setdata(t, e) {
        return this.isShadowrocket() ? $persistentStore.write(t, e) : (this.data[e] = t, this.writedata(), true);
      }
      loaddata() {
        if (!this.isNode()) return {};
        const fs = require("fs");
        const path = require("path");
        const filePath = path.resolve(this.dataFile) || path.resolve(process.cwd(), this.dataFile);
        if (!fs.existsSync(filePath)) return {};
        try {
          return JSON.parse(fs.readFileSync(filePath));
        } catch (e) {
          return {};
        }
      }
      writedata() {
        if (this.isNode()) {
          const fs = require("fs");
          const path = require("path");
          const filePath = path.resolve(this.dataFile) || path.resolve(process.cwd(), this.dataFile);
          fs.writeFileSync(filePath, JSON.stringify(this.data));
        }
      }
      initGotEnv(t) {
        this.got = this.got || require("got");
        this.cktough = this.cktough || require("tough-cookie");
        this.ckjar = this.ckjar || new this.cktough.CookieJar();
        if (t) {
          t.headers = t.headers || {};
          t.headers.cookie = t.headers.cookie || t.cookieJar && (t.cookieJar = this.ckjar);
        }
      }
      get(t, e = () => {}) {
        if (this.getEnv() === "Shadowrocket") {
          $httpClient.get(t, (err, res, body) => {
            if (!err && res) {
              res.body = body;
              res.statusCode = res.status || res.statusCode;
              res.status = res.statusCode;
            }
            e(err, res, body);
          });
        }
      }
      post(t, e = () => {}) {
        const method = t.method ? t.method.toLowerCase() : "post";
        if (this.getEnv() === "Shadowrocket") {
          $httpClient[method](t, (err, res, body) => {
            if (!err && res) {
              res.body = body;
              res.statusCode = res.status || res.statusCode;
              res.status = res.statusCode;
            }
            e(err, res, body);
          });
        }
      }
      done(t = {}) {
        const duration = (new Date().getTime() - this.startTime) / 1000;
        if (this.getEnv() === "Shadowrocket") {
          $done(t);
        }
      }
    }(t, e);
  }
