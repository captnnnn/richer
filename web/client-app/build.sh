#!/bin/bash
DIST="dist"
if [ ! -d "$DIST" ]; then
	mkdir $DIST
fi
./node_modules/.bin/webpack --config webpack.config.js

