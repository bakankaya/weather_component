import React, { useState, useEffect } from "react";
import convertToASCII from "./assets/convertToASCII.js";
import './App.css';

function App() {

  const [zart,setZart] = useState("")
  const handleChange = () => {
    getWeather(zart)
    document.querySelector("input").value = "";
  }

    /* API KEYS */

  const weatherAPI = "a127619b02228ad2ee53bda273b6dabb";
  const locationAPI = "f0c7b41abdd74f61b131f00066c10382";

  /* Creating Date Format */

  const date = new Date();
  const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  //    dayPeriod: 'short'
    };
  const optionsTime = {
      timeStyle: 'short'
  }
  const todaysDate = date.toLocaleDateString('en-EN', optionsDate);
  //document.querySelector(".date span").textContent = date.toLocaleDateString('en-EN', optionsDate);

    /* Getting The Default City from Geoapify */

  const location_URL = `https://api.geoapify.com/v1/ipinfo?apiKey=${locationAPI}`

  fetch(location_URL)
  .then(resp => resp.json())
  .then((userLocationData) => {
    getWeather(userLocationData.city.name)
  });

  /* Getting Weather Data from Openweather */

function getWeather(cityName) {

  const weather_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}&units=metric`;

  fetch(weather_URL)
    .then((resp)=> resp.json())
    .then((data) =>{
      if (data.cod === 200){
          document.querySelector(".image").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          document.querySelector(".cityName").textContent = `${convertToASCII(data.name)}`;
          document.querySelector(".description").textContent = data.weather[0].description;
          document.querySelector(".temp").textContent = `${Math.round(data.main.temp)} °C `;
          document.querySelector(".speed").textContent = `${data.wind.speed} m/s`;
          document.querySelector(".humidity").textContent = `${data.main["humidity"]} %`;
          document.querySelector(".feeling").textContent = `${Math.round(data.main.feels_like)} 'C`;
          document.querySelector(".sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString("tr-TR",optionsTime);
          document.querySelector(".sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString("tr-TR",optionsTime);
      } else {
          document.querySelector(".cityName").textContent = "City not Found";
          const clearing = document.querySelectorAll(".info");
          clearing.forEach((e) => {
            e.innerText= "--";
          });
      }
    })
  };

  /* Search Button */

  // const btn = document.getElementById('search');
  // btn.addEventListener('click', searchWeather)
  //   function searchWeather(){
  //     getWeather(document.getElementById("input").value);
  //     document.getElementById("input").value = "";
  //   };
  // useEffect(()=>{
  // const bar = document.querySelector("#input");
  // bar.addEventListener('keyup',
  //   (e) =>{if(e.code ==='Enter'){
  //     searchWeather()}});
  //   })

  return (
    <div className="weather-app">
        <div className="weather-info">
          <div className="date">
            <span>{todaysDate}</span>
            <span className="cityName"></span>
          </div>
          <div className="weather-main">
            <div className="info-box">
              <img  className="image info" src="" alt="" />
              <span className="description info"></span>
            </div>
            <span className="temp info"></span>
          </div>
          <div className="weather-secondary">
            <div className="weather-details">
              <div className="feeling-part info-box">
                <p>Feels</p>
                <p className="feeling info"></p>
              </div>
              <div className="wind info-box">
                <p>Wind</p>
                <p className="speed info"></p>
              </div>
              <div className="humidity-part info-box">
                <p>Humidity</p>
                <p className="humidity info"></p>
              </div>
            </div>
            <div className="time">
              <div className="time-box">
                <p>Sunrise:</p>
                <p className="sunrise info"></p>
              </div>
              <div className="time-box">
                <p>Sunset:</p>
                <p className="sunset info"></p>
              </div>
            </div>
          </div>
        </div>
      <div className="location">
        <input id="input" type="text" placeholder="Enter city" onChange={e => setZart(e.target.value)}/>
        <button id="search" onClick={handleChange}>Search</button>
      </div>
    </div>
  )
}

export default App;
