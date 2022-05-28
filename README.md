# Udacity: Build A Storefront Backend

    backend API build in Nodejs express for an online store.
    THE SERVER in in port 3000.`http://localhost:3000/`

## Set Up Database

- add your database information in the `.env` file as `.ex.env`

      DB_HOST=`localhost`
      DB_PORT=`5432`
      DB_NAME=`DatabaseName`
      DB_NAME_TEST=`DatabaseNameTest`
      DB_USER=`UserName`
      DB_PASSWORD=`Password`

- `npm run db:up` (make sure you have the correct database information)

## Set Up Project

- `npm i` install all dependencies and development dependencies
- `npm run dev` (start the server on port 3000)
- `npm run build` (to build to es5 and start the server on port 3000)

## database ERD

!['migrate database'](./docs/ERD.png)

## database schema

!['migrate database'](./docs/Schema.png)

### and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Testing

- `npm run test` (to run the tests)
- `npm run test:clean` (to clean the test test database)

!['migrate database'](./docs/test.png)
