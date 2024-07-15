import './style.css';
import './weatherIcons.js';
import {
  buildCurrentWeatherDisplay,
  buildDayWeatherDisplay,
} from './buildDisplay';

const celsiusBtn = document.getElementById('celsius');
const searchBtn = document.getElementById('search-btn');
const fahrenheitBtn = document.getElementById('fahrenheit');
const locationInput = document.getElementById('search-input');
let unit = 'us';

async function getWeatherData() {
  const key = 'NNLN4Z75359CFNQG2HTRGAV7J';
  let location = locationInput.value ? locationInput.value : 'wayne';
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?lang=en&key=${key}&unitGroup=${unit}`
    );
    const res = await response.json();
    return buildWeatherDto(res);
  } catch (error) {
    alert(`Location not found, please retry`);
    locationInput.value = '';
    return null;
  }
}

function buildWeatherDto(data) {
  const {
    icon,
    temp,
    conditions,
    humidity,
    sunrise,
    sunset,
    feelslike: feelsLike,
    precip: precipitation,
    windspeed: windSpeed,
  } = data.currentConditions;

  return {
    icon,
    temp,
    feelsLike,
    conditions,
    humidity,
    precipitation,
    windSpeed,
    sunrise,
    sunset,
    cityName: data.resolvedAddress,
    days: data.days,
    today: data.days[0].datetime,
  };
}

function createDaysDisplay(data, symbol) {
  let daysContainer = document.getElementById('days-container');
  daysContainer.innerHTML = '';
  daysContainer.appendChild(generateDaysHeaderElement());
  for (let i = 1; i < data.days.length - 7; i++) {
    daysContainer.appendChild(buildDayWeatherDisplay(data.days[i], symbol));
  }
}

async function refreshDisplay(symbol = 'F') {
  let weatherData = await getWeatherData();
  if (weatherData === null) return;
  buildCurrentWeatherDisplay(weatherData, symbol);
  createDaysDisplay(weatherData, symbol);
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  refreshDisplay();
});

fahrenheitBtn.addEventListener('click', () => {
  unit = 'us';
  refreshDisplay();
});

celsiusBtn.addEventListener('click', () => {
  unit = 'metric';
  refreshDisplay('C');
});

function generateDaysHeaderElement() {
  const headerRow = document.createElement('div');
  headerRow.classList.add('day-info', 'text-2xl', 'header');
  headerRow.innerHTML = `
    <div class="forecast-cell">
      Day
    </div>
    <div class="forecast-cell">
      Precip.
    </div>
    <div class="forecast-cell">
      Min
    </div>
    <div class="forecast-cell">
      Max
    </div>
  `;
  return headerRow;
}

refreshDisplay();
