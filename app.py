from flask import Flask
from flask import render_template, request
app = Flask(__name__)

@app.route('/')
def index():
    highlight = request.args.get('highlight')
    return render_template('index.html.j2', highlight=highlight)
    # https://stackoverflow.com/questions/26536187/is-it-possible-to-dynamically-update-a-rendered-template-in-flask-server-side
    # if not highlight:
    #     return render_template('index.html.j2', highlight=None)
    # elif hightlight == 'about':
    #     return render_template('index.html.j2', highlight='about')
    # elif hightlight == 'resume':
    #         return render_template('index.html.j2', highlight='resume')
    # elif hightlight == 'projects':
    #         return render_template('index.html.j2', highlight='projects')
    # elif hightlight == 'writing':
    #     return render_template('index.html.j2', highlight='writing')
    # else:
    #     return render_template('index.html.j2', highlight=None)

@app.route('/landing')
def landing():
    # If I get rid of the landing, I don't need cookies...
    # resp = make_response(render_template(...))
    # resp.set_cookie('username', 'the username')
    # return resp
    return render_template('landing.html.j2', title_addendum='')

@app.route('/recipes')
def recipes():
    return render_template('recipes/index.html.j2', title_addendum=' | Recipes')

@app.route('/recipes/<recipe>')
def render_recipe(recipe):
    return render_template('recipes/{0}.html.j2'.format(recipe), title_addendum=' | Recipes')
