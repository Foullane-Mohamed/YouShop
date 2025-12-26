FROM node:18-alpine

# Install OpenSSL for compatibility
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
