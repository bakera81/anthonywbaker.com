from bs4 import BeautifulSoup
from bs4 import NavigableString
import yaml

slug = 'meat-bowl'
path = '/Users/AB/Dropbox/Dev/Sites/recipes/flask/templates/recipes/{}.html.j2'.format(slug)
with open(path) as f:
    soup = BeautifulSoup(f, 'html.parser')

def get_wrapper_div(tag):
    return tag.get('class') == ['col-sm-6']

def get_title_span(tag):
    return tag.get('class') == ['header']

tags = soup.find_all(get_wrapper_div)

title = soup.find(get_title_span).get_text()

def reformat(tag, mode):
    output = []
    if mode == "ingredients":
        items = [i for i in tag.ul.contents if type(i) != NavigableString]
    else:
        items = [i for i in tag.ol.contents if type(i) != NavigableString]
    for item in items:
        # import pdb; pdb.set_trace()
        if item.name == 'li':
            output.append({
                'text': item.get_text()
            })
        else:
            output[-1]['protip'] = item.get_text()
    return output


recipe = {
    'title': title,
    'ingredients': reformat(tags[0], mode="ingredients"),
    'instructions': reformat(tags[1], mode="instructions")
}


with open('/Users/AB/Dropbox/Dev/Sites/recipes/recipes/src/data/{}.yml'.format(slug), 'w') as outfile:
    yaml.dump(recipe, outfile, default_flow_style=False)
