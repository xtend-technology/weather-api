import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherSydneyForecast(props) {

    const [clicked, setClicked] = useState(false);
    const [weatherSydneyForecast, setWeatherSydneyForecast] = useState("");
    const onClickHandler = () => {
        
        async function SydneyForecast(){
            const weather = await axios.get(`http://localhost:5000/weather/Sydney/forecast`);
            setWeatherSydneyForecast(weather.data.weather)
            setClicked(true)
            console.log(weather.data)
        }
        if(clicked){
            setClicked(false)
        } else {
            SydneyForecast()
        }
        
    }


    return (
      <div>

          
          {clicked? <div><p>Looks like it will be {weatherSydneyForecast} in {props.city} tomorrow</p><button style={{cursor: 'pointer'}} onClick={onClickHandler}>Hide forecast</button></div>: <button style={{cursor: 'pointer'}} onClick={onClickHandler}>Click for forecast</button>}
      </div>
    );
  }
  
  export default WeatherSydneyForecast;