import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherSydney(props) {

    const [weatherSydney, setweatherSydney] = useState(null);
    console.log(weatherSydney)

    useEffect(() => {

      
        
        async function sydney(){
            const weather = await axios.get(`http://localhost:5000/weather/sydney`);
            console.log(weather.data)
            setweatherSydney(weather.data)
        }

        sydney()

        
        
      }, []);

    return (
      <div>
          <h4>The weather in {props.city} today is: {weatherSydney}</h4>
      </div>
    );
  }
  
  export default WeatherSydney;
  