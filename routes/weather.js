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

    
        const client = redis.createClient()
        await client.connect()


        try {

        const resp = await client.get("SydneyWeather")
        if(resp) {console.log(resp)
            return res.status(200).json({description: JSON.parse(resp)})
        } else {
            
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
                console.log('response', response.data.weather[0].description)
                const send = await client.set("SydneyWeather", JSON.stringify(response.data.weather[0].description), {EX:10800})
                client.quit()
            return res.status(200).json({description: response.data.weather[0].description})
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


  router.get('/time-diff/:city1/:city2', async(req, res) => {
    console.log('got it', req.params.city1, req.params.city2)
   
    try {
        const city1 = req.params.city1
        const city2 = req.params.city2
      const response1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=${process.env.API_KEY}`);
      let timeCity1= response1.data.timezone

      console.log('time city 1', timeCity1)
      const response2 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city2}&units=metric&appid=${process.env.API_KEY}`);
      let timeCity2 = response2.data.timezone
      console.log('time city 2',timeCity2)
      
        if(timeCity1>timeCity2) {
            let timediff = timeCity1-timeCity2
            console.log('time diff',timeCity2)
            let cityAhead= city1
            let cityBehind= city2

            let timediffHours = timediff/60/60
        console.log("city ahead", cityAhead)
        console.log("city behind", cityBehind)
    
        return res.status(200).json({
            
                "cityAhead": cityAhead,
                "cityBehind": cityBehind,
                "timeDiff": timediffHours
            
        })
        } else {
            let timediff = timeCity2-timeCity1
            let cityAhead= city2
            let cityBehind= city1

            let timediffHours = timediff/60/60
        console.log("city ahead", cityAhead)
        console.log("city behind", cityBehind)
    
        return res.status(200).json({
            "cityAhead": cityAhead,
            "cityBehind": cityBehind,
            "timeDiff": timediffHours
        }
        )
        }
      
      
      }
      
      
 catch (error) {
        return res.json(error)
    }
  

})

  module.exports = router;