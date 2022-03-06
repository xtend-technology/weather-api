import React, { useState } from 'react';
import axios from 'axios';

function WeatherParisForecast(props) {

    const [clicked, setClicked] = useState(false);
    const [weatherParisForecast, setWeatherParisForecast] = useState("");
    const onClickHandler = () => {
        
        async function parisForecast(){
            setClicked(true)
            const weather = await axios.get(`http://localhost:5000/weather/paris/forecast`);
            setWeatherParisForecast(weather.data.weather)
            
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

          {clicked? <div><p>Looks like it will be {weatherParisForecast} in {props.city} tomorrow</p><button style={{cursor: 'pointer'}} onClick={onClickHandler}>Hide forecast</button></div>: <button style={{cursor: 'pointer'}} onClick={onClickHandler}>Click for forecast</button>}
      </div>
    );
  }
  
  export default WeatherParisForecast;