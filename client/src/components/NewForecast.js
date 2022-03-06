import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForecastItem from './ForecastItem'

function NewForecast(props) {

  

      
        let weatherItems = props.weather.map((item, i) => {
            const date = new Date(item.dt*1000)
            const formatted = date.toLocaleTimeString()
            const dateFormatted = date.toDateString()
            if(i%3 ==0){
                // return <li key={i} >Date: {dateFormatted} Time: {formatted} Conditions: {item.weather[0].description} </li> 
                return <ForecastItem key={i} date={dateFormatted} time={formatted} conditions={item.weather[0].description} temp={item.main.temp}/>
            }
            
        })
      
      

    return (
      <div>

          <h4>{props.city} forecast:</h4>
          <ul>{weatherItems}</ul>
          
      </div>
    );
  }
  
  export default NewForecast;