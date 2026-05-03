#!/bin/bash

if getent group easy-devops > /dev/null; then
    echo "PASS: Group exists"
    exit 0
else
    echo "FAIL: Group not found"
    exit 1
fi