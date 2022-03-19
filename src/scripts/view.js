function getElem(selector) {
    return document.querySelector(selector)
}

const VAR = {
    WINDOWS: document.querySelectorAll('.window'),
    TABS: document.querySelectorAll('.tab'),
    FORM: getElem('.weather_form'),
    INPUT: getElem('.weather_input'),
    CITY: document.querySelectorAll('.weather_city-name'),
    TEMP: document.querySelectorAll('.weather_temp'),
    ICON: getElem('.weather_cloudly-icon'),
    FEELS_LIKE: document.querySelectorAll('.weather_feels-like'),
    WEATHER: getElem('.weather_weather'),
    SUNRISE: getElem('.weather_sunrise'),
    SUNSET: getElem('.weather_sunset'),
    ADD_CITY_BUTTON: getElem('.weather_like-button'),
    ADDED_CITIES_LIST: getElem('.weather_cities-list'),
    ADDED_CITIES_TEMPLATE: getElem('#weather_cities-template'),
    FORECAST_CARDS: getElem('.weather_forecast-cards'),
    FORECAST_TEMPLATE: getElem('.forecast_template'),
}

export default VAR;