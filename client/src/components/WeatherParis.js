import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherParis() {

    const [clicked, setClicked] = useState(false);
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
          weather in Paris today is: {weatherParis}
          
      </div>
    );
  }
  
  export default WeatherParis;
  