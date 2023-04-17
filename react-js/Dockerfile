# Base image
FROM node:18.13.0-alpine

# Install yarn
RUN apk add --no-cache yarn

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the image
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the image
COPY . .

# Start the application
CMD ["yarn", "start"]
