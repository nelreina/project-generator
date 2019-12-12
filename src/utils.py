import os
import argparse
from pathlib import Path

GITIGNORE = {
    "python": [".env", ".Ds_Store","data", ".vscode", ".venv", "__pycache__"],
    "nodejs": [".env", ".Ds_Store","data", ".vscode", "node_modules"]
}


def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')


def parse_args():
    parser = argparse.ArgumentParser(
        description="Create a new Project in SRC folder")
    parser.add_argument("project", help="Project name", default="temp")
    parser.add_argument("-t", "--is_tut", dest="is_tut", nargs='?',
                        help="Is a tutorial", type=str2bool, default=True)
    return parser.parse_args()


def create_file(name, text):
    print(f'Creating file "{name}"')
    with open(name, "w") as new_file:
        new_file.write(text + "\n")


def add_git(project):
    print("Init git")
    os.system("git init")
    os.system("git add .")
    os.system(f'git commit -m "generated project {project}"')


def create_project(lang="python"):
    print(f"Start create project")
    args = parse_args()
    DIR_CURRENT_WORKING = os.getcwd()
    DIR_SRC_HOME = Path.joinpath(Path.home(), "Documents/SRC")
    project = f'tutorials/{lang}/' + \
        args.project if bool(args.is_tut) else args.project
    DIR_PROJECT_FOLDER = Path.joinpath(DIR_SRC_HOME, project)
    print(DIR_PROJECT_FOLDER)
    # Remove Pojects Folder if exists
    if os.path.exists(DIR_PROJECT_FOLDER):
        print(f'Project "{DIR_PROJECT_FOLDER}" already exists')
        exit()

    print(f"Changing dir to {DIR_SRC_HOME}")
    os.chdir(DIR_SRC_HOME)
    print(f'Creating "{project}" in "{DIR_SRC_HOME}"')
    os.makedirs(project)

    print(f"Changing dir to {DIR_PROJECT_FOLDER}")
    os.chdir(DIR_PROJECT_FOLDER)
    print(f"Create src folder in {DIR_PROJECT_FOLDER}")
    os.mkdir("src")
    
    print(f"Create data folder in {DIR_PROJECT_FOLDER}")
    os.mkdir("data")

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, ".gitignore")
    create_file(file_name, "\n".join(GITIGNORE.get(lang)))

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, ".env")
    create_file(file_name, "")

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "README.md")
    create_file(file_name, f"# Project {args.project}")

    return DIR_PROJECT_FOLDER, args.project
