require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded( { extended: false } ))
app.use(cors())
app.use(routes)
app.use(errorHandler)

module.exports = app;
