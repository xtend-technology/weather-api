import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherSydney() {

    const [clicked, setClicked] = useState(false);
    const [weatherSydney, setweatherSydney] = useState(null);
    console.log(weatherSydney)
    const onClickHandler = () => {
        setClicked(true)
        console.log('Clicked')
    }

    useEffect(() => {

      
        // Update the document title using the browser API
        async function sydney(){
            const weather = await axios.get(`http://localhost:5000/weather/sydney`);
            console.log(weather.data)
            setweatherSydney(weather.data)
        }

        sydney()

        
        
      }, []);

    return (
      <div>
          weather in Sydney today is: {weatherSydney}
      </div>
    );
  }
  
  export default WeatherSydney;
  