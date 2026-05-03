#!/bin/bash

if id "ram" &>dev/null;then 
    echo "PASS: User exists"
    exit 0;
else 
    echo "FAIL: User not found"
    exit 1
fi