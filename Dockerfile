# # # Stage 1: Build React app
# # FROM node:18-alpine AS builder
# # WORKDIR /app
# # COPY package*.json ./
# # RUN npm install --frozen-lockfile
# # COPY . .
# # RUN npm run build

# # # Stage 2: Nginx to serve React app
# # FROM nginx:alpine
# # COPY --from=builder /app/dist /usr/share/nginx/html
# # EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]




# # Use an official Node.js runtime as the base image
# FROM node:18-alpine as build

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or npm-shrinkwrap.json)
# COPY package*.json ./

# # Install the dependencies
# RUN npm ci

# # Copy the rest of the application files
# COPY . .

# # Build the Vite app
# RUN npm run build

# # Use a smaller image to serve the app
# FROM nginx:alpine

# # Copy the build output from the build container
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80 to be able to access the app
# EXPOSE 80

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]




# Stage 1: Build the Vite app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx's HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]


