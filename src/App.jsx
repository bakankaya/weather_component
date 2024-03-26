import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [zart,setZart] = useState("ankara")
  const handleChange = () => {
    Wea(zart)
    document.querySelector("input").value = "";
  }

  const optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const optionsTime = {
    timeStyle: 'short'
}
  const date = new Date();
  const todaysDate = date.toLocaleDateString('en-EN', optionsDate);


  function Wea(prop){

  const city = prop;
  const APIKEY = "a127619b02228ad2ee53bda273b6dabb";
  const BASE_URL = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

  fetch(BASE_URL)
  .then((resp)=> resp.json())
  .then((data) =>{
    if (data.cod === 200){
        document.querySelector(".image").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.querySelector(".cityName").textContent = data.name;
        document.querySelector(".description").textContent = data.weather[0].description;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C `;
        document.querySelector(".speed").textContent = `${data.wind.speed} m/s`;
        document.querySelector(".humidity").textContent = `${data.main["humidity"]} %`;
        document.querySelector(".feeling").textContent = `${Math.round(data.main.feels_like)} °C`;
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
}

  useEffect(()=>{
    Wea("ankara");
  })

  return (
    <div className="weather-thingy">
      <div className="date">
      <span>{todaysDate}</span>
      </div>
      <div className="weather-main">
          <img  className="image info" src="" alt="" />
          <span className="cityName"></span>
          <span className="description info"></span>
          <span className="temp info"></span>
      </div>
      <div className="weather-details">
        <div className="feeling-part">
          <p>Feels</p>
          <p className="feeling info"></p>
        </div>
        <div className="wind">
          <p>Wind</p>
          <p className="speed info"></p>
        </div>
        <div className="humidity-part">
          <p>Humidity</p>
          <p className="humidity info"></p>
        </div>
      </div>
        <div className="time">
          <p>sunrise:</p>
          <p className="sunrise info"></p>
          <p>sunset:</p>
          <p className="sunset info"></p>
        </div>
      <div className="location">
        <input type="text" placeholder="Enter city" onChange={e => setZart(e.target.value)}/>
        <button onClick={handleChange}>Search</button>
      </div>
    </div>
  )
}

export default App
