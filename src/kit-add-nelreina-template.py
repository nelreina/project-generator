import os
import sys
from lib import parse_args,  create_from_template
from pathlib import Path
import crap
import shutil

def run(args):     
    DIR_CURRENT_WORKING = Path.cwd()

    os.chdir(DIR_CURRENT_WORKING)

    # CCopy src folder
    copy_template_folder(DIR_CURRENT_WORKING, 'sk_pocketbase', "src")       
    copy_template_folder(DIR_CURRENT_WORKING, 'sk_pocketbase', "static")       

    
    file_name = Path.joinpath(DIR_CURRENT_WORKING, ".env")
    create_from_template("sk_env", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, ".dockerignore")
    create_from_template("sk_dockerignore", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "Dockerfile")
    create_from_template("sk_dockerfile", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "pb_schema.json")
    create_from_template("pb_schema.json", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "Dockerfile.dev")
    create_from_template("sk_dockerfile_dev", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "svelte.config.js")
    create_from_template("sk_svelte_config", file_name)

    dev_dep = [
        '@sveltejs/adapter-node', 
        'i18next', 
        'i18next-http-backend', 
        'i18next-browser-languagedetector',
        'svelte-i18next',
        'qrcode', 
        'otplib', 
        'sveltekit-flash-message',
         'dotenv', 
         'pocketbase', 
         'redis', 
         'pino',
         'pino-pretty',
        'lodash-es',
        '@nelreina/rest-client',
        '@nelreina/redis-stream-consumer'
        ]
    install = (f'npm i -D --package-lock-only {" ".join(dev_dep)}')
    print(install)
    os.system('npm uninstall @sveltejs/adapter-auto --package-lock-only')
    os.system(install)

def copy_template_folder(DIR_CURRENT_WORKING, template_folder, sub_folder ):
    __dirname = os.path.dirname(os.path.abspath(__file__))

    DIR_PROJECT_SRC_FOLDER = Path.joinpath(DIR_CURRENT_WORKING, sub_folder)
    print(f'Remove {DIR_PROJECT_SRC_FOLDER}')
    shutil.rmtree(DIR_PROJECT_SRC_FOLDER)    
    DIR_TEMPLATE_SK_POCKETBASE = os.path.join(__dirname, 'templates', template_folder, sub_folder)
    print(f'Copying templates from {DIR_TEMPLATE_SK_POCKETBASE}')
    shutil.copytree(DIR_TEMPLATE_SK_POCKETBASE, DIR_PROJECT_SRC_FOLDER)


if __name__ == "__main__":
    run(parse_args())

