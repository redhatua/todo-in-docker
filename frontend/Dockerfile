FROM node:16 as builder
WORKDIR /app

COPY package.json /app/package.json
RUN yarn install

COPY . /app
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
