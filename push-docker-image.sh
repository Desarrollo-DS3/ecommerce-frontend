#!/bin/bash

IMAGE_NAME="juanloaiza007/ecommerce-frontend"
TAG="latest"

# Construir la imagen Docker
echo "Construyendo la imagen Docker..."
docker build -t ${IMAGE_NAME}:${TAG} .

# Subir la imagen a Docker Hub
echo "Subiendo la imagen a Docker Hub..."
docker push ${IMAGE_NAME}:${TAG}

# docker run --name ecommerce-frontend-container -d -p 3000:3000 juanloaiza007/ecommerce-frontend:latest