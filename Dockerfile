FROM node:alpine AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI
RUN yarn build

FROM node:alpine AS production
ARG X_TAG
WORKDIR /opt/app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
CMD ["node_modules/.bin/next", "start"]