import os
from pathlib import Path

from utils import create_file, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, project = create_project("nodejs")

    pjson = '''{{
  "name": "{}",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {{
    "dev": "nodemon --watch src src/index",
    "start": "node src/index"
  }},
  "license": "MIT"
}}'''.format(project)

    print("Create package.json file")
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "package.json")
    create_file(file_name, pjson)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/index.js")
    create_file(file_name, f"console.info('New Project {project}')")

    print("Init node environment")
    os.system("yarn add nodemon -D")

    add_git(project)

    os.system("code .")
