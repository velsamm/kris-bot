## DEVELOPMENT/PRODUCTION

```
npm start
```

## DOCKER

# Build & RUN

```
docker build -t kris-bot .
docker-compose --env-file .env -f kris-bot-compose.yaml up -d --build --force-recreate
```
