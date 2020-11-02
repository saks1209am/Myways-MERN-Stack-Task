const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')

require('./models/user')
//it is a kind of middleware which we will
//use to parse json data
app.use(express.json())

app.use(require('./routes/auth'))



mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo yeah!')
})

mongoose.connection.on('error', (err) => {
    console.log('error connnecting to mongo', err)
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})