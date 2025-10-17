# # Stage 1: Build React app
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --frozen-lockfile
# COPY . .
# RUN npm run build

# # Stage 2: Nginx to serve React app
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]




# Use an official Node.js runtime as the base image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN npm run build

# Use a smaller image to serve the app
FROM nginx:alpine

# Copy the build output from the build container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to be able to access the app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

