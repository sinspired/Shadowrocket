/*
# 批量替换HTTP请求/响应Body内容；
# 由Sinspired重写维护；

# 更新时间: 20250521
# 规则链接: https://raw.githubusercontent.com/Sinspired/Shadowrocket/main/Rewrite/XiangwanConfig/ReplaceBody.js
*/

function getRegexp(str) {
    let m = str.match(/^\/(.*)\/([gimsuy]*)$/);
    if (m) {
        try {
            return new RegExp(m[1], m[2]);
        } catch {
            return null;
        }
    }
    let escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped, "g");
}

if (!$argument?.trim() || !$script || !["http-response", "http-request"].includes($script.type)) {
    $done({});
} else {
    let body = $script.type === "http-response" ? $response.body : $request.body;
    if (!body) {
        $done({});
    } else {
        let replacements = $argument.split(/\r?\n/).map(line => line.trim()).filter(line => line.includes("->"))
            .map(line => {
                let [match, replace] = line.split("->").map(s => s.trim());
                let re = getRegexp(match);
                return re ? { re, replace } : null;
            }).filter(Boolean);

        if (replacements.length === 0) {
            $done({ body });
        } else {
            replacements.forEach(({ re, replace }) => {
                body = body.replace(re, replace);
            });
            $done({ body });
        }
    }
}
