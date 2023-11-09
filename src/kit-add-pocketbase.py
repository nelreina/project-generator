import os
import sys
from lib import parse_args,  create_from_template
from pathlib import Path
import crap
import shutil

def run(args):     
    DIR_CURRENT_WORKING = Path.cwd()

    os.chdir(DIR_CURRENT_WORKING)

    DIR_PROJECT_SRC_FOLDER = Path.joinpath(DIR_CURRENT_WORKING, 'src')
    print(f'Remove {DIR_PROJECT_SRC_FOLDER}')
    shutil.rmtree(DIR_PROJECT_SRC_FOLDER)    

    __dirname = os.path.dirname(os.path.abspath(__file__))

    DIR_TEMPLATE_SK_POCKETBASE = os.path.join(__dirname, 'templates', 'sk_pocketbase', "src")
    print(f'Copying templates from {DIR_TEMPLATE_SK_POCKETBASE}')
    shutil.copytree(DIR_TEMPLATE_SK_POCKETBASE, DIR_PROJECT_SRC_FOLDER)       

    
    file_name = Path.joinpath(DIR_CURRENT_WORKING, ".env")
    create_from_template("sk_env", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, ".dockerignore")
    create_from_template("sk_dockerignore", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "Dockerfile")
    create_from_template("sk_dockerfile", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "pb_schema.json")
    create_from_template("pb_schema.json", file_name)

    os.system('npm i pocketbase qrcode otplib highlight.js redis')


if __name__ == "__main__":
    run(parse_args())

