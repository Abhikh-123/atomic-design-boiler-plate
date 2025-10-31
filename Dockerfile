
# Stage 1: Build the Vite app
FROM node:20 AS build

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


