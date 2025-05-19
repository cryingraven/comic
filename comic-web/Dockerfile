# Use an official Node.js runtime as a parent image
FROM node:23-alpine AS builder

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

# Production image, copy the build output and minimal server
FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from the builder stage
COPY --from=builder /app/. .

# Install dependencies (production only)
RUN npm install --legacy-peer-deps

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]