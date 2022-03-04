import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewForecast from './NewForecast'


function NewForecastDataGetter(props) {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        
        // Update the document title using the browser API
        async function forecast(){
            const resp = await axios.get(`http://localhost:5000/weather/coords`);
            setWeather(resp.data.list)
        }

        forecast()

        
        
      },[]);
   

      

    return (
      <div>

          <NewForecast weather={weather} city="Geelong"/>
          
      </div>
    );
  }
  
  export default NewForecastDataGetter;