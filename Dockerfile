FROM node:lts
COPY . ./app
WORKDIR /app
RUN npm i
EXPOSE 3001
CMD npm run dev