import os
from pathlib import Path

from lib import create_from_template, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, args = create_project("nodejs")
    project = args.project

    print("Create package.json file")
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "package.json")
    create_from_template("cnode_package_json", file_name, {"project": project})

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/index.js")
    create_from_template("cnode_index_js", file_name, {"project": project})

    pcks = 'moment string lodash axios dotenv minimist @nelreina/node-log4js '
    if args.packages:
        pcks += args.packages

    print("Init node environment")
    os.system("yarn add nodemon -D")
    os.system(f"yarn add {pcks}")
    add_git(project)

    os.system("code .")
    os.chdir(DIR_PROJECT_FOLDER)
    os.system("yarn dev")
