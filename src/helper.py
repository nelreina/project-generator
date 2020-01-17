"""Helper function"""
from pygit2 import Repository
from pygit2 import GIT_SORT_TIME
from lib import str2bool
import argparse
import os 


def parse_args():
    parser = argparse.ArgumentParser(
        description="Create Release docs from git commits")
    parser.add_argument("version", help="Release version")
    parser.add_argument("--path", dest="path",
                        help="Git project path root. Defaults to current path! ", type=str, default='')
    parser.add_argument("-c", "--commit", dest="commit",
                        help="Commit changes ? yes/no true/false", type=str2bool, default=False)

    return parser.parse_args()


def get_release_messages(rversion, git_dir='.git'):
    repo = Repository(git_dir)
    rtypes = {"nf": "New Features", "bf": "Fixes", }
    rmesseges = []

    for rtype in rtypes:
        repo_messages = [x.message for x in repo.walk(
            repo.head.target, GIT_SORT_TIME)]
        messages = [m.split("-")[1].replace("\n", "") for m in repo_messages if m.startswith(
            f'{rversion}:{rtype}')]
        rmesseges.append((rtypes.get(rtype), messages))

    return dict(rmesseges)


def gen_markdown_text(version, messages):
    markdown_text = f"# Release Version {version[1:]}\n\n"
    for rtype, rmsgs in messages.items():
        markdown_text += f"### {rtype}\n"
        if len(rmsgs) == 0:
            markdown_text += f"> *there is no {rtype}*\n"
        else:
            for message in rmsgs:
                markdown_text += f"- {message}\n"
        markdown_text += "\n"
    return markdown_text


def generate_release_notes(version, git_dir):
    messages = get_release_messages(version, git_dir)
    markdown = gen_markdown_text(version, messages)
    if not os.path.exists('./releases'):
        os.makedirs('./releases')

    filename = f'./releases/release-notes-{version}.md'
    with open(filename, 'w') as release_notes:
        release_notes.write(markdown)

    print(f'{filename} is created!')
    return filename
