# contacts-api
Contacts Management API written with Node.js

Currently application uses several techniques to verify, test and illustrate good practices.

Unit testing: Mocha/chai/Sinon. Mocha for unit test running, chai for assertions, Sinon for 
stubs (i.e. database driver is stubbed for unit testing).

BDD testing: Cucumber for feature description (Gherkin style), with chai and chai-http assertions to execute actual calls via API.

Database migrations: db-migrate used to manage database migrations, including scoped migrations for test data installation (required
by BDD tests). Test data can be easily removed using the `migrate down:test` operation and `npm` script `remove-test-data`.

Database script to be executed by administrator to create database and user, as well as grant necessary privileges is provided separately.

Application requires Redis for in-memory database (session management) and MySQL/MariaDB for data storage. Abstract db-migrate modelling
was not used.

Environment settings are managed using Dotenv, and sample file is available in `.env.example`.

Various links:
 * [db-migrate documentation](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/) - how to run scoped migrations
 * [db-migrate API examples](https://github.com/db-migrate/api-examples) - to be used to run migrations on startup
 * [Sinon description](https://sinonjs.org/releases/latest/stubs/) - stubbing
 
Related repos:
 * [PoC implementation of AUR-alike package for Arch linux](https://github.com/dbuchwald/contacts-api-aur) - to be updated upon first
 release
 * [Website to use the Contacts-API](https://github.com/dbuchwald/contacts-app) - to be implemented.

## Installation

Clone, `npm install`, verify installation by running unit tests `npm run test`. Create database using provided SQL script 
(`create-database.sql`) and set up Redis to use provided password (or change it if needed). Copy `.env.example` to `.env` 
and populate variables with your own.

Run database migrations `npm run migrate` to create database schema. Run `npm run install-test-data` to install test data to database.

When done, run `npm run bdd-test` to verify that application is functioning properly.
