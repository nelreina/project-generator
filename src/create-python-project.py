import os
from pathlib import Path

from lib import create_from_template, add_git, create_project, parse_args, create_empty_files


def handle_db_dialect(args):
    """Install DB conn dialect if nescery"""
    if arss.db_dialect and not args.flaskapp:
        os.system('pipenv install sqlalchemy')

    if args.db_dialect == 'postgres':
        # A hack to install postgres in pipenv
        os.system('pipenv run pip install psycopg2-binary')
        os.system('pipenv install psycopg2-binary')
    elif args.db_dialect == 'mssql':
        os.system('pipenv install pymssql')
    else:
        "NO DIALECT TO INSTALL"


def install_flask_app_dependencies():
    flask_dependencies = [
        'flask', 
        'flask-sqlalchemy', 
        'flask-migrate', 
        'flask-marshmallow', 
        'marshmallow-sqlalchemy',
    ]
    os.system('pipenv install ' + ' '.join(flask_dependencies))


def run(pip=False, open_vs_code=False):

    DIR_PROJECT_FOLDER, args = create_project()

    project = args.project
    DIR_PROJECT_MAIN = Path.joinpath(DIR_PROJECT_FOLDER, "app")

    main_file_name = Path.joinpath(DIR_PROJECT_MAIN, "__main__.py")
    create_from_template("cpy_app_py", main_file_name, {"project": project})
    
    main_file_name = Path.joinpath(DIR_PROJECT_MAIN, "redisstream.py")
    create_from_template("cpy_redisstream", main_file_name, {"project": project})
    
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "nodemon.json")
    create_from_template("cpy_nodemon_json", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "Dockerfile")
    create_from_template("cpy_dockerfile", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "requirements.txt")
    create_from_template("cpy_requirements_txt", file_name)

    
    create_empty_files(DIR_PROJECT_MAIN, ['__init__.py'])

    if pip:
        print("Init pip environment")
        os.system("pipenv install autopep8 pyinstaller ptpython --dev")
        os.system("pipenv install requests redis python-dotenv")
        
        if args.flaskapp:
            install_flask_app_dependencies()
        
        if args.packages:
            os.system('pipenv install ' + args.packages)


    # add_git(project)
    

    if open_vs_code:
        os.chdir(DIR_PROJECT_FOLDER)
        os.system(f"code . {main_file_name}")
        
    
    if pip:
            os.system(f"pipenv shell")


if __name__ == "__main__":
    args = parse_args()
    run(pip=False)
