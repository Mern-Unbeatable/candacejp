FROM nginx:1.31.1-alpine3.23-slim
RUN apk add --no-cache curl
WORKDIR /app
COPY . /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY certs/server.crt /etc/nginx/ssl/server.crt
COPY certs/server.key /etc/nginx/ssl/server.key
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]