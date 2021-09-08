const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const router = require('./router/route')
const db = require('./connection/mongo')



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/test', (req, res) => {
    return res.send({ responsecode: 200, responseMessage: "Welcome to the page" })
})

app.use('/vaccine', router);

app.listen(1000, (err, result) => {
    if (err) {
        console.log("Server is not Working..", err)
    } else {
        console.log("Server is listening at 1000")
    }



})