import os
import requests
import re
import time
import datetime

def download_content(url):
    if os.path.isfile(url):
        try:
            with open(url, 'r', encoding='utf-8') as file:
                return file.read()
        except IOError as e:
            print(f"Error reading local file {url}: {e}")
            return None
    elif url.startswith("https://"):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Error downloading content from {url}: {e}")
            return None
    else:
        local_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), url)
        if os.path.isfile(local_path):
            try:
                with open(local_path, 'r', encoding='utf-8') as file:
                    return file.read()
            except IOError as e:
                print(f"Error reading local file {local_path}: {e}")
                return None
        else:
            print(f"File not found at {local_path}")
            return None

def save_content(content, file_path):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except IOError as e:
        print(f"Error saving content to {file_path}: {e}")

def rewrite_to_sgmodule(js_content, project_name):
    if not re.search(r'hostname', js_content, re.IGNORECASE):
        return None
    utc_time = datetime.datetime.now(datetime.timezone.utc)
    beijing_time = utc_time + datetime.timedelta(hours=8)
    timestamp = beijing_time.strftime("%Y-%m-%d %H:%M:%S")
    sgmodule_content = f"""#!name={project_name}
#!desc=基于墨鱼去开屏与奶思去广告定制，每日自动构建；
#!update={timestamp}

[Rule]
AND, ((PROTOCOL,UDP),(DST-PORT,443)), REJECT-NO-DROP

[URL Rewrite]
^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&oad - reject
"""
    rewrite_local_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(reject|reject-200|reject-img|reject-dict|reject-array)'
    script_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(script-response-body|script-request-body|script-echo-response|script-request-header|script-response-header|script-analyze-echo-response)\s+(\S+)'
    body_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(response-body)\s+(\S+)\s+(response-body)\s+(\S+)'
    echo_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(echo-response)\s+(\S+)\s+(echo-response)\s+(\S+)'
    mitm_local_pattern = r'^\s*hostname\s*=\s*([^\n#]*)\s*(?=#|$)'
    url_content = "";
    for match in re.finditer(rewrite_local_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        url_content += f"{pattern} - reject\n"
    url_lines = url_content.splitlines()
    unique_lines = [url_lines[0]] + sorted(set(url_lines[1:]))
    url_content = '\n'.join(unique_lines)
    sgmodule_content += url_content
    sgmodule_content += f"""

[Map Local]
"""
    for match in re.finditer(echo_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        re1 = match.group(3).strip()
        re2 = match.group(5).strip()
        if re1 == "text/html":
            sgmodule_content += f'{pattern} data="{re2}" header="Content-Type: text/html"\n'
        else:
            sgmodule_content += f'{pattern} data="{re2}" header="Content-Type: text/json"\n'
    sgmodule_content += f"""
[Script]
AMDC.js =type=http-response, pattern=^http:\/\/amdc\.m\.taobao\.com, script-path=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/AMDC.js, requires-body=true, max-size=-1
youtube =type=http-response, pattern=^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(browse|next|player|search|reel\/reel_watch_sequence|guide|account\/get_setting|get_watch), script-path=https://raw.githubusercontent.com/Maasea/sgmodule/master/Script/Youtube/dist/youtube.response.preview.js, requires-body=true, binary-body-mode=true, max-size=-1, argument='{{"blockUpload":true,"blockImmersive":true,"debug":false}}'
"""
    script_content = ""
    for match in re.finditer(script_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        script_type_raw = match.group(2)
        script_path = match.group(3).strip()
        filename = re.search(r'/([^/]+)$', script_path).group(1)
        script_type = 'response' if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header'] else 'request'
        needbody = "true" if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header', 'script-request-body', 'script-analyze-echo-response'] else "false"
        script_content += f"{filename} =type=http-{script_type}, pattern={pattern}, script-path={script_path}, requires-body={needbody}, max-size=-1\n"
    script_content= '\n'.join(sorted(set(script_content.splitlines())))
    sgmodule_content +=script_content
    for match in re.finditer(body_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        re1 = match.group(3).strip()
        re2 = match.group(5).strip()
        sgmodule_content += f"ReplaceBody.js =type=http-response, pattern={pattern}, script-path=https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/ReplaceBody.js, requires-body=true, argument={re1}->{re2},max-size=-1\n"
    mitm_match_content = ','.join(match.group(1).strip() for match in re.finditer(mitm_local_pattern, js_content, re.MULTILINE))
    unique_content = ','.join(sorted({item.strip() for item in mitm_match_content.split(',')}))
    mitm_match_content = unique_content
    sgmodule_content += f"""
[MITM]
hostname = %APPEND% *.googlevideo.com, youtubei.googleapis.com,{mitm_match_content}
"""
    return sgmodule_content

def process_urls(urls, project_name):
    combined_js_content = ""
    for url in urls:
        js_content = download_content(url)
        if js_content:
            combined_js_content += js_content + "\n"
        else:
            print(f"Failed to download or process the content from {url}.")
    sgmodule_content = rewrite_to_sgmodule(combined_js_content, project_name)
    if sgmodule_content:
        output_file = 'Module.sgmodule'
        save_content(sgmodule_content, output_file)
        print(sgmodule_content);
        print(f"Successfully converted and saved to {output_file}")
    else:
        print("Combined content does not meet the requirements for conversion.")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    input_file_path = os.path.join(parent_dir, "ModuleBuild", "BuildList.conf")
    print("Input file path:", input_file_path)
    try:
        with open(input_file_path, 'r') as file:
            urls = file.readlines()
    except IOError as e:
        print(f"Error reading the input file: {e}")
        exit(1)
    project_name = "融合模块"
    process_urls([url.strip() for url in urls if url.strip()], project_name)
