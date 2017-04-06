FROM node:6.10.2-alpine

# Copy application files
COPY ./build /usr/local/isomorphic-react/
WORKDIR /usr/local/isomorphic-react/

# Install Node.js dependencies
RUN npm install

CMD [ "node", "server.js" ]
