import re
from datetime import datetime

img_map = [
    { 'alt': '1-dimensional balance: spectrum', 'file': '1d_spectrum.png' },
    { 'alt': '2-dimensional balance: chords', 'file': '2d_spectrum.png' },
    { 'alt': '3-dimensional balance: sphere', 'file': '3d_spectrum.png' },
    { 'alt': '4-dimensional balance: spheres throught time', 'file': '4d_spectrum.png' },
    { 'alt': 'Speed vs Velocity', 'file': 'speed_vs_velocity.png' },
    { 'alt': 'Impact vs Effort: Linear', 'file': 'linear_impact_vs_effort.png' },
    { 'alt': 'Impact vs Effort: Logarithmic', 'file': 'logarithmic_impact_vs_effort.png' },
    { 'alt': 'Impact vs Effort: Exponential', 'file': 'exponential_impact_vs_effort.png' },
    { 'alt': 'The Product Death Cycle', 'file': 'product-death-cycle-1.jpeg' },
    { 'alt': 'The Product Death Cycle for a feature', 'file': 'product-death-cycle-2.jpeg' },
    { 'alt': 'SaaS Retention Curve', 'file': 'pm+fit+3.png' },
    { 'alt': 'P/M/M/C Fit', 'file': 'whatsneededtobuild100M-Reforge.jpg' }
]

with open('src/data/ideas/ideas.md') as f:
    raw_md = f.read()

# Remove warnings
warning_pattern_1 = re.compile(r'^.*?\n#', re.DOTALL)
raw_md = re.sub(warning_pattern_1, '#', raw_md)

warning_pattern_2 = re.compile(r'<p id="gdcalert.*?</p>')
raw_md = re.sub(warning_pattern_2, '', raw_md)

# Remove everything after the divider
hr_pat = re.compile(r'\n---\n.*', re.DOTALL)
raw_md = re.sub(hr_pat, '', raw_md)

for i, img in enumerate(img_map):
    new_img = '![' + img['alt'] + '](../../images/ideas/' + img['file'] + ')'
    # old = '!\[alt_text\]\(images/image{}.* "image_tooltip"\)'.format(i + 1)
    # pat = re.compile(old)
    pat = re.compile('!\[alt_text\]\(images/image\d.* "image_tooltip"\)')

    # import pdb; pdb.set_trace()
    raw_md = re.sub(pat, new_img, raw_md, count=1)
    # raw_md = raw_md.replace(old, new_img)

yaml_header = '---\ndate: ' + datetime.today().strftime('%Y-%m-%d') + '\n---\n\n'

with open('src/data/ideas/ideas_new.md', 'w') as f:
    f.write(yaml_header + raw_md)
