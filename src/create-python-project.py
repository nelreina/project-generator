import os
from pathlib import Path

from lib import create_file, add_git, create_project


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, args = create_project()
    project = args.project
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/app.py")
    create_file(file_name, f'''"""Project {project}"""
import os
from dotenv import load_dotenv


if __name__ == "__main__":
    load_dotenv()
    print(f"running {project} ...")
    print("DEBUG=" + os.getenv("DEBUG", "False"))


''')

    print("Init pip environment")
    # os.system("pipenv shell")
    os.system("pipenv install requests argparse python-dotenv")
    os.system("pipenv install autopep8 pyinstaller --dev")

    add_git(project)

    os.system("code .")
