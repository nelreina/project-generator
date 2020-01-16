"""Generated Project fake-git-project"""
from helper import parse_args, generate_release_notes
import os

def main(args):
    filename = generate_release_notes(args.version, '.git')

    if args.commit:
    	os.system(f'git add {filename}')
    	os.system(f'git commit -m "generated release notes {filename}"')


if __name__ == "__main__":
    args = parse_args()
    main(args)
