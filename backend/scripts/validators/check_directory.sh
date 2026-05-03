#!/bin/bash

# Check if a directory exists
if [ -d "/tmp/easy-devops" ]; then
    echo "Directory '/tmp/easy-devops' exists"
    exit 0
else
    echo "Directory '/tmp/easy-devops' does not exist"
    exit 1
fi
