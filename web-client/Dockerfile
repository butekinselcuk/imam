# Frontend için Dockerfile
FROM node:20-alpine

WORKDIR /app

# Package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Kaynak kodunu kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]