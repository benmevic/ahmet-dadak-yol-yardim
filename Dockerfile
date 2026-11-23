# Builds the static site and serves it with nginx on port 8080.
#
#   docker build -t ahmet-dadak .
#   docker run --rm -p 8080:8080 ahmet-dadak
#   -> http://localhost:8080
#
# For the real site pass the domain at build time (adds canonicals, sitemap,
# robots Allow):  docker build --build-arg SITE_URL=https://alanadi.com.tr -t ahmet-dadak .

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
