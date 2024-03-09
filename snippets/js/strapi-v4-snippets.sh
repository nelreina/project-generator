# Dcoker Compose File 
    environment:
      - DATABASE_NAME=admin-api
      - DATABASE_HOST=postgres-db
      - DATABASE_USERNAME=postgres
      - DATABASE_PASSWORD=${POSTGRES_PASSWORD}
      - DATABASE_CLIENT=postgres
      - DATABASE_PORT=5432
      - DATABASE_SSL=false

    labels:
      - traefik.enable=true
      - traefik.http.routers.admin-api.rule=Host("api.koadmin.localhost")
 

# env 
APP_KEYS=Vwj9og5Kf1hGhPxO02L0YQ==,XWA2mF9A7wlvzqMGe+Dycg==,9S2b0uDYBbBAyr7iW4dkEA==,9LeKUU0Y8wwD7QBMGsHBxw==
API_TOKEN_SALT=k/JhN1KCu7jNBzHYsruu/g==
ADMIN_JWT_SECRET=CyUvxaL6E37U1Fn1KK6wHA==
TRANSFER_TOKEN_SALT=/qyNJiRL6qjz06ZKLSu0BA==
JWT_SECRET=adgTradusi

# Database
POSTGRES_PASSWORD=mentos
POSTGRES_USER=postgres
POSTGRES_DB=admin-api
# Strapi
# Strapi
#


