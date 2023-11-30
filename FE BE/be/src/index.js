
const express = require('express')
const connectDb = require('./utils/connect')
const cors = require('cors')
const router = require('./router')
const app = express()
require('dotenv').config()
const port  = process.env.PORT || 5001



app.use(express.urlencoded({
    extended: true
}))



app.use(express.json())

app.use(cors({
    origin: '*'
}))


router(app)
app.listen(port,() => {
    connectDb()
    console.log("Server start at port :: ",port);
})

module.exports = app