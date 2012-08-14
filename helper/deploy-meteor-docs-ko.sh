#/usr/bin/env bash

METEOR=`which meteor`

if [[ "$?" != "0" || "$METEOR" == "" ]]; then
    echo "not found meteor; install metoer"
    echo "run 'curl https://install.meteor.com | /bin/sh'"
    exit 1;
fi

PROJECT=`basename $(git rev-parse --show-toplevel)`

if [[ "$?" != "0" || "$PROJECT" != "meteor" ]]; then
    echo "invalid project; move to meteor project directory "
    exit 1; 
fi

DOCS_KO=`basename $(pwd)`

if [[ "$?" != "0" || "$DOCS_KO" != "docs-ko" ]]; then
    echo "this is for docs-ko; you need to run 'cd meteor/docs-ko'"
    exit 1; 
fi

# to checkout branch. and to continue
CURRENT_BRANCH=$(git symbolic-ref HEAD 2> /dev/null)
CURRENT_BRANCH=${CURRENT_BRANCH#refs/heads/}

if [ "$CURRENT_BRANCH" != "ko-vaccum" ]; then
    git vaccum ko origin/ko-
    if [ "$?" != "0" ]; then exit 1; fi
else
    CURRENT_BRANCH='ko'
fi

meteor deploy docs-ko.meteor.com
if [ "$?" != "0" ]; then exit 1; fi

git co $CURRENT_BRANCH
if [ "$?" != "0" ]; then exit 1; fi

git br -D ko-vaccum
if [ "$?" != "0" ]; then exit 1; fi

