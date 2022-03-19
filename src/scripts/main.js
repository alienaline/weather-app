import VAR from './view.js';
import storage from './storage.js';

//implementation the functions

async function getWeather(cityName) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        let temp = Math.round(data.main.temp);

        VAR.CITY.forEach(elem => elem.textContent = data.name);
        VAR.TEMP.forEach(elem => elem.textContent = temp + '°');
        VAR.ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        VAR.FEELS_LIKE.forEach(elem => elem.textContent = Math.round(data.main.feels_like) + '°');
        VAR.WEATHER.textContent = data.weather[0].main;
        VAR.SUNRISE.textContent = getTime(data.sys.sunrise);
        VAR.SUNSET.textContent = getTime(data.sys.sunset);

    } catch(error) {
        alert(error);
    }
}

async function getForecast(cityName) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        

        VAR.FORECAST_CARDS.textContent = '';
        data.list.forEach(item => {
            let forecastCard = VAR.FORECAST_TEMPLATE.content.cloneNode(true);
            let forecastDate = forecastCard.querySelector('.date');
            let forecastTime = forecastCard.querySelector('.time');
            let forecastTemp = forecastCard.querySelector('.weather_temp');
            let forecastFeelsLike = forecastCard.querySelector('.weather_feels-like');
            let forecastIcon = forecastCard.querySelector('.forecast_card-icon');

            forecastDate.textContent = new Date(item.dt * 1000).getDate() + ' ' + new Date(item.dt * 1000).toLocaleString('en-US', { month: 'long' });
            forecastTime.textContent = getTime(item.dt);
            forecastTemp.textContent = Math.round(item.main.temp) + '°';
            forecastFeelsLike.textContent = Math.round(item.main.feels_like) + '°';
            forecastIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`

            VAR.FORECAST_CARDS.append(forecastCard);
        })
        
    } catch(err) {
        alert(err);
    }

}

function addFavoriteCity() {
    let city = VAR.ADDED_CITIES_TEMPLATE.content.cloneNode(true);
    let cityName = city.querySelector('.added-city');
    let removeBtn = city.querySelectorAll('.remove');

    let cityNotAdded = !VAR.ADDED_CITIES_LIST.textContent.includes(VAR.CITY[0].textContent);

    if (cityNotAdded) {
        cityName.textContent = VAR.CITY[0].textContent;
        cityName.addEventListener('click', () => {
            getWeather(cityName.textContent);
        });

        removeBtn.forEach(elem => elem.addEventListener('click', () => {
            elem.closest('.cities-list_button').remove();
            storage.deleteFromLocalStorage;
        }));

        VAR.ADDED_CITIES_LIST.append(city);
    }
}


function getTime(ms) {
    let hours = new Date(ms * 1000).getHours();
    let minutes = new Date(ms * 1000).getMinutes();

    hours = (hours <= 9) ? '0' + hours : hours;
    minutes = (minutes <= 9) ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
}


const apiKey = 'aa29a41587e93e740b35d26547f2127f';
const checkedCity = storage.getFavoriteCities().checked;

const favoriteCities = storage.getFavoriteCities().cities;
for (let city of favoriteCities) {
    let favoriteCity = VAR.ADDED_CITIES_TEMPLATE.content.cloneNode(true);
    let item = favoriteCity.querySelectorAll('.cities-list_button');
    let addedCity = favoriteCity.querySelector('.added-city');
    let removeBtn = favoriteCity.querySelector('.remove');

    addedCity.textContent = city;
    addedCity.addEventListener('click', () => {
        getWeather(addedCity.textContent);
        storage.setCheckedCity(addedCity.textContent);
    });

    removeBtn.addEventListener('click', (event) => {
        event.target.parentElement.remove();  
    });

    removeBtn.addEventListener('click', storage.deleteFromLocalStorage);
    VAR.ADDED_CITIES_LIST.append(favoriteCity);
}


// set default city

getWeather(checkedCity);
getForecast(checkedCity);
// add event listeners for send requests

VAR.FORM.addEventListener('submit', function() {
    let cityName = VAR.INPUT.value.trim();
    new Promise(() => getWeather(cityName));
    storage.setCheckedCity(cityName);
});

VAR.ADD_CITY_BUTTON.addEventListener('click', addFavoriteCity);
VAR.ADD_CITY_BUTTON.addEventListener('click', storage.saveFavoriteCities);