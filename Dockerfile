FROM node:6.10.2-alpine

# Copy application files
COPY ./build /usr/local/app/
WORKDIR /usr/local/app/

# Install Node.js dependencies
RUN npm install

CMD [ "node", "server.js" ]
