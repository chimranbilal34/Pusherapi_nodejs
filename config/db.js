const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/voting', { useNewUrlParser: true })
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err))