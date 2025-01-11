FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:22
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["node", "app.js"]
