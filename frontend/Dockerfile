FROM node:18-alpine
RUN apk add --no-cache libc6-compat

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# USER nextjs

COPY ./src/package.json ./
RUN npm install

COPY ./src ./

# RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]