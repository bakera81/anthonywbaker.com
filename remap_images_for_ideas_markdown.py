import re
from datetime import datetime

img_map = {
    '![alt_text](images/image1.png "image_tooltip")': {
        'alt': 'SaaS Retention Curve', 'file': 'pm+fit+3.png'
    },
    '![alt_text](images/image2.jpg "image_tooltip")': {
        'alt': 'P/M/M/C Fit', 'file': 'whatsneededtobuild100M-Reforge.jpg'
    }
}

with open('src/data/ideas/ideas_v2.md') as f:
    raw_md = f.read()

# Remove warnings
warning_pattern_1 = re.compile(r'^.*?\n#', re.DOTALL)
raw_md = re.sub(warning_pattern_1, '#', raw_md)

warning_pattern_2 = re.compile(r'<p id="gdcalert.*?</p>')
raw_md = re.sub(warning_pattern_2, '', raw_md)


for key, value in img_map.items():
    alt_text = value.get('alt')
    filename = value.get('file')
    new_img = '![' + alt_text + '](../../images/ideas/' + filename + ')'
    raw_md = raw_md.replace(key, new_img)

yaml_header = '---\ndate: ' + datetime.today().strftime('%Y-%m-%d') + '\n---\n\n'

with open('src/data/ideas/ideas_new.md', 'w') as f:
    f.write(yaml_header + raw_md)
