const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./config/db')

const app = express()

const poll = require('./routes/poll')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use('/poll', poll)

const port = 3000;
app.listen(port, () => {
    console.log(`Listen on port : ${port}`)
})