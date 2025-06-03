import os
import re
import datetime
import requests

def load_content(url):
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

def build_sgmodule(js_content, project_name):
    formatted_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S")
    rewrite_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(reject(?:-200|-array|-dict|-img|-tinygif)?)'
    echo_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(echo-response)\s+(\S+)\s+(echo-response)\s+(\S+)'
    header_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url-and-header\s+(reject(?:-drop|-no-drop)?)\s*'
    jq_pattern = r'^(?!.*#.*)(.*?)\s+jsonjq-response-body\s+(?:\'([^\']+)\'|jq-path="([^"]+)")'
    script_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(script-response-body|script-request-body|script-echo-response|script-request-header|script-response-header|script-analyze-echo-response)\s+(\S+)'
    body_pattern = r'^(?!.*#.*)(?!.*;.*)(.*?)\s*url\s+(response-body)\s+(\S+)\s+(response-body)\s+(\S+)'
    mitm_pattern = r'^\s*hostname\s*=\s*([^\n#]*)\s*(?=#|$)'

    sgmodule_content = f"""#!name={project_name}
#!desc={formatted_time}

[Rule]
AND, ((PROTOCOL,UDP),(DST-PORT,443)), REJECT

[URL Rewrite]
"""
    url_content = ""
    for match in re.finditer(rewrite_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        reject_type = match.group(2).strip()
        url_content += f"{pattern} - {reject_type}\n"
    for match in re.finditer(echo_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        url_content += f"{pattern} - reject-200\n"
    for match in re.finditer(header_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        reject_type = match.group(2).strip()
        url_content += f"{pattern} url-and-header {reject_type}\n"
    url_lines = [line for line in url_content.splitlines() if line.strip()]
    unique_lines = sorted(set(url_lines))
    url_content = '\n'.join(unique_lines)
    sgmodule_content += url_content + "\n"

    sgmodule_content += f"""
[Body Rewrite]
"""
    http_response_jq = ""
    for match in re.finditer(jq_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        jq_expr = match.group(2)
        jq_path = match.group(3)
        if jq_expr:
            http_response_jq += f"http-response-jq {pattern} '{jq_expr}'\n"
        elif jq_path:
            http_response_jq += f'http-response-jq {pattern} jq-path="{jq_path}"\n'
    sgmodule_content += http_response_jq

    sgmodule_content += f"""
[Script]
"""
    script_content = ""
    for match in re.finditer(script_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        script_type_raw = match.group(2)
        script_path = match.group(3).strip().rstrip(',')
        filename_match = re.search(r'/([^/]+?)(?:\.js)?$', script_path)
        filename = filename_match.group(1).strip() if filename_match else script_path
        script_type = 'response' if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header'] else 'request'
        needbody = "true" if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header', 'script-request-body', 'script-analyze-echo-response'] else "false"
        params = [
            f"{filename} =type=http-{script_type}",
            f"pattern={pattern}",
            f"script-path={script_path}",
            f"requires-body={needbody}",
            "max-size=0"
        ]
        line_start = match.start()
        line_end = js_content.find('\n', line_start)
        line = js_content[line_start:line_end if line_end != -1 else None]
        binary_body_mode_match = re.search(r'binary-body-mode\s*=\s*(true|false)', line)
        if binary_body_mode_match:
            params.append(f"binary-body-mode={binary_body_mode_match.group(1)}")
        argument_match = re.search(r'argument\s*=\s*(".*"|{.*}|[.*])', line)
        if argument_match:
            params.append(f'argument={argument_match.group(1)}')
        script_line = ', '.join(params)
        script_content += script_line + "\n"
    script_content = '\n'.join(sorted(set(script_content.splitlines())))
    sgmodule_content += script_content + "\n"
    for match in re.finditer(body_pattern, js_content, re.MULTILINE):
        pattern = match.group(1).strip()
        re1 = match.group(3).strip()
        re2 = match.group(5).strip()
        sgmodule_content += f"ReplaceBody =type=http-response, pattern={pattern}, script-path=https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/ReplaceBody.js, requires-body=true, argument={re1}->{re2},max-size=0\n"
    mitm_matches = set()
    for match in re.finditer(mitm_pattern, js_content, re.MULTILINE):
        hostnames = match.group(1).split(',')
        mitm_matches.update(host.strip() for host in hostnames if host.strip())
    mitm_match_content = ','.join(sorted(mitm_matches))

    sgmodule_content += f"""
[MITM]
hostname = %APPEND% {mitm_match_content}
"""
    return sgmodule_content

def process_urls(urls, project_name, parent_dir):
    combined_js_content = ""
    for url in urls:
        js_content = load_content(url)
        if js_content:
            combined_js_content += js_content + "\n"
        else:
            print(f"Failed to download or process the content from {url}.")
    sgmodule_content = build_sgmodule(combined_js_content, project_name)
    if sgmodule_content:
        output_file = os.path.join(parent_dir, "Module.sgmodule")
        save_content(sgmodule_content, output_file)
        print(sgmodule_content)
        print(f"Successfully converted and saved to {output_file}")
    else:
        print("Combined content does not meet the requirements for conversion.")

def save_content(content, file_path):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except IOError as e:
        print(f"Error saving content to {file_path}: {e}")

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    input_file_path = os.path.join(parent_dir, "ModuleBuild", "BuildList.conf")
    print("Input file path:", input_file_path)
    try:
        with open(input_file_path, 'r') as file:
            urls = [line.strip() for line in file if line.strip() and not line.strip().startswith('#')]
    except IOError as e:
        print(f"Error reading the input file: {e}")
        exit(1)
    process_urls(urls, "融合模块", parent_dir)

if __name__ == "__main__":
    main()
