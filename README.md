# To Do List
This Repo is dedicated for BTS.id Technical Test

Requirements:
- Node JS
- MySQL

## Init
- Add `.env` file like the example below:
```
# ENV Credentials (development / production)
NODE_ENV=development
APP_PORT=8080

# DB Credentials
# Development
DB_USERNAME_DEV=
DB_PASSWORD_DEV=
DB_NAME_DEV=
DB_HOST_DEV=localhost
DB_PORT_DEV=3306

# Production
# DB_USERNAME_PROD=
# DB_PASSWORD_PROD=
# DB_NAME_PROD=
# DB_HOST_PROD=
# DB_PORT_PROD=

# Test
# DB_USERNAME_TEST=
# DB_PASSWORD_TEST=
# DB_NAME_TEST=
# DB_HOST_TEST=
# DB_PORT_TEST=

# JWT
JWT_SECRET_KEY = ""
JWT_EXPIRES = "2d"
```

- `npm install`
- `npx sequelize-cli db:create`
- `npx sequelize-cli db:migrate`
- `npm run start:dev`