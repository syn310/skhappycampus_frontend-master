FROM nginx:stable-alpine

RUN mkdir -p /usr/share/nginx/html/.well-known

RUN rm -rf /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html
COPY .well-known /usr/share/nginx/html/.well-known/
COPY nginx.conf /etc/nginx/
COPY default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
