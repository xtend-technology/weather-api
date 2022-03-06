import './App.css';
import WeatherSydney from './components/WeatherSydney'
import WeatherParis from './components/WeatherParis'
import WeatherSydneyForecast from './components/WeatherSydneyForecast'
import WeatherParisForecast from './components/WeatherParisForecast'
import Timediff from './components/TimeDiff'
import NewForecastDataGetter from './components/NewForecastDataGetter'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
        <h2>Weather App</h2>
        <Form />
        <WeatherSydney city="Sydney"/>
        <WeatherSydneyForecast city="Sydney"/>
        <WeatherParis city="Paris"/>
        <WeatherParisForecast city="Paris"/>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
        <NewForecastDataGetter city="Brisbane"/>
        <NewForecastDataGetter city="Perth"/>
        </div>
        <Timediff city1="Brisbane" city2="Perth"/>
    </div>
  );
}

export default App;
