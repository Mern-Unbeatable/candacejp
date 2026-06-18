FROM nginx:1.31.1-alpine3.23-slim
WORKDIR /app
COPY ./website /usr/share/nginx//html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]