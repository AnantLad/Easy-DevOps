#!/bin/bash

# Check if a service is running
SERVICE="nginx"

if systemctl is-active --quiet $SERVICE; then
    echo "Service '$SERVICE' is running"
    exit 0
else
    echo "Service '$SERVICE' is not running"
    exit 1
fi
