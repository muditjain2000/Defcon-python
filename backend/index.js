const express = require('express')
const app = express()
const connectToDatabase = require('./config/connectToDatabase')

const routesUrls = require('./routes/routes')
const cors = require('cors')

connectToDatabase();



app.use(express.json({extended:false}))
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, ()=> console.log("Server is running"))
