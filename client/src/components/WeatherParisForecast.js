import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherParisForecast() {

    const [clicked, setClicked] = useState(false);
    const [weatherParisForecast, setWeatherParisForecast] = useState("");
    const onClickHandler = () => {
        
        async function parisForecast(){
            const weather = await axios.get(`http://localhost:5000/weather/paris/forecast`);
            setWeatherParisForecast(weather.data.weather)
            setClicked(true)
            console.log(weather.data)
        }
        if(clicked){
            setClicked(false)
        } else {
            parisForecast()
        }
        
    }


    return (
      <div>

          {clicked? <div><p>weather in Paris tomorrow is: {weatherParisForecast}</p><button onClick={onClickHandler}>Hide forecast</button></div>: <button onClick={onClickHandler}>Click for forecast</button>}
      </div>
    );
  }
  
  export default WeatherParisForecast;