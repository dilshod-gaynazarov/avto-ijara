FROM --platform=linux/amd64 node:alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
