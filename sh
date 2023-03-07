#!/usr/bin/env bash
# exit on error


set -o errexit
npm build
npm start
