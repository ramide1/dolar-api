FROM node:24-alpine
RUN apk add --no-cache chromium
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]