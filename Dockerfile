<<<<<<< HEAD
# Stage 1: Build the React app with Vite
=======
# Stage 1: Build the React app using Vite
>>>>>>> 02c89ec (updates)
FROM node:18 AS builder

# Set working directory
WORKDIR /app

<<<<<<< HEAD
# Copy only the package files to install dependencies first
=======
# Copy dependency files first (for layer caching)
>>>>>>> 02c89ec (updates)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

<<<<<<< HEAD
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
=======
# Build the Vite app (output goes to /app/dist)
RUN npm run build

# Stage 2: Serve the build output using Nginx
FROM nginx:alpine

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Run Nginx in foreground
>>>>>>> 02c89ec (updates)
CMD ["nginx", "-g", "daemon off;"]
