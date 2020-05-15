FROM node:12

WORKDIR /app

COPY package.json /

COPY ./ /app/ 

# when we have logs 
RUN mkdir /app/logs

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run start