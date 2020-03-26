window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	fetch('https://api.openweathermap.org/data/2.5/weather?q=Azerbaijan&APPID=818588fcfb836dd0da30652deb33b47c')
		.then(function(resp) {return resp.json()})
		.then(function(data) {
			console.log(data);
			let tempDegree = document.querySelector('.weather-temp__degree'),
					tempInCelsius = ((data.main['temp'] - 273)).toFixed(0),
					cloudlyInfo = document.querySelector('.weather-box__procent--cloudly-info'),
					humidityInfo = document.querySelector('.weather-box__procent--humidity'),
					pressureInfo = document.querySelector('.weather-box__procent--pressure'),
					windSpeedInfo = document.querySelector('.weather-box__procent--wind-speed');

			tempDegree.textContent = tempInCelsius;
			cloudlyInfo.textContent = data.weather[0]['description'];
			humidityInfo.textContent = data.main['humidity'] + ' %';
			pressureInfo.textContent = data.main['pressure'] + ' mBar';
			windSpeedInfo.textContent = data.wind['speed'] + ' km/h';
		});
		
	setInterval(localTime, 1000);
	setInterval(localDate, 3600);

	function localDate() {
		let newDate = new Date(),
				days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
				'September', 'Octover', 'November', 'December'],
				dateDay = newDate.getDay(),
				dateMonth = newDate.getMonth(),
				dateYear = newDate.getFullYear(),
				outDays = '',
				outMonth = '',
				dayBox = document.querySelector('.time__day'),
				monthBox = document.querySelector('.time__month'),
				yearBox = document.querySelector('.time__year');

		for (let key in days) {
			if (key == dateDay) {
				outDays = days[key];
			}
		}

		for (let key in month) {
			if (key == dateMonth) {
				outMonth = month[key];
			}
		}

		dayBox.textContent = outDays + ' , ';
		monthBox.textContent = outMonth + ' ';
		yearBox.textContent = dateYear + ' ';
	}	

	function localTime() {
		let newDate = new Date(),
				dateMinutes = newDate.getMinutes(),
				dateHours = newDate.getHours(),
				timeBox = document.querySelector('.time__number'),
				mainBox = document.querySelector('.main');
				
		if (dateMinutes < 10) dateMinutes = '0' + dateMinutes;

		if (dateHours >= 0 && dateHours <= 6 ) mainBox.classList.add('main--night-theme');
		else if (dateHours >= 6 && dateHours <= 7) mainBox.classList.add('main--sunrise-theme');
		else if (dateHours >= 7 && dateHours <= 18) mainBox.classList.add('main--day-theme');
		else if (dateHours >= 18 && dateHours <= 19) mainBox.classList.add('main--sunrset-theme');
		else if (dateHours >= 19 && dateHours <= 23) mainBox.classList.add('main--night-theme');
		
		timeBox.textContent = dateHours + ':' + dateMinutes + ' ';
	}


});
