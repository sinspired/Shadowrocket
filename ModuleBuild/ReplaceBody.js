/*
修改HTTP请求或响应的Body内容;
*/

function getRegexp(re_str) {
    let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
    if (regParts) {
        try {
            return new RegExp(regParts[1], regParts[2]);
        } catch (e) {
            console.log(`Invalid regex: ${re_str}`);
            return null;
        }
    } else {
        try {
            return new RegExp(re_str);
        } catch (e) {
            console.log(`Invalid regex: ${re_str}`);
            return null;
        }
    }
}

let body;
if (typeof $argument == "undefined") {
    console.log("requires $argument");
} else {
    if ($script.type === "http-response") {
        body = $response.body;
    } else if ($script.type === "http-request") {
        body = $request.body;
    } else {
        console.log("script type error");
    }
}

if (body) {
    let replacements = [];
    $argument.split("&").forEach((item) => {
        if (!/^[^->]+->[^->]+$/.test(item)) {
            console.log(`Invalid argument format: ${item}`);
            return;
        }
        let [match, replace] = item.split("->").map(s => s.trim());
        if (match && replace) {
            let re = getRegexp(match);
            if (re) {
                replacements.push({ re, replace });
            }
        } else {
            console.log(`Invalid match->replace pair: ${item}`);
        }
    });
    replacements.forEach(({ re, replace }) => {
        body = body.replace(re, replace);
    });
    $done({ body });
} else {
    console.log("No modification applied.");
    $done({});
}
