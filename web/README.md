# Richer Website
The webiste to manage users, payments and interacting with the actual NLP services

# Setup the dev environment option 1 - local env
prerequisites - make sure you have the following installed
1. python 2.7
2. pip 1.2.1
3. virtualenv
4. mongodb 3.4.6
5. homebrew 1.3.0 (`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`)
6. yarn 0.27.5 (`brew install yarn`), then run `yarn version` to verify

then following these steps to create a virtual python env and install necessary dependencies
1. `virtualenv venv`
2. `source venv/bin/activate/`
3. `pip install -r requirements.txt`


then following steps to setup frontend app
1. `cd client-app`
2. `yarn`
3. `.build.sh`

# TODO: run db and config db settings

then run server
1. `./runserver.sh`

Catches
1. When install yarn, if running into "SyntaxError: Use of const in strict mode" upon running `yarn version`. It means you prob have a node installed on your local before hand. You will need to run `brew link --overwrite node` to use the latest node installed by brew.
2. if you see "some_path is not writable " upon running `brew link --overwrite node`. it means you dont have permission to edit that path. Run `sudo chown -R $USER:admin some_path` to get permission.
