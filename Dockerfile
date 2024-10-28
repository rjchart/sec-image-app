# 빌드 단계
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .
RUN yarn build

# 프로덕션 단계
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일을 Nginx 서버의 서비스 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
