# Tasks api

Example api to manage user tasks.

## About

- Users can be created
- Each user can log-in using `username` & `password`
- Authenticated users can
  - Create tasks
  - List their tasks
  - Update their tasks

**Notes:**

1. When a user logs in, they get a JWT access token

2. Authenticated endpoints require the access token to be present in a custom http header `X-Access-Token: value`

3. A single access token will be valid per user at the same time, this means, if login twice, the first access token will be invalidated by the second login.

4. Access tokens expire after 5 minutes (this is not realistic, but it makes sense as an example)

**Stack**

- NodeJs
- Typescript
- Prisma (ORM)
- Jest (tests)

## Endpoints

A [postman collection](./tasks-api.postman_collection.json) is included in the repository

## Development

1. Setup the required environment variables

Create an `.env` file in the project's root folder with the required environment variables. Check the [.env.sample](./.env.sample) file.

2. Install dependencies

```
npm i
```

3. Run database migrations (in case you need to)

```
npm run dev:prisma-migrate
```

If migrations need to be applied, they will be applied. Otherwise nothing will happen.

4. Run the app

```
npm run dev
```

You should see something like `Server running in http://localhost:8080`

Notes:

1. If you change the [database schema](./src//prisma//schema.prisma), don't forget to create a migration for it! You can use the same command you use to apply them, but this time with a name for the migration.

```
npm run dev:prisma-migrate -my-migration-name
```

## Tests

Assuming you've already installed the dependencies, just

```
npm run test
```

Notes:

1. I decided not to test the whole app since it's very time consuming, instead I wrote a few tests in some of the different app layers (controllers, services, middlewares, etc.) as a showcase

## Deployment

Currently the app is hosted on [Railway](https://railway.app/) and it's publicly accessible at https://tasks-api-production.up.railway.app

Notes:

1. Every new commit into the main branch will be automatically depoyed
2. On each deployment, database migrations are automatically applied

# TODOs (out of scope)

1. CI Github action to run the tests on each pull request to the main branch.
2. Test the whole app
3. Setup eslint
4.
