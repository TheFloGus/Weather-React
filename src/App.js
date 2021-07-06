import React, {useState, useEffect} from 'react';
import PrintAll from './print'
import './style.css';

function App() {

	const [value, setValue] = useState('')
	const [city, setCity] = useState('')
	const [weather, setWeather] = useState({})
	const [history, setHistory] = useState([]);
	const [isHistory, setIsHistory] = useState(false)

	function changeHandler ({target}) {
		setValue(target.value)
	}

	function clickHandler(e){
		e.preventDefault()
		setCity(value)
		setValue('')
		setIsHistory(false)
	}
	
	function buttonHandler(e){
		if (e.key === 'Enter'){
			clickHandler(e)
		}
	}

	function historyHandler(e){
		e.preventDefault();
		setIsHistory(true)
	}

	function getLocalLocation(e){
		if(e){
			e.preventDefault();
		}
		navigator.geolocation.getCurrentPosition(position => {
			setCity(`${position.coords.latitude},${  position.coords.longitude}`)
		})
	}
	getLocalLocation();


	function createWeatherObject(data){
		return {
			location: `${data.location.name} , ${data.location.country}`,
			temperature: data.current.temperature,
			time: data.location.localtime.split(" ")[1],
			feelsLike: data.current.feelslike,
			weatherDescriptions: data.current.weather_descriptions,
			windDir: data.current.wind_dir,
			windSpeed: data.current.wind_speed,
			pressure: data.current.pressure
		}
	}
	

	useEffect(() => {
		fetch(`http://api.weatherstack.com/current?access_key=335d7d1f5a969d13a89af4497e51148d&query=${city}`)
    	.then (r => r.json())
    	.then(data => {
			if (data.success === false) {
				console.log('there is no such city');
			}else{
				const weather = createWeatherObject(data);
				setWeather(weather)
				if (history.length >= 5){
					let newHistory = history;
					newHistory.pop();
					setHistory(newHistory)
				}
				setHistory([weather, ...history])
			}
		})
		.catch(err=>console.log(err))
	}, [city])

  return (
	<div className="wrap">
		<div className="container">
			<form className = 'form' onKeyPress = {buttonHandler}>
				<button id = 'localWeather' className = 'form__btn' onClick = {getLocalLocation}>Local</button>
				<button id = 'history' className = 'form__btn' onClick = {historyHandler}>History</button>
				<input type="text" id ='input' className = 'form__input' placeholder = 'Enter city name, e.g. Minsk' value = {value} onChange = {changeHandler} />
				<button id = 'button' className = 'form__btn' type="submit" onClick = {clickHandler}>Search</button>
			</form>
			<div id = 'data' className = 'data'>
				{PrintAll(isHistory, history, weather)}
			</div>
		</div>
	</div>
  );
}

export default App;
