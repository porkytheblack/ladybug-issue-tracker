FROM node:16.14.2

WORKDIR /app 

COPY package*.json /app/
COPY yarn.lock /app/

RUN yarn 

COPY . /app/  
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


