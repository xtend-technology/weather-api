import './App.css';
import WeatherSydney from './components/WeatherSydney'
import WeatherParis from './components/WeatherParis'
import WeatherSydneyForecast from './components/WeatherSydneyForecast'
import WeatherParisForecast from './components/WeatherParisForecast'
import Timediff from './components/TimeDiff'
import NewForecastDataGetter from './components/NewForecastDataGetter'

function App() {
  return (
    <div className="App">
        <h2>Weather App</h2>
        <WeatherSydney city="Sydney"/>
        <WeatherSydneyForecast city="Sydney"/>
        <WeatherParis city="Paris"/>
        <WeatherParisForecast city="Paris"/>
        <NewForecastDataGetter/>
        <Timediff />
    </div>
  );
}

export default App;
