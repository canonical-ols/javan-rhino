#!/bin/sh

# Build server files
babel --out-dir=dist src --copy-files

# Build settings files
babel --out-dir=dist/settings settings --copy-files

# Build WebPack config files
babel --out-dir=dist/webpack webpack --copy-files

# Build application components
webpack --verbose --colors --display-error-details --config webpack/prod-config.js
cp ./webpack-*.json dist/
