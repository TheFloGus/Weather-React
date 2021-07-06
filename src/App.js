import React, {useState, useEffect} from 'react';
import PrintAll from './print'
import './style.css';
import * as ImageObj from './images'

function App() {

	const [value, setValue] = useState('')
	const [city, setCity] = useState('minsk')
	const [weather, setWeather] = useState({})
	const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
	const [isHistory, setIsHistory] = useState(false)
	const [imageUrl, setImageUrl] = useState(ImageObj.image15)
	

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
		isHistory ? setIsHistory(false) : setIsHistory(true);
	}

	function getLocalLocation(e){
		e.preventDefault()
		navigator.geolocation.getCurrentPosition(position => {
			setCity(`${position.coords.latitude},${  position.coords.longitude}`)
		})
		setIsHistory(false);
	}

	function changeBG(data){
		const {time} = data;
		let hours = time[0]+time[1]
		for (let key in ImageObj){
			if(key === `image${hours}`){
				setImageUrl(ImageObj[key])
			}
		}
		
	}


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
		fetch(`http://api.weatherstack.com/current?access_key=3db9e539ae24dd6589ee5693b2cfbcba&query=${city}`)
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
					changeBG(weather)
				}
				setHistory([weather, ...history])
			}
		})
		.catch(err=>console.log(err))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city])

	useEffect(() => {
		setTimeout(localStorage.setItem('history', JSON.stringify(history)), 1000)
	}, [history]);

  return (
	<div className="wrap" style = {{backgroundImage: `url(${imageUrl})`}}>
		<div className="container">
			<form className = 'form' onKeyPress = {buttonHandler}>
				<button id = 'localWeather' className = 'form__btn' onClick = {getLocalLocation}>Local</button>
				<button id = 'history' className = 'form__btn' onClick = {historyHandler}>History</button>
				<input type="text" id ='input' className = 'form__input' placeholder = 'Enter city name, e.g. Minsk' value = {value} onChange = {changeHandler} />
				<button id = 'button' className = 'form__btn' type="submit" onClick = {clickHandler}>Search</button>
			</form>
			<div id = 'data' className = 'data'>
				{PrintAll(isHistory, history, setHistory, weather)}
			</div>
		</div>
	</div>
  );
}

export default App;