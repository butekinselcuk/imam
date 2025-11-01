FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Prisma schema and client
COPY prisma ./prisma
RUN npx prisma generate

# Application source
COPY server ./server

# Runtime config
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "server/server.js"]