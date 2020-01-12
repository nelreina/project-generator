import os
from pathlib import Path

from lib import create_from_template, add_git, create_project


def run(pip=True, open_vs_code=True):
    DIR_PROJECT_FOLDER, args = create_project()
    project = args.project

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/app.py")
    create_from_template("cpy_app_py", file_name, {"project": project})

    if pip:
        print("Init pip environment")
        os.system("pipenv install autopep8 pyinstaller --dev")
        os.system("pipenv install requests python-dotenv")
        if args.packages:
            os.system('pipenv install ' + args.packages)

    add_git(project)
    if open_vs_code:
        os.chdir(DIR_PROJECT_FOLDER)
        os.system("code . src/app.py")


if __name__ == "__main__":
    run()
