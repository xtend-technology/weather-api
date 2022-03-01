import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Timediff() {

    const [timeDiff, setTimeDiff] = useState(null);


    useEffect(() => {
        // Update the document title using the browser API
        
        async function timeDiff(){
            const timeDiff= await axios.get(`http://localhost:5000/weather/time-diff`);
            setTimeDiff(timeDiff.data)
        }

        timeDiff()

        
        
      },[]);

    return (
      <div>
          Sydney is {timeDiff} hours ahead of Paris
          
      </div>
    );
  }
  
  export default Timediff;