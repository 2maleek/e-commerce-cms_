require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": "gohwuivnveosug",
    "password": "00540774fe98b6308efa2d7dbc5209e614e4f77818e3c852c13cb58fb220b49f",
    "database": "d9eu0k4kafrmdg",
    "host": "ec2-23-20-129-146.compute-1.amazonaws.com",
    "dialect": "postgres",
  }
}
