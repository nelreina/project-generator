import os
import argparse
from pathlib import Path

GITIGNORE = {
    "python": [".env", ".Ds_Store", "data", ".vscode", ".venv", "__pycache__", "nodemon.json"],
    "nodejs": [".env", ".Ds_Store", "data", ".vscode", "node_modules"],
    "electron": [".env", ".Ds_Store", "data", ".vscode", "node_modules", ".cache", "build", "dist"],
}


def create_gitignore(project_dir, lang):
    file_name = Path.joinpath(project_dir, ".gitignore")
    create_file(file_name, "\n".join(GITIGNORE.get(lang)))


def get_title(name):
    return name.replace('-', ' ').title()


def create_empty_files(dir, empty_files):
    for file in empty_files:
        file_name = Path.joinpath(dir, file)
        create_file(file_name, '')


def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')


def create_from_template(template_name, file_name, obj={}):
    __dirname = os.path.dirname(os.path.abspath(__file__))
    template_file = __dirname + f'/templates/{template_name}'
    with open(template_file) as template:
        text = template.read()
        if obj:
            text = text.format(**obj)
        create_file(file_name, text)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Create a new Project in SRC folder")
    parser.add_argument("project", help="Project name")
    parser.add_argument("-p", "--packages", dest="packages",
                        help="""Install npm or pip packages.
    For multiple packages use quotes! e.g. -p "package1 package2" or --packages "package1 package2"
                        """)
    parser.add_argument("-e", "--pipenv", dest="pipenv", help="With pipenv ?", type=str2bool, default=True)
    parser.add_argument("-f", "--flaskapp", dest="flaskapp", help="is flaskapp ?", type=str2bool, default=False)
    parser.add_argument("-db", "--db_dialect", dest="db_dialect", help="Database db_dialect (postgress, mssql, mysql)", type=str, default='sqlite')

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

    DIR_SRC_HOME = Path.cwd()
    project = args.project

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

    if lang == 'python':
        print(f"Create {project} folder in {DIR_PROJECT_FOLDER}")
        os.mkdir(project)
        
    else:
        print(f"Create src folder in {DIR_PROJECT_FOLDER}")
        os.mkdir("src")

    if lang == 'electron':
        print(f"Create views folder in {DIR_PROJECT_FOLDER}")
        os.mkdir("src/views")

    print(f"Create data folder in {DIR_PROJECT_FOLDER}")
    os.mkdir("data")

    create_gitignore(DIR_PROJECT_FOLDER, lang)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, ".env")
    create_file(file_name, "DEBUG=True")

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "README.md")
    create_file(file_name, f"# Project {args.project}")

    return DIR_PROJECT_FOLDER, args
