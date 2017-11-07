from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html.j2')

@app.route('/landing')
def landing():
    return render_template('landing.html.j2', title_addendum='')

@app.route('/recipes')
def recipes():
    return render_template('recipes/index.html.j2', title_addendum=' | Recipes')

@app.route('/recipes/<recipe>')
def render_recipe(recipe):
    return render_template('recipes/{0}.html.j2'.format(recipe), title_addendum=' | Recipes')
