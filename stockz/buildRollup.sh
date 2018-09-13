#!/bin/sh
rm -rf dist
rollup --config
cp src/*.html dist/
cp src/*.css dist/
cp src/stockz-worker.js dist/
cp -R src/d3 dist/