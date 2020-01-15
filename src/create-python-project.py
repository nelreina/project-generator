import os
from pathlib import Path

from lib import create_from_template, add_git, create_project, parse_args


def run(pip=True, open_vs_code=True):

    DIR_PROJECT_FOLDER, args = create_project()
    project = args.project

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/app.py")
    create_from_template("cpy_app_py", file_name, {"project": project})

    if pip:
        print("Init pip environment")
        os.system("pipenv install autopep8 pyinstaller ptpython --dev")
        os.system("pipenv install requests python-dotenv")
        
        if args.flaskapp:
            flask_dependencies = [
                'flask', 
                'flask-sqlalchemy', 
                'flask-migrate', 
                'flask-marshmallow', 
                'marshmallow-sqlalchemy',
            ]
            os.system('pipenv install ' + ' '.join(flask_dependencies))
        
        if args.packages:
            os.system('pipenv install ' + args.packages)


        if args.dialect == 'postgres':
            # A hack to install postgres in pipenv
            os.system('pipenv run pip install psycopg2-binary')
            os.system('pipenv install psycopg2-binary')
        elif args.dialect == 'mssql':
            os.system('pipenv install pymssql')
        else:
            "NO DIALECT TO INSTALL"


    add_git(project)
    if open_vs_code:
        os.chdir(DIR_PROJECT_FOLDER)
        os.system("code . src/app.py")


if __name__ == "__main__":
    args = parse_args()
    run(pip=args.pipenv)
