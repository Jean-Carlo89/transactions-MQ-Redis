FROM node:21-slim

RUN apt update && apt install -y openssl procps

RUN npm install -g @nestjs/cli@10.3.2

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

#CMD ["npm", "run", "start"]

CMD sh -c "npm install && npm run start"
#CMD ["npm", "install"]

# CMD tail -f /dev/null