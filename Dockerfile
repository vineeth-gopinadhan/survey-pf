FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Command to start the application
CMD [ "npm", "start" ]