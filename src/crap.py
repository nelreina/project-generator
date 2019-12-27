from lib import create_file
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
    app_jsx = f'''
  import React from 'react';
  import './App.css';

  function App() {{
    return (
      <h1>App: {project_name}</h1>  
    );
  }}

  export default App;
  '''
    file_name = Path.joinpath(src_dir, "App.jsx")
    create_file(file_name, app_jsx)


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
    index_css = '''
root {{}}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
'''
    file_name = Path.joinpath(src_dir, "index.css")
    create_file(file_name, index_css)
