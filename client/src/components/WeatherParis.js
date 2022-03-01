import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherParis() {

    const [clicked, setClicked] = useState(false);
    const [weatherParis, setweatherParis] = useState("");
    const onClickHandler = () => {
        setClicked(true)
        console.log('Clicked')
    }

    useEffect(() => {
        // Update the document title using the browser API
        async function paris(){
            const weather = await axios.get(`http://localhost:5000/weather/paris`);
            setweatherParis(weather.data)
        }

        paris()
        
      });

    return (
      <div>
          weather in Paris today is: {weatherParis}
          <button onClick={onClickHandler}>Click for forecast</button>
      </div>
    );
  }
  
  export default WeatherParis;
  