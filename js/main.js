async function search(location) {
  let response = await fetch(
     `https://api.weatherapi.com/v1/forecast.json?key=ebcde8809f0d4359abc130723242106&q=${location}&days=7`
    

  );
  if (response.ok && response.status !== 400) {
    let data = await response.json();
    displayCurrent(data.location, data.current);
    displayAnother(data.forecast.forecastday);
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  search(event.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function displayCurrent(location, currentWeather) {
  if (currentWeather != null) {
    var lastUpdated = new Date(currentWeather.last_updated.replace(" ", "T"));
    let currentWeatherHtml = `<div class="today forecast">
      <div class="forecast-header" id="today">
        <div class="day">${days[lastUpdated.getDay()]}</div>
        <div class="date">${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}</div>
      </div>
      <div class="forecast-content" id="current">
        <div class="location">${location.name}</div>
        <div class="degree">
          <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${currentWeather.condition.icon}" width=90>
          </div>
        </div>
        <div class="custom">${currentWeather.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span>
        <span><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
      </div>
    </div>`;
    document.getElementById("forecast").innerHTML = currentWeatherHtml;
  }
}

function displayAnother(forecastDays) {
  let forecastHtml = "";
  for (let i = 0; i < forecastDays.length; i++) {
    let forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
    forecastHtml += `<div class="forecast">
      <div class="forecast-header">
        <div class="day">${days[forecastDate.getDay()]}</div>
      </div>
      <div class="forecast-content">
        <div class="forecast-icon">
          <img src="https:${forecastDays[i].day.condition.icon}" alt="" width=48>
        </div>
        <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${forecastDays[i].day.condition.text}</div>
      </div>
    </div>`;
  }
  document.getElementById("forecast").innerHTML += forecastHtml;
}

search("Cairo");
