
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const connectionStr = "mongodb://mean-mongodb-rest-api-db:69fxVH5SD6DPvpo3MR09dI5Vu7Bv1svbPKsPnGCHuhBbDJfpP4CfpmVaBNENSRk7Qp7nfwFvV2dtvU0gkCqJPA==@mean-mongodb-rest-api-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mean-mongodb-rest-api-db@";
// 'mongodb://localhost:27017'

if (process.env.ENV === 'Test') {
    console.log('This is a test');
    const db = mongoose.connect(`${connectionStr}/bookAPI_Test`);
} else {
    const db = mongoose.connect(`${connectionStr}/bookAPI`);
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my Nodemon API!');
});


app.server = app.listen(port, '0.0.0.0', () => {
    console.log(`Running on port ${port}`);
});

module.exports = app;
