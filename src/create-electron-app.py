import os
from pathlib import Path

from lib import create_from_template, add_git, create_project, get_title


if __name__ == "__main__":
    DIR_PROJECT_FOLDER, args = create_project("electron")
    project = args.project

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "package.json")
    create_from_template("cep_package_json", file_name,
                         {
                             "project": project,
                             "title": get_title(project)
                         }
                         )

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "electron.js")
    create_from_template("cep_electron_js", file_name)

    # Create src files
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/App.css")
    create_from_template("cep_app_css", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/App.jsx")
    create_from_template("cep_app_jsx", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/theme.js")
    create_from_template("cep_theme_js", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/i18next.js")
    create_from_template("cep_i18next_js", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/translation-en.json")
    create_from_template("cep_translation_en_json", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/translation-cw.json")
    create_from_template("cep_translation_cw_json", file_name)

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/index.html")
    create_from_template("cep_index_html", file_name, {
                         "project": get_title(project)})

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/start-app.js")
    create_from_template("cep_start_app", file_name, {"project": project})

    # Create src/views files
    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/views/Main.jsx")
    create_from_template("cep_view_main", file_name, {
                         "project": get_title(project)})

    file_name = Path.joinpath(DIR_PROJECT_FOLDER, "src/views/Settings.jsx")
    create_from_template("cep_view_settings", file_name)

    dependecies = [
        "@material-ui/core",
        "@material-ui/icons",
        "electron-is-dev",
        "react-hook-form",
        "react",
        "react-dom",
        "react-router",
        "react-router-dom",
        "react-helmet",
        "styled-components",
        "typeface-roboto",
    ]

    dev_dependecies = [
        "concurrently",
        "electron",
        "electron-builder",
        "parcel-bundler",
        "wait-on",
    ]

    os.system(f"yarn add {' '.join(dependecies)}")
    os.system(f"yarn add -D {' '.join(dev_dependecies)}")
    add_git(project)

    os.system("code . src/App.jsx")
    os.chdir(DIR_PROJECT_FOLDER)
    os.system("yarn dev")
