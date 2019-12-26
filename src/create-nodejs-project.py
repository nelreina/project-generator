import os
from pathlib import Path

from lib import create_file, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, args = create_project("nodejs")
    project = args.project
    pjson = '''{{
  "name": "{}",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {{
    "dev": "nodemon --watch src src/index --dev=true",
    "start": "node src/index"
  }},
  "license": "MIT"
}}'''.format(project)

    print("Create package.json file")
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "package.json")
    create_file(file_name, pjson)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/index.js")
    create_file(file_name, f"""require('dotenv').config();
const log4js = require('@nelreina/node-log4js');
    
const argv = require('minimist')(process.argv.slice(2));
const logger = log4js('{project}');
const DEBUG = process.env['DEBUG'];

logger.info(`Start Project {project}: ${{JSON.stringify({{DEBUG, argv}})}}  `)
    """)

    pcks = 'moment string lodash axios dotenv minimist @nelreina/node-log4js '
    if args.packages:
        pcks += args.packages

    print("Init node environment")
    os.system("yarn add nodemon -D")
    os.system(f"yarn add {pcks}")
    add_git(project)

    os.system("code .")
