## Setub

Install dependecies

```
$ npm i
```

Set container UP

```
$ docker compose up
```

Configure url database in .env file like:

```
#DATABASE
DATABASE_URL="postgresql://<USER-NAME>:<PASSWORD>@localhost:<PORT>/<DABASE-NAME>"
```

Create a secret_key using the following command :

```
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Configure secret key in .env file like:

```
#YOUR SECRET KEY
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SECRET_KEY="<YOUR-SECRET-FOR-TOKEN-GENERATION>"
```

You .env file have to be like:

```
#HTTP
PORT=3000

#DATABASE
DATABASE_URL="postgresql://<USER-NAME>:<PASSWORD>@localhost:<PORT>/<DABASE-NAME>"

#YOUR SECRET KEY
#node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SECRET_KEY="<YOUR-SECRET-FOR-TOKEN-GENERATION>"
```

Apply changes on databse

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
