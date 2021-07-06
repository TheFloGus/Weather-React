import React from 'react';

function PrintAll(isHistory, history, weather){

	function printWeather (data) {
		return (
			<>
			<div className="weather">
			<h1 className="temperature">{data.temperature}C</h1>
			<p className="location">{data.location}</p>
		</div>

		<div className="data__items">
			<ul className="data__list">
				<li className="data__item">
					<h2 className="data__header" >Time</h2>
					<p className="data__text" id='localtime'>{data.time}</p>
				</li>
				<li className="data__item">
					<h2 className="data__header">Feels like</h2>
					<p className="data__text" id='feelslike'>{data.feelsLike}</p>
				</li>
				<li className="data__item ex">
					<h2 className="data__header">Today is </h2>
					<p className="data__text" id='weather_descriptions'>{data.weatherDescriptions}</p>
				</li>
				<li className="data__item">
					<h2 className="data__header">Wind</h2>
					<p className="data__text" id='wind_dir'>l{data.windDir}</p>
				</li>
				<li className="data__item">
					<h2 className="data__header">Speed</h2>
					<p className="data__text" id='wind_speed'>{data.windSpeed} Km/h</p>
				</li>
				<li className="data__item ex">
					<h2 className="data__header">Pressure</h2>
					<p className="data__text" id='pressure'>{data.pressure} MB</p>
				</li>
			</ul>
		</div>
			</>
		)
	}

	function printHistory(history){
		return (
		<>
			<ul className = "history__list">
				<li className = "history__item">Location</li>
				<li className = "history__item">Temperature</li>
				<li className = "history__item">Time</li>
				<li className = "history__item">Day was</li>
				<li className = "history__item">Wind direction</li>
				<li className = "history__item">Pressure</li>
			</ul>
			<div className = 'line'></div> 
		<>
			{history.map((item) => {
			return (<>
				<ul className = "history__list">
					<li className = "history__item" >{item.location}</li>
					<li className = "history__item" >{item.temperature}</li>
					<li className = "history__item" >{item.time }</li>
					<li className = "history__item" >{item.weatherDescriptions }</li>
					<li className = "history__item" >{item.windDir}</li>
					<li className = "history__item" >{item.pressure }</li>
				</ul>
				<div className = 'line'></div> 
			</>)
			})}</>
			<button id = 'clearHistory' className = 'form__btn clearHistory'>Clear all</button>
		</>
		)
	}



	return (
		<>
		{isHistory ? printHistory(history) : printWeather(weather)}
		</>
	)
}

export default PrintAll;