FROM --platform=${BUILDPLATFORM} node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine-slim AS final

USER root

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

USER 101:101

ENTRYPOINT ["nginx", "-g", "daemon off;"]
