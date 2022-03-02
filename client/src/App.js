import './App.css';
import WeatherSydney from './components/WeatherSydney'
import WeatherParis from './components/WeatherParis'
import WeatherSydneyForecast from './components/WeatherSydneyForecast'
import WeatherParisForecast from './components/WeatherParisForecast'
import Timediff from './components/TimeDiff'

function App() {
  return (
    <div className="App">
        <h2>Weather App</h2>
        <WeatherSydney city="Sydney"/>
        <WeatherSydneyForecast city="Sydney"/>
        <WeatherParis city="Paris"/>
        <WeatherParisForecast city="Paris"/>
        <Timediff />
    </div>
  );
}

export default App;
