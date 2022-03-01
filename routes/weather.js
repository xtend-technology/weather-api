const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const mongoose = require('mongoose')
const Redis = require('redis')

const redisClient = Redis.createClient()

const forecastParisSchema = new mongoose.Schema({
    city: String,
    weather: String,
    time: { type : Date, expires: 3600, default: Date.now }
})
const forecastParis = mongoose.model("ForecastParis", forecastParisSchema)

router.get('/sydney', (req, res) => {

    async function getWeather() {
        try {
          const city = "Sydney"
          
          const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
          console.log('response', response)
        //   redisClient.setex("SydneyWeather", 3600, response.data.weather[0].description)
          return res.json(response.data.weather[0].description)
        } catch (error) {
            return res.json(error)
        }
      }
      getWeather()
    
  })

  router.get('/sydney/forecast', (req, res) => {

    async function getForecast() {
        //Forecast 24 hours time
        try {
          const city = "Sydney"
          const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`);
          console.log(response.data.list[7].weather[0].description)
          return res.json(response.data.list[7].weather[0].description)
        } catch (error) {
            return res.json(error)
        }
      }
      getForecast()
    
  })

  router.get('/paris', (req, res) => {

    async function getWeather() {
        try {
          const city = "Paris"
          const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
          console.log(response)
          return res.json(response.data.weather[0].description)
        } catch (error) {
            return res.json(error)
        }
      }
      getWeather()
    
  })

  router.get('/paris/forecast', (req, res) => {

    async function getForecast() {
        //Forecast 24 hours time
        try {
          const city = "Paris"

          forecastParis.findOne({city: city}, async (err, doc) => {
              console.log(doc)
            if(!doc) {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                const forecast = new forecastParis({city: city, weather: response.data.list[7].weather[0].description})
                forecast.save((err) => {
                    if (err) return err;
                    console.log('doc saved')
                })
                
                return res.json(response.data.list[7].weather[0].description)
            }
                console.log("returning from db")
                return res.json(doc)
          })
        } catch (error) {
            return res.json(error)
        }
      }
      getForecast()
    
  })

  router.get('/time-diff', (req, res) => {

    async function getTimeDiff() {
        try {
            const city1 = "Paris"
            const city2 = "Sydney"
          const response1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=${process.env.API_KEY}`);
          let timeParis = response1.data.timezone
          const response2 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city2}&units=metric&appid=${process.env.API_KEY}`);
          let timeSydney = response2.data.timezone
          
        
          let timediff = timeSydney-timeParis
          let timediffHours = (timeSydney-timeParis)/60/60

        
            return res.json(timediffHours)
          }
          
          
     catch (error) {
            return res.json(error)
        }
      }
      getTimeDiff()
    
  })

  module.exports = router;