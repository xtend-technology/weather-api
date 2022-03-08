import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherSydney(props) {

    const [weatherSydney, setWeatherSydney] = useState(null);
    

    useEffect(async() => {
        
          try{
            const weather = await axios.get(`http://localhost:5000/weather/sydney`);
            console.log(weather.data)
            setWeatherSydney(weather.data)
          } catch (err){
            console.log('Get sydney weather failed', err)
          }
            
        
      }, []);

    return (
      <div>
          <h4 role="output">The weather in {props.city} today is: {weatherSydney}</h4>
      </div>
    );
  }
  
  export default WeatherSydney;
  