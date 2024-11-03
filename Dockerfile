# Base stage to install dependencies and build
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and build
COPY . .
RUN npm run build

# Run stage to serve the app using ng serve
FROM node:20-alpine

WORKDIR /app

# Install Angular CLI globally if not already installed in the package.json
RUN npm install -g @angular/cli

# Copy built files from the previous stage
COPY --from=build /app /app

# Expose the desired port (default port for ng serve is 4200, you can change it to 8141)
EXPOSE 4200

# Use ng serve with a specified port and host
CMD ["ng", "serve"]
