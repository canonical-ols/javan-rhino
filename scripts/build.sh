#!/bin/sh

# Build server files
babel --out-dir=dist/server server --copy-files

# Build settings files
babel --out-dir=dist/settings settings --copy-files

# Build WebPack config files
babel --out-dir=dist/webpack webpack --copy-files

# Build application components
babel --out-dir=dist/src src --copy-files
webpack --verbose --colors --display-error-details --config webpack/prod-config.js
cp ./webpack-*.json dist/
