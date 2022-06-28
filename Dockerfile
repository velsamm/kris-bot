FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 9000
