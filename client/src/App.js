import './App.css';
import WeatherSydney from './components/WeatherSydney'
import WeatherParis from './components/WeatherParis'
import WeatherSydneyForecast from './components/WeatherSydneyForecast'
import WeatherParisForecast from './components/WeatherParisForecast'
import Timediff from './components/TimeDiff'

function App() {
  return (
    <div className="App">
        hello
        <WeatherSydney />
        <WeatherSydneyForecast />
        <WeatherParis />
        <WeatherParisForecast />
        <Timediff />
    </div>
  );
}

export default App;
