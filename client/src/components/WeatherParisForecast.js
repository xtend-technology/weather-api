import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherParisForecast() {

    const [clicked, setClicked] = useState(false);
    const [weatherParisForecast, setWeatherParisForecast] = useState("");
    const onClickHandler = () => {
        setClicked(true)
        async function parisForecast(){
            const weather = await axios.get(`http://localhost:5000/weather/paris/forecast`);
            setWeatherParisForecast(weather.data)
            console.log(weather.data)
        }

        parisForecast()
    }


    return (
      <div>

          <button onClick={onClickHandler}>Click for forecast</button>
      </div>
    );
  }
  
  export default WeatherParisForecast;