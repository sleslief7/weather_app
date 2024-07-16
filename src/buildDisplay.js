import { format, parseISO } from 'date-fns';
export function buildCurrentWeatherDisplay(data, symbol) {
  const currentWeatherInfo = document.getElementById('current-weather-info');

  let {
    windSpeed,
    humidity,
    precipitation,
    sunrise,
    sunset,
    cityName,
    temp,
    icon,
    feelsLike,
    conditions,
    days,
    today,
  } = data;

  let tempmin = days[0].tempmin;
  let tempmax = days[0].tempmax;

  today = today.replaceAll('-', '/');
  let windUnit = symbol === 'F' ? 'm/h' : 'k/h';
  let precipitationUnit = symbol === 'F' ? 'in' : 'mm';

  const inputSunriseDate = parseISO(`1970-01-01T${sunrise}`);
  const sunriseTime = format(inputSunriseDate, 'hh:mm a');

  const inputSunsetDate = parseISO(`1970-01-01T${sunset}`);
  const sunsetTime = format(inputSunsetDate, 'hh:mm a');

  let currentData = document.getElementById('current-data');

  let date = format(today, 'ccc, MMM dd, yyyy');

  currentData.innerHTML = `
        <h1 id="city" class="text-4xl">${cityName}</h1>
        <h4 id="date" class="opacity-50 text-2xl mb-5">${date}</h4>
        <div class="flex">
          <div id="temp" class="text-6xl flex mr-5">
            <div id="icon"><img src='./icons/${icon}.png'/></div>
            <div id="temp-display">${temp} &#176${symbol}</div>
          </div>
          <div id="conditions-data">
            <h4 id="conditions" class="text-3xl">${conditions}</h4>
            <div id="feels-like" class="opacity-50 text-xl mb-3">Feels like ${feelsLike} &#176${symbol}</div>
          </div>
        </div>
  `;

  currentWeatherInfo.innerHTML = `
     <div id="wind">
            <p class="opacity-50 text-xl">Wind</p>
            <p class="data text-3xl">${windSpeed} ${windUnit}</p>
          </div>
          <div id="humidity">
            <p class="opacity-50 text-xl">Humidity</p>
            <p class="data text-3xl">${humidity} %</p>
          </div>
          <div id="precipitation">
            <p class="opacity-50 text-xl">Precipitation</p>
            <p class="data text-3xl">${precipitation} ${precipitationUnit}</p>
          </div>
          <div id="sunrise">
            <p class="opacity-50 text-xl">Sunrise</p>
            <p class="data text-3xl">${sunriseTime}</p>
          </div>
          <div id="sunset">
            <p class="opacity-50 text-xl">Sunset</p>
            <p class="data text-3xl">${sunsetTime}</p>
          </div>
          <div id="min-temp">
            <p class="opacity-50 text-xl">Min</p>
            <p class="data text-3xl">${tempmin.toFixed(1)} &#176${symbol}</p>
          </div>
          <div id="sunset">
            <p class="opacity-50 text-xl">Max</p>
            <p class="data text-3xl">${tempmax.toFixed(1)} &#176${symbol}</p>
          </div>
  `;
}

export function buildDayWeatherDisplay(data, symbol) {
  let { datetime, icon, tempmin, tempmax, precip } = data;

  let weekDay = format(datetime.replaceAll('-', '/'), 'ccc');
  symbol = symbol === 'F' ? 'F' : 'C';

  const dayContainer = generateDayElement(
    weekDay,
    icon,
    tempmin,
    symbol,
    tempmax,
    precip
  );

  return dayContainer;
}

function generateDayElement(weekDay, icon, tempmin, symbol, tempmax, precip) {
  const dayContainer = document.createElement('div');
  let precipitationUnit = symbol === 'F' ? 'in' : 'mm';
  dayContainer.classList.add('day-info', 'text-xl');
  dayContainer.innerHTML = `
    <div class="flex forecast-cell">
      ${weekDay}
    <img src='./icons/${icon}.png'/>
    </div>
    <div class="forecast-cell">
    ${precip.toFixed(1)} ${precipitationUnit}
    </div>
    <div class="forecast-cell">
    ${tempmin.toFixed(1)} &#176${symbol}
    </div>
    <div class="forecast-cell">
      ${tempmax.toFixed(1)} &#176${symbol}
    </div>
  `;
  return dayContainer;
}
