FROM node:16-alpine

# Create a directory to host Node App
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Copy the package.json file
WORKDIR /usr/src/app

# Copy the package.json file
COPY package.json package.json

USER node

RUN npm install && npm cache clean --force

# Deploy code from current directory to WORKDIR
COPY --chown=node:node . .

ARG NODE_ENV

# Expose driver api on port
EXPOSE 3000

#Launch
CMD ["node","./app.js"]
