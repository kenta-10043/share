FROM node:22-alpine

WORKDIR /app

# 依存だけ先に入れてキャッシュ効かせる
COPY nuxt/package*.json ./
RUN npm ci

# あとはボリュームで上書きされるので必須ではないが、ビルドだけでも動くようにコピー
COPY nuxt/ ./

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host=0.0.0.0", "--port=3000"]
