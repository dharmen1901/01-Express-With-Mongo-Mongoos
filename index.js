const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
//Dotenv is a zero-dependency module that loads environment variables from a . env file into process. env 

const app = express();
const port = process.env.port || 3000;


app.use(cors());
app.use(express.json());
//Instead of body-parser we are using express's inBuild .json() 
const MongoURI = process.env.MONGO_CONNECTION_STRING

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('MongoDB Connection Established')
});

const shipwreckRouter = require('./routes/shipwrecksRoute');
const pdfCreateRouter = require('./routes/pdfCreate');
const requestLogger = require('./utilities/requestLogges');
const errorLogger = require('./utilities/errorLogger');

app.use(requestLogger)

app.use('/ship',shipwreckRouter);
app.use('/pdf',pdfCreateRouter);

app.use(errorLogger)

app.listen(port, () => {
    console.table(`Express Server is running on -> ${port}`)
})