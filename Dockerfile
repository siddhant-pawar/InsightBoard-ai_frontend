# Stage 1: Build the React app with Vite
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy only the package files to install dependencies first
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app using Vite (skip strict tsc checks)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built static files to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Remove default Nginx config and add custom one (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
