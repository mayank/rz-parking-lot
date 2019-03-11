# Parking Lot

### Setup 
* Requires `nodejs >= 8`
* Run `npm install` in the directory to setup
* Migrate the database from `migrations/database.sql`, create two DB(s) from dev & testing
```
create database `parking`;
create database `parking_test`;
```
* To run build, run `npm run build`, this converts `ES6` to `js` into `dist/` directory
* To start the API server, run `npm start` or `npm run start`
* To run the test cases, run `npm test` or `npm run test`, coverage can be checked in `coverage/lcov-report/index.html` file.

### Docs
* `postman.json` can be imported to postman to check the APIs
* `docs/index.html` folder consists of swagger version.