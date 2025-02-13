/*
# 修改HTTP请求或响应的Body内容；
# 由向晚维护；
*/

function getRegexp(re_str) {
    let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
    if (regParts) {
        try {
            return new RegExp(regParts[1], regParts[2]);
        } catch (e) {
            return null;
        }
    } else {
        try {
            return new RegExp(re_str);
        } catch (e) {
            return null;
        }
    }
}
let body;
if (typeof $argument == "undefined") {
    $done({});
} else {
    if ($script && $script.type === "http-response") {
        body = $response.body;
    } else if ($script && $script.type === "http-request") {
        body = $request.body;
    } else {
        $done({});
        return;
    }
    if (body) {
        let replacements = [];
        if (!$argument || $argument.trim() === "") {
            $done({ body });
            return;
        }
        $argument.split("&").forEach((item) => {
            if (!/^[^->]+->[^->]+$/.test(item)) {
                return;
            }
            let [match, replace] = item.split("->").map(s => s.trim());
            if (match && replace) {
                let re = getRegexp(match);
                if (re) {
                    replacements.push({ re, replace });
                }
            }
        });
        if (replacements.length > 0) {
            replacements.forEach(({ re, replace }) => {
                body = body.replace(re, replace);
            });
            $done({ body });
        } else {
            $done({ body });
        }
    } else {
        $done({});
    }
}
