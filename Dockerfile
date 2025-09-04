
FROM node:18 AS builder

# Set working directory
WORKDIR /app

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

# Build the Vite app (output goes to /app/dist)
RUN npm run build

# Stage 2: Serve the build output using Nginx
FROM nginx:alpine

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
