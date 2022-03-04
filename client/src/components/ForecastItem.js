


function ForecastItem(props) {

    return (
      <div>
          <p style={{color: "blue", textAlign: "left"}}>Date: {props.date} Time: {props.time} Conditions: {props.conditions} Temp: {props.temp}</p>
      </div>
    );
  }
  
  export default ForecastItem;