FROM --platform=${BUILDPLATFORM} node:24-alpine@sha256:d32cdf619f63fe0471182d08996dd516c6275bb5fd31ae06e55a570bd9e1ad43 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine-slim@sha256:e88d990b349df8cf4aa82f16642d7a23375016638c9ace4e5c6ca25028e62e65 AS final

USER root

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

USER 101:101

ENTRYPOINT ["nginx", "-g", "daemon off;"]
