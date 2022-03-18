require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


main().catch(err => console.log(err));


async function main() {
  try{
    await mongoose.connect(`mongodb+srv://tim:${process.env.MONGO_PASS}@weather-api.fl86y.mongodb.net/weather-api?retryWrites=true&w=majority`);
  } catch (err) {
    throw new Error(`Mongoose couldn\'t connect: ${err}`)
  }
  
}

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.use('/weather', require('./routes/weather').router)


//export for testing
module.exports = app;