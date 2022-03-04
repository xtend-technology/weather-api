const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const mongoose = require('mongoose')
const redis = require('redis')



const forecastSchema = new mongoose.Schema({
    city: String,
    weather: String,
    time: { type : Date, expires: 3600, default: Date.now }
})
const Forecast = mongoose.model("Forecast", forecastSchema)


router.get('/sydney', async (req, res) => {

    const city = "Sydney"

    
        const client = await redis.createClient()
        await client.connect()


        try {

        const resp = await client.get("SydneyWeather")
        if(resp) {console.log(resp)
            return res.json(JSON.parse(resp))
        } else {
            
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                console.log('response', response.data.weather[0].description)
                const send = await client.set("SydneyWeather", JSON.stringify(response.data.weather[0].description), {EX:10800})
                client.quit()
            return res.json(response.data.weather[0].description)
        }
           
       
        } catch (error) {
            return res.json(error)
        }
      
      
    
  })

  router.get('/sydney/forecast', async (req, res) => {

        //Forecast 24 hours time
        try {
            const city = "Sydney"
  
            Forecast.findOne({city: city}, async (err, doc) => {

                console.log(doc)
              if(!doc) {
                  console.log('no doc')
                  const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                  const forecast = new Forecast({city: city, weather: response.data.list[7].weather[0].description})
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
    
  })

  router.get('/paris', async (req, res) => {

    const city = "Paris"

    
        const client = await redis.createClient()
        await client.connect()


        try {

        const resp = await client.get("ParisWeather")
        if(resp) {console.log(resp)
            return res.json(JSON.parse(resp))
        } else {
            
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                console.log('response', response.data.weather[0].description)
                const send = await client.set("ParisWeather", JSON.stringify(response.data.weather[0].description), {EX:10800})
                client.quit()
            return res.json(response.data.weather[0].description)
        }
           
       
        } catch (error) {
            return res.json(error)
        }
    
  })

  router.get('/paris/forecast', async (req, res) => {

        //Forecast 24 hours time
        try {
          const city = "Paris"

          Forecast.findOne({city: city}, async (err, doc) => {
              if(err) throw new Error('Find from DB failed')
              console.log("doc is", doc)
            if(!doc) {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                const forecast = new Forecast({city: city, weather: response.data.list[7].weather[0].description})
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
      
      
    
  })

  router.get('/coords/:city', async (req, res) => {
    const city = req.params.city

    // const getcoords = async (city) => {
        
        try {
            const coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`)
            const forecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.data[0].lat}&lon=${coords.data[0].lon}&units=metric&appid=${process.env.API_KEY}`)
            return res.json(forecast.data)
            
        } catch (error) {
            return res.json(error)
        }

        
    
    
    // axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`)
    // .then((response) => response.data)
    // .then((coords)=> axioapi.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}coords[0].lat, coords[0].lon)
    // .then()
    // .catch((err)=> console.log(err))
      

  })

  router.get('/localtime', async(req, res) => {
    try {
        const coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_KEY}`)
        const forecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.data[0].lat}&lon=${coords.data[0].lon}&units=metric&appid=${process.env.API_KEY}`)
        return res.json(forecast.data)
        
    } catch (error) {
        return res.json(error)
    }
  })

  router.get('/time-diff', async(req, res) => {

   
        try {
            const city1 = "Paris"
            const city2 = "Sydney"
          const response1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=${process.env.API_KEY}`);
          let timeParis = response1.data.timezone
          const response2 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city2}&units=metric&appid=${process.env.API_KEY}`);
          let timeSydney = response2.data.timezone
          console.log('time sydney ', timeSydney)
          
        
          let timediff = timeSydney-timeParis
          let timediffHours = (timeSydney-timeParis)/60/60

        
            return res.json(timediffHours)
          }
          
          
     catch (error) {
            return res.json(error)
        }
      
    
  })

  module.exports = router;