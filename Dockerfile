# Stage 1: Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with a lightweight web server (nginx)
FROM nginx:alpine

# Copy built React files from builder to nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 3000 (React runs on 3000 during dev, but Nginx serves on 80)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
