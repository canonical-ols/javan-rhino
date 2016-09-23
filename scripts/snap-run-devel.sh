#!/bin/sh

DEVEL=$SNAP_USER_DATA/devel
rm -rf $DEVEL

cp $SNAP/lib/node_modules/javan-rhino/ -rf $DEVEL

cd $DEVEL; npm start
