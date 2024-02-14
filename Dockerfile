# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to represent the root of your project
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port for the application to listen on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
