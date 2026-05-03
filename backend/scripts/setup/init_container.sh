#!/bin/bash

echo "Initializing container..."

# Update package manager
apt-get update
apt-get install -y curl wget vim git sudo

# Create necessary directories
mkdir -p /tmp/easy-devops
mkdir -p /var/log/labs

echo "Container initialized successfully"
