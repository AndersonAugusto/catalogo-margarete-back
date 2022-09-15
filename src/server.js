
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3003
const router = require('./routes')
const db = require('./database')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

db.sync({ alter: true })

app.use(router)

app.listen(port , () => { 
    console.log(`Running at http://localhost:${port}`)
})

module.exports = app