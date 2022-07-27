function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  function showWeather(responce) {
    document.querySelector("#city").innerHTML = responce.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      responce.data.main.temp
    );
    document.querySelector("#feels_like").innerHTML = Math.round(
      responce.data.main.feels_like
    );
    document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      responce.data.wind.speed
    );
    document.querySelector("#current-conditions").innerHTML =
      responce.data.weather[0].main;
  }
  function apiCitySearch(city) {
    let apiKey = "a6351f08b36136455de6d8c91ee0b375";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function searchCityByName(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    apiCitySearch(city);
    const firstNameInput = document.getElementById("city-input");
    console.log(firstNameInput.value);
    firstNameInput.value = "";
  }
  
  function displayPosition(position) {
    let apiKey = "a6351f08b36136455de6d8c91ee0b375";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentTemp(event) {
    console.log("cuurentTemp");
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayPosition);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", searchCityByName);
  
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getCurrentTemp);
  
  apiCitySearch("Kyiv");
  