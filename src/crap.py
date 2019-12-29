from lib import create_file, create_from_template
from pathlib import Path
import os


def handle_index_html(dir, project_name):
    path_html = Path.joinpath(dir, 'index.html')
    title = project_name.replace('-', ' ').title()
    with open(path_html) as index_html:
        html = index_html.read()
        html = html.replace('<title>React App</title>',
                            f'<title>App: {title}</title>')
        create_file(path_html, html)


def create_app_jsx(src_dir, project_name):
    title = project_name.replace('-', ' ').title()
    file_name = Path.joinpath(src_dir, "App.jsx")
    create_from_template("crap_app_jsx", file_name, {
                         "project_name": title})


def remove_files():
    remove_file_list = 'App.* index.css logo.svg setupTests.js'
    os.system('rm ' + remove_file_list)


def create_empty_files(dir, empty_files):
    for file in empty_files:
        file_name = Path.joinpath(dir, file)
        create_file(file_name, '')


def handle_readme_file(dir, project_name):
    os.system('rm README.md')
    file_name = Path.joinpath(dir, "README.md")
    create_file(file_name, f'# {project_name.upper()}')


def create_index_css(src_dir):
    file_name = Path.joinpath(src_dir, "index.css")
    create_from_template('crap_index_css', file_name)
