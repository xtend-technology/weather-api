import './App.css';
import WeatherSydney from './components/WeatherSydney'
import WeatherParis from './components/WeatherParis'
import Timediff from './components/TimeDiff'

function App() {
  return (
    <div className="App">
        hello
        <WeatherSydney />
        <WeatherParis />
        <Timediff />
    </div>
  );
}

export default App;
