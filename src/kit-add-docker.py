import os
import sys
from lib import parse_args,  create_from_template
from pathlib import Path
import crap
import shutil

def run(args):     
    DIR_CURRENT_WORKING = Path.cwd()

    os.chdir(DIR_CURRENT_WORKING)


    
    file_name = Path.joinpath(DIR_CURRENT_WORKING, ".env")
    create_from_template("sk_env", file_name)
    # file_name = Path.joinpath(DIR_CURRENT_WORKING, ".dockerignore")
    # create_from_template("sk_dockerignore", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "Dockerfile")
    create_from_template("sk_dockerfile", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "Dockerfile.dev")
    create_from_template("sk_dockerfile_dev", file_name)
    file_name = Path.joinpath(DIR_CURRENT_WORKING, "svelte.config.js")
    create_from_template("sk_svelte_config", file_name)

    os.system('npm uninstall @sveltejs/adapter-auto --package-lock-only')
    os.system('npm i dotenv @sveltejs/adapter-node --package-lock-only')


if __name__ == "__main__":
    run(parse_args())

