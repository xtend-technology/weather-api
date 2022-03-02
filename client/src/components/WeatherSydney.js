import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherSydney(props) {

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
          <h4>The weather in {props.city} today is: {weatherSydney}</h4>
      </div>
    );
  }
  
  export default WeatherSydney;
  