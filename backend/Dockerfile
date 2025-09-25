# Use a modern, lightweight Node image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (leverage Docker cache)
COPY package*.json ./

# Install only production dependencies inside container
RUN npm install --silent

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
