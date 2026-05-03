#!/bin/bash

echo "Cleaning up container..."

# Remove temporary files
rm -rf /tmp/easy-devops
rm -rf /var/log/labs

# Clear apt cache
apt-get clean
apt-get autoclean

echo "Container cleanup completed"
