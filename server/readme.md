## Setup

Install dependecies

```
$ npm i
```

Set container UP

```
$ docker compose up
```

Configure url database in .env file like (The credentials are below):

```
#DATABASE
DATABASE_URL="postgresql://<USER-NAME>:<PASSWORD>@localhost:<PORT>/<DABASE-NAME>"
```

Create a secret key using the following command :

```
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated secret and configure the secret key in the .env file:

```
#YOUR SECRET KEY
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SECRET_KEY="<YOUR-SECRET-FOR-TOKEN-GENERATION>"
```

Your .env file has to be like this::

```
#HTTP
PORT=3000

#DATABASE
DATABASE_URL="postgresql://<USER-NAME>:<PASSWORD>@localhost:<PORT>/<DABASE-NAME>"

#YOUR SECRET KEY
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SECRET_KEY="<YOUR-SECRET-FOR-TOKEN-GENERATION>"
```

Apply changes on databse:

```
$ npx drizzle-kit generate
$ npx drizzle-kit migrate
```

Seed database:

```
$ npm run db:seed
```

Run server:

```
$ npm run dev
```

## Infos

To view the database schema, use the "npx drizzle-kit studio" command.
To test connection with databse use "npm run db:test"

## Credentials

```
USER-NAME: postgres
PASSWORD: postgres
PORT: 5432
DATABSE-NAME: run-faster-db
```

-> You can customize these credentials in docker-compose.yaml file.
