#!/bin/bash

# Check file permissions
if [ -r "/etc/shadow" ]; then
    echo "File is readable"
    exit 0
else
    echo "File is not readable"
    exit 1
fi
