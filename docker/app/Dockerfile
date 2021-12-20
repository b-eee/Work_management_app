FROM node:14-alpine3.12 as builder
RUN apk update && apk add --no-cache make git nodejs
WORKDIR /app
COPY . /app/
RUN apk add --no-cache --virtual .gyp \
        python3 

RUN ln -s /usr/bin/python3 /usr/bin/python && \
    ln -s /usr/bin/pip3 /usr/bin/pip

RUN apk add --no-cache --virtual .gyp \
        make \
        g++ \
    && npm install \
    && apk del .gyp

RUN npm run build
RUN npm run generate

FROM nginx:1.19.2-alpine
COPY docker/app/nginx.conf /etc/nginx/   
COPY --from=builder /app/dist /var/www   
EXPOSE 80
STOPSIGNAL SIGQUIT
ENTRYPOINT ["nginx", "-g", "daemon off;"]