import os
from pathlib import Path

from lib import create_file, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, project = create_project()

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/app.py")
    create_file(file_name, f"print('New Project {project}')")

    print("Init pip environment")
    # os.system("pipenv shell")
    os.system("pipenv install requests argparse python-dotenv")
    os.system("pipenv install autopep8 --dev")

    add_git(project)

    os.system("code .")
