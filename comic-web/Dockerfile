# Use an official Node.js runtime as a parent image
FROM node:23-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies (including dev dependencies for build step)
RUN npm install --legacy-peer-deps

# Copy the Next.js project files to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 3001

# Start the Next.js application
CMD ["npm", "start"]