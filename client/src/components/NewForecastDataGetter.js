import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewForecast from './NewForecast'



function NewForecastDataGetter(props) {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        
        // Update the document title using the browser API
        async function forecast(){
            const resp = await axios.get(`http://localhost:5000/weather/coords/${props.city}`);
            setWeather(resp.data.list)
        }

        forecast()

        
        
      },[props.city]);
   

      

    return (
      <div style={{maxWidth: "50%"}}>

          <NewForecast weather={weather} city={props.city}/>
          
      </div>
    );
  }
  
  export default NewForecastDataGetter;