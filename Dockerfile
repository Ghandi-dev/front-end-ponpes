# Development stage
FROM node:22-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM node:22-alpine AS prod

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

EXPOSE 3000
# CMD ["npm", "start"]