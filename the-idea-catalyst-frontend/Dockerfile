# Use the official Node.js image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the application
FROM nginx:alpine

# Copy the build files to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

