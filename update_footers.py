import os
import re

html_files = [
    'index.html',
    '404.html',
    'about/index.html',
    'basics/index.html',
    'for-parents/index.html',
    'for-teens/index.html',
    'get-help/index.html',
    'warning-signs/index.html'
]

footer_base_pattern = re.compile(r'(<div class="footer-base">\s*<p>.*?<\/p>\s*)<p>&copy; 2026 Zolsi\.CC<\/p>(\s*<\/div>)', re.DOTALL)

replacement = r'''\1<div class="footer-bottom" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; width: 100%;">
        <p style="margin:0;">&copy; 2026 Zolsi.CC</p>
        <div class="textsize">
          <label class="textsize-label u-visually-hidden" for="lang-select">Language</label>
          <select id="lang-select" onchange="window.switchLanguage(this.value)">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>\2'''

for filepath in html_files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Determine relative path back to root for the option values if needed
        # Actually, language switch should redirect to /es/path/
        
        new_content = footer_base_pattern.sub(replacement, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
