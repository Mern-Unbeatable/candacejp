FROM nginx:1.31.1-alpine3.23-slim
WORKDIR /app
COPY . /usr/share/nginx//html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]