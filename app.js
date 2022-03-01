require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://tim:${process.env.MONGO_PASS}@weather-api.fl86y.mongodb.net/weather-api?retryWrites=true&w=majority`);
}

app.use(cors({
    origin: 'http://localhost:3000'}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/weather', require('./routes/weather'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})