// Variables
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherBox = document.getElementById("weather");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_URL = "https://openweathermap.org/img/wn/";

// config.js is not in the repo, so it might be missing
function getApiKey() {
  if (typeof CONFIG === "undefined") {
    return "";
  }
  return CONFIG.API_KEY;
}

// ui states

function showLoading() {
  loading.hidden = false;
  errorBox.hidden = true;
  weatherBox.hidden = true;
  searchButton.disabled = true;
}

function hideLoading() {
  loading.hidden = true;
  searchButton.disabled = false;
}

function showError(text) {
  errorBox.textContent = text;
  errorBox.hidden = false;
  weatherBox.hidden = true;
}

function showWeather(data) {
  const info = data.weather[0];

  cityName.textContent = data.name + ", " + data.sys.country;
  weatherIcon.src = ICON_URL + info.icon + "@2x.png";
  weatherIcon.alt = info.description;
  temperature.textContent = Math.round(data.main.temp) + "°C";
  description.textContent = info.description;
  feelsLike.textContent = Math.round(data.main.feels_like) + "°C";
  humidity.textContent = data.main.humidity + "%";
  wind.textContent = data.wind.speed + " m/s";
  pressure.textContent = data.main.pressure + " hPa";

  errorBox.hidden = true;
  weatherBox.hidden = false;
}

// fetching

async function fetchWeather(city) {
  const apiKey = getApiKey();
  if (apiKey === "" || apiKey === "YOUR_API_KEY_HERE") {
    throw new Error("No API key found. Check the README for how to add one.");
  }

  const url =
    API_URL +
    "?q=" +
    encodeURIComponent(city) +
    "&units=metric&appid=" +
    apiKey;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error("Could not reach the weather service. Check your internet connection.");
  }

  if (response.status === 404) {
    throw new Error('Could not find a city called "' + city + '". Check the spelling and try again.');
  }
  if (response.status === 401) {
    throw new Error("The API key is invalid or not active yet. New keys can take a couple of hours to work.");
  }
  if (response.status === 429) {
    throw new Error("Too many requests. Please wait a minute and try again.");
  }
  if (!response.ok) {
    throw new Error("Something went wrong (error " + response.status + "). Please try again later.");
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error("The weather service sent back something unexpected.");
  }
}

async function searchCity(city) {
  showLoading();
  try {
    const data = await fetchWeather(city);
    showWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// events

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  searchCity(city);
});
