const express = require('express')
const app = express()
const mongoose = require('mongoose')
const controller = require('./controller')


app.use(express.json())
app.use(express.urlencoded({ extended: false}))


// Database connection
const url = 'mongodb://localhost/crud-op';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection ;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('Database connected...');
});


app.get('/', controller().read)
app.post('/', controller().create)
app.put('/', controller().update)
app.delete('/', controller().delete)


app.listen(8000, () => {
    console.log("Listening at port localhost:8000");
})