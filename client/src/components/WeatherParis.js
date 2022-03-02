import React, { useState, useEffect } from 'react';
import axios from 'axios';


function WeatherParis(props) {
    const [weatherParis, setweatherParis] = useState("");
   

    useEffect(() => {
        
        // Update the document title using the browser API
        async function paris(){
            const weather = await axios.get(`http://localhost:5000/weather/paris`);
            setweatherParis(weather.data)
        }

        paris()

        
        
      },[]);

    return (
      <div>
          <h4>The weather in {props.city} today is: {weatherParis}</h4>
          
      </div>
    );
  }
  
  export default WeatherParis;
  