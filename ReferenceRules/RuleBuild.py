import requests
import os
import sys

def download_rule(url, index, total):
    file_name = url.split("/")[-1]
    print(f"Processing ({index:02}/{total:02}): {file_name}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return [line for line in response.text.splitlines() if not line.lstrip().startswith("#")]
    except requests.RequestException as e:
        print(f"Failed to download rule: {file_name} - {e}")
        return None

def process_rules(rule_definitions):
    rules = []
    failed_rules = []
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
            else:
                download_index += 1
                rule_content = download_rule(url, download_index, total_rules)
                if rule_content is None:
                    failed_rules.append(url)
                else:
                    rules.extend([f"{rule_type},{line},{action}" for line in rule_content if line.strip()])
    unique_rules = list(dict.fromkeys(rules))
    return unique_rules, failed_rules

def save_rules_to_file(rules, file_name):
    try:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write("\n".join(rules))
        print(f"Rules saved to: {file_name}")
    except Exception as e:
        print(f"Failed to save rules: {e}")

def main():
    script_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
    output_file = os.path.join(script_dir, "ReferenceRules", "ReferenceRules.md")
    rule_definitions = [
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Lan.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Direct.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/BlockHttpDNS.list", "REJECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Hijacking.list", "REJECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Privacy.list", "REJECT"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Privacy_Domain.list", "REJECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/AdvertisingLite.list", "REJECT"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/AdvertisingLite_Domain.list", "REJECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/WeChat.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Telegram.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/OpenAI.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Copilot.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Gemini.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Apple.list", "DIRECT"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Apple_Domain.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Microsoft.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Google.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/GlobalMedia.list", "PROXY"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/GlobalMedia_Domain.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Global.list", "PROXY"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/Global_Domain.list", "PROXY"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/ChinaMedia.list", "DIRECT"),
        ("RULE-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/ChinaMaxNoMedia.list", "DIRECT"),
        ("DOMAIN-SET", "https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rules/ChinaMaxNoMedia_Domain.list", "DIRECT"),
        ("GEOIP", "CN", "DIRECT"),
        ("FINAL", "PROXY"),
    ]
    rules, failed_rules = process_rules(rule_definitions)
    save_rules_to_file(rules, output_file)
    if failed_rules:
        print("\nThe following rule downloads failed. Please check the links or network:")
        for rule in failed_rules:
            print(f"   - {rule}")

if __name__ == "__main__":
    main()
