# syntax=docker/dockerfile:1

# ---------- Estágio 1: build do React/Vite ----------
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências (inclui devDependencies — necessárias para tsc + vite build)
COPY package.json package-lock.json ./
RUN npm ci

# Copia o código e gera o build de produção (tsc --noEmit && vite build)
COPY . .
RUN npm run build

# ---------- Estágio 2: serve estático com Nginx ----------
FROM nginx:1.27-alpine AS runtime

# Configuração com fallback de SPA (React Router) + cache de assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefatos do build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
