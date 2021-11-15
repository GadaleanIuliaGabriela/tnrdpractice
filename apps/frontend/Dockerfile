FROM node:14.17.0

WORKDIR /app
ENV PORT=4200
COPY package.json /app
RUN npm install && npm cache clean --force
COPY . /app
EXPOSE ${PORT}
CMD [ "npm", "run", "start:frontend" ]
