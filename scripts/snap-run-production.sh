#!/bin/sh

DEVEL=$SNAP_USER_DATA/devel
rm -rf $DEVEL

cp $SNAP/lib/node_modules/javan-rhino/ -rf $DEVEL
cd $DEVEL

export PATH=$PATH:$SNAP/lib/node_modules/javan-rhino/node_modules/.bin
./scripts/build.sh

PROD=$SNAP_USER_DATA/production
rm -rf $PROD
mkdir $PROD
cp dists -rf $PROD/
cp node_modules -rf $PROD/

cd $PROD; NODE_ENV=production node dists/server/
