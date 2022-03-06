import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Timediff(props) {

    const [timeDiff, setTimeDiff] = useState(null)
    const [cityAhead, setCityAhead] = useState("")
    const [cityBehind, setCityBehind] = useState("")


    useEffect(() => {
        // Update the document title using the browser API
        
        async function timeDiff(){
            const timeDiff= await axios.get(`http://localhost:5000/weather/time-diff/${props.city1}/${props.city2}`);
            console.log('Time diff data', timeDiff.data)
            setTimeDiff(timeDiff.data.timeDiff)
            setCityAhead(timeDiff.data.cityAhead)
            setCityBehind(timeDiff.data.cityBehind)
        }

        timeDiff()

        
        
      },[]);


    return (
      <div>
          <h5>*{cityAhead} is {timeDiff} hours ahead of {cityBehind}</h5>
          
      </div>
    );
  }
  
  export default Timediff;