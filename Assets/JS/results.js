var queryString = document.location.search
var queryStringSplit = queryString.split('&')
var latitude = queryStringSplit[0].split('=')
var longitude = queryStringSplit[1].split('=')
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHumid = document.querySelector('#current-humidity');
var UVindex = document.querySelector('#uvindex');
var forecastEl = document.querySelector('#forecast');
var weatherAPIKEY = 'fed38a219f3593c3165590c50f9b3a9e';



const generateWeather =()=>{
//Insert API Key
// var weatherAPIKEY = 'fed38a219f3593c3165590c50f9b3a9e' ;
}


// User input IE
// var weatherLOCNUM = coordinates ; 

var weatherDATA;

function getWeatherParam () {
     var lat = latitude[1].toString();
     var lon = longitude[1].toString();
     weatherLOCNUM = lat.concat(",",lon);
    return
}

function getWeather () {
    getWeatherParam();

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude[1] + '&lon=' + longitude[1] + '&appid=' + weatherAPIKEY + '&units=imperial')
        .then(function(response){
            if (response.ok){

                response.json()
                .then(function(data) {
                    weatherDATA = data;
                    getWeatherInfo(data);
                });
            }   else {
            }
})}

getWeather();
function getWeatherInfo(data) {
var bannerImgEl = document.createElement('img');
bannerImgEl.setAttribute('src', "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")
  currentTemp.textContent = data.current.temp;
  currentWind.textContent = data.current.wind_speed;
  currentHumid.textContent = data.current.humidity;

  var uvi = data.current.uvi
  UVindex.textContent = uvi;
  if (uvi < 3) {
    UVindex.className = 'bg-success text-white';
  }  else if (uvi >= 3 && uvi < 5) {
    UVindex.className = 'bg-warning text-white';
  } else {
    UVindex.className = 'bg-danger text-white';
  }


var forecast = data.daily;
  for (var i = 0; i < 5; i++) {
    var dailyEl = document.createElement('div');
    dailyEl.classname = 'forecastday text-white'

    var dateEl = document.createElement('h3');
    dateEl.textContent = moment.unix(forecast[i].dt).format("M/D/YYYY");
    dailyEl.append(dateEl);

    var wIcon = document.createElement('img');
    wIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + forecast[i].weather[0].icon + "@2x.png")
    dailyEl.append(wIcon);

    var tempPar = document.createElement('p');
    var windPar = document.createElement('p');
    var humidPar = document.createElement('p');
    tempPar.textContent = "Temperature: " + forecast[i].temp.day + "F";
    windPar.textContent = "Wind Speed: " + forecast[i].wind_speed + "mph";
    humidPar.textContent = "Humidity: " + forecast[i].humidity + "%";
    dailyEl.append(tempPar, windPar, humidPar);

    
    forecastEl.append(dailyEl);
  }
    

}




