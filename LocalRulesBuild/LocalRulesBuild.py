import requests
import os
import sys
import datetime

def generate_beijing_time():
    utc_time = datetime.datetime.now(datetime.timezone.utc)
    beijing_time = utc_time + datetime.timedelta(hours=8)
    return beijing_time.strftime("%Y-%m-%d %H:%M:%S")

def download_rule(url, index, total):
    file_name = url.split("/")[-1]
    print(f"正在处理 ({index:02}/{total:02}): {file_name}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return [line for line in response.text.splitlines() if not line.lstrip().startswith("#")]
    except requests.RequestException as e:
        print(f"规则下载失败: {file_name} - {e}")
        return None

def process_rules(rule_definitions):
    rules = []
    failed_rules = []
    seen_domains = set()
    total_rules = sum(1 for rule in rule_definitions if len(rule) == 3 and rule[0] in ("RULE-SET", "DOMAIN-SET"))
    download_index = 0
    for rule in rule_definitions:
        if len(rule) == 2:
            rule_type, action = rule
            rules.append(f"{rule_type},{action}")
        else:
            rule_type, url, action = rule
            if rule_type == "GEOIP":
                rules.append(f"{rule_type},{url},{action}")
            elif rule_type == "RULE-SET":
                download_index += 1
                if url.startswith("https://"):
                    rule_content = download_rule(url, download_index, total_rules)
                else:
                    rule_content = read_local_rule(url)
                if rule_content is None:
                    failed_rules.append(url)
                else:
                    for line in rule_content:
                        line = line.strip()
                        if line:
                            parts = line.split(",")
                            if len(parts) == 3:
                                parts.insert(2, action)
                            elif len(parts) == 2:
                                parts.append(action)
                            elif len(parts) == 1:
                                parts.append(action)
                            rule_str = ",".join(parts)
                            if rule_str.startswith("DOMAIN-SUFFIX"):
                                domain = parts[1]
                                if domain not in seen_domains:
                                    seen_domains.add(domain)
                                    rules.append(rule_str)
                            elif rule_str.startswith("IP-CIDR"):
                                ip = parts[1]
                                if ip not in seen_domains:
                                    seen_domains.add(ip)
                                    rules.append(rule_str)
                            elif rule_str.startswith("DOMAIN"):
                                domain = parts[1]
                                if domain not in seen_domains:
                                    seen_domains.add(domain)
                                    rules.append(rule_str)
            elif rule_type == "DOMAIN-SET":
                download_index += 1
                if url.startswith("https://"):
                    rule_content = download_rule(url, download_index, total_rules)
                else:
                    rule_content = read_local_rule(url)
                if rule_content is None:
                    failed_rules.append(url)
                else:
                    for line in rule_content:
                        domain = line.strip()
                        if domain:
                            if domain.startswith('.'):
                                domain = domain[1:]
                            if domain not in seen_domains:
                                seen_domains.add(domain)
                                rules.append(f"DOMAIN-SUFFIX,{domain},{action}")
    unique_rules = list(dict.fromkeys(rules))
    return unique_rules, failed_rules

def read_local_rule(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return [line.strip() for line in f.readlines() if not line.lstrip().startswith("#")]
    except Exception as e:
        print(f"读取本地规则文件失败: {file_path} - {e}")
        return None

def save_rules_to_file(rules, file_name):
    try:
        timestamp = generate_beijing_time()
        header = f"#update = {timestamp}\n" 
        header += """
[General]
bypass-system = true
compatibility-mode = 3
tun-excluded-routes = 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.88.99.0/24, 192.168.0.0/16, 224.0.0.0/4, 239.255.255.250/32, 255.255.255.255/32
dns-server = https://dns.alidns.com/dns-query, https://doh.pub/dns-query
fallback-dns-server = https://doh.apad.pro/dns-query
hijack-dns = *:53
icmp-auto-reply = true
private-ip-answer = true
always-reject-url-rewrite = true
dns-direct-fallback-proxy = true
udp-policy-not-supported-behaviour = REJECT

[Proxy Group]
骚扰拦截 = select, REJECT, DIRECT
微信消息 = select, DIRECT, 狮城优选
电报消息 = select, 狮城优选, 香港优选, 美国优选
人工智能 = select, 美国优选, 香港优选, 狮城优选
苹果服务 = select, DIRECT, 美国优选
微软服务 = select, DIRECT, 美国优选
谷歌服务 = select, 美国优选, 香港优选, 狮城优选
国际媒体 = select, 香港优选, 狮城优选, 美国优选
国际代理 = select, 香港优选, 狮城优选, 美国优选
国内媒体 = select, DIRECT, 香港优选, 狮城优选, 美国优选
国内直连 = select, DIRECT, 香港优选, 狮城优选, 美国优选
香港优选 = url-test, url=http://www.gstatic.com/generate_204, interval=900, tolerance=15, timeout=5, select=0, policy-regex-filter=(?i)(?=.*\\bHK\\b|🇭🇰|香港|香江|Hong\s?Kong)
狮城优选 = url-test, url=http://www.gstatic.com/generate_204, interval=900, tolerance=15, timeout=5, select=0, policy-regex-filter=(?i)(?=.*\\bSG\\b|🇸🇬|新加坡|狮城|Singapore)
美国优选 = url-test, url=http://www.gstatic.com/generate_204, interval=900, tolerance=15, timeout=5, select=0, policy-regex-filter=(?i)(?=.*\\bUS\\b|🇺🇸|美国|States|American)

[Rule]
"""
        
        footer = """

[Host]
localhost = 127.0.0.1

[URL Rewrite]
^https?://(www.)?g.cn https://www.google.com 302
^https?://(www.)?google.cn https://www.google.com 302
"""
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write("\n".join(rules))
            f.write(footer)
        print(f"规则已保存到: {file_name}")
    except Exception as e:
        print(f"规则保存失败: {e}")

def main():
    script_dir = os.getcwd()
    output_file = os.path.join(script_dir, "LocalRules.conf")
    rule_definitions = [
        ("RULE-SET", "Rules/Lan.list", "DIRECT"),
        ("RULE-SET", "Rules/Direct.list", "DIRECT"),
        ("RULE-SET", "Rules/BlockHttpDNS.list", "骚扰拦截"),
        ("RULE-SET", "Rules/Hijacking.list", "骚扰拦截"),
        ("RULE-SET", "Rules/Privacy.list", "骚扰拦截"),
        ("DOMAIN-SET", "Rules/Privacy_Domain.list", "骚扰拦截"),
        ("RULE-SET", "Rules/AdvertisingLite.list", "骚扰拦截"),
        ("DOMAIN-SET", "Rules/AdvertisingLite_Domain.list", "骚扰拦截"),
        ("RULE-SET", "Rules/WeChat.list", "微信消息"),
        ("RULE-SET", "Rules/Telegram.list", "电报消息"),
        ("RULE-SET", "Rules/OpenAI.list", "人工智能"),
        ("RULE-SET", "Rules/Copilot.list", "人工智能"),
        ("RULE-SET", "Rules/Gemini.list", "人工智能"),
        ("RULE-SET", "Rules/Apple.list", "苹果服务"),
        ("DOMAIN-SET", "Rules/Apple_Domain.list", "苹果服务"),
        ("RULE-SET", "Rules/Microsoft.list", "微软服务"),
        ("RULE-SET", "Rules/Google.list", "谷歌服务"),
        ("RULE-SET", "Rules/GlobalMedia.list", "国际媒体"),
        ("DOMAIN-SET", "Rules/GlobalMedia_Domain.list", "国际媒体"),
        ("RULE-SET", "Rules/Global.list", "国际代理"),
        ("DOMAIN-SET", "Rules/Global_Domain.list", "国际代理"),
        ("RULE-SET", "Rules/ChinaMedia.list", "国内媒体"),
        ("RULE-SET", "Rules/ChinaNoMedia.list", "国内直连"),
        ("DOMAIN-SET", "Rules/ChinaNoMedia_Domain.list", "国内直连"),
        ("GEOIP", "CN", "国内直连"),
        ("FINAL", "国际代理"),
    ]
    rules, failed_rules = process_rules(rule_definitions)
    save_rules_to_file(rules, output_file)
    if failed_rules:
        print("\n以下规则下载失败，请检查链接或网络:")
        for rule in failed_rules:
            print(f"   - {rule}")

if __name__ == "__main__":
    main()
