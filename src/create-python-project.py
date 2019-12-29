import os
from pathlib import Path

from lib import create_from_template, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, args = create_project()
    project = args.project

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/app.py")
    create_from_template("cpy_app_py", file_name, {"project": project})

    print("Init pip environment")
    os.system("pipenv install argparse python-dotenv")
    os.system("pipenv install autopep8 pyinstaller --dev")
    if args.packages:
        os.system('pipenv install ' + args.packages)

    add_git(project)
    os.chdir(DIR_PROJECT_FOLDER)
    os.system("code . src/app.py")
