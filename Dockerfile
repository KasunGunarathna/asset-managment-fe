# Use an official Node.js runtime as a parent image
FROM node:16.3.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install 

# Copy the rest of the application code to the container
COPY . .

# Build the ReactJS application for production
RUN npm run build

# Use a smaller base image for the production image
FROM nginx:alpine

# Copy the built ReactJS application to the nginx web server directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port that nginx listens to (usually 80)
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
