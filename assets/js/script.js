const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const direction = {
    "N": "North",
    "S": "South",
    "E": "East",
    "W": "West",
    "NE": "North East",
    "NW": "North West",
    "SE": "South East",
    "SW": "South West"
};

const weatherFormInput = document.querySelector(".weather-section__form__input");
const weatherFormButton = document.querySelector(".weather-section__form__button");

window.addEventListener("load", getForecastOnStart);
weatherFormInput.addEventListener("input", searchForecast);
weatherFormButton.addEventListener("click", function(e) {
    e.preventDefault();
    searchForecast();
});

async function getLocation() {
    let response = await fetch("http://ip-api.com/json/");
    let data = await response.json();
    return data;
}

async function getForecast(query) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a1c79179c49e48a8bbb74438242406&q=${query}&days=${3}`);
    let data = await response.json();
    return data;
}

async function searchForecast() {
    let forecastData = await getForecast(weatherFormInput.value);
    displayForecast(forecastData);
}

async function getForecastOnStart() {
    let location = await getLocation();
    let forecastData = await getForecast(location.city);
    displayForecast(forecastData);
}

async function displayForecast(forecastData) {
    let firstDay = document.querySelector(".weather-section__today-forecast");
    let secondDay = document.querySelector(".weather-section__tomorrow-forecast");
    let thirdDay = document.querySelector(".weather-section__day-after-tomorrow-forecast");

    // Today's Forecast
    displayFirstDay(firstDay, forecastData);

    // Tomorrow's Forecast
    displaySecondDay(secondDay, forecastData);

    // Day After Tomorrow's Forecast
    displayThirdDay(thirdDay, forecastData);
}

function displayFirstDay(firstDay, forecastData) {
    let date = new Date(forecastData.forecast.forecastday[0].date);
    firstDay.querySelector(".load-placeholder").style.display = "none";
    firstDay.querySelector(".weather-section__date-container__day").textContent = days[date.getDay()];
    firstDay.querySelector(".weather-section__date-container__date").textContent = date.getDate() + month[date.getMonth()];
    firstDay.querySelector(".location").textContent = forecastData.location.name;
    firstDay.querySelector(".degree .number").textContent = forecastData.forecast.forecastday[0].day.avgtemp_c + "°C";
    firstDay.querySelector(".degree .icon").children[0].setAttribute("src", forecastData.forecast.forecastday[0].day.condition.icon);
    firstDay.querySelector(".custom").textContent = forecastData.forecast.forecastday[0].day.condition.text;
    firstDay.querySelector(".humidity").children[1].textContent = forecastData.forecast.forecastday[0].day.avghumidity + "%";
    firstDay.querySelector(".wind-speed").children[1].textContent = forecastData.forecast.forecastday[0].hour[23].wind_kph + "km/h";
    firstDay.querySelector(".wind-direction").children[1].textContent = direction[forecastData.forecast.forecastday[0].hour[23].wind_dir];
}

function displaySecondDay(secondDay, forecastData) {
    let date = new Date(forecastData.forecast.forecastday[1].date);
    secondDay.querySelector(".load-placeholder").style.display = "none";
    secondDay.querySelector(".weather-section__date-container__day").textContent = days[date.getDay()];
    secondDay.querySelector(".icon").children[0].setAttribute("src", forecastData.forecast.forecastday[1].day.condition.icon);
    secondDay.querySelector(".bigger-value").textContent = forecastData.forecast.forecastday[1].day.maxtemp_c + "°C";
    secondDay.querySelector(".smaller-value").textContent = forecastData.forecast.forecastday[1].day.mintemp_c + "°C";
    secondDay.querySelector(".custom").textContent = forecastData.forecast.forecastday[1].day.condition.text;
}

function displayThirdDay(thirdDay, forecastData) {
    let date = new Date(forecastData.forecast.forecastday[2].date);
    thirdDay.querySelector(".load-placeholder").style.display = "none";
    thirdDay.querySelector(".weather-section__date-container__day").textContent = days[date.getDay()];
    thirdDay.querySelector(".icon").children[0].setAttribute("src", forecastData.forecast.forecastday[2].day.condition.icon);
    thirdDay.querySelector(".bigger-value").textContent = forecastData.forecast.forecastday[2].day.maxtemp_c + "°C";
    thirdDay.querySelector(".smaller-value").textContent = forecastData.forecast.forecastday[2].day.mintemp_c + "°C";
    thirdDay.querySelector(".custom").textContent = forecastData.forecast.forecastday[2].day.condition.text;
}