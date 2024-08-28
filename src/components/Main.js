import { React, useState, useEffect } from "react";
import "./main.css";
const weatherConditions = [];

// Assigning weather conditions to their respective weather codes
weatherConditions[1000] = "Clear Sky";
weatherConditions[1001] = "Cloudy";
weatherConditions[1100] = "Mostly Clear";
weatherConditions[1101] = "Partly Cloudy";
weatherConditions[1102] = "Mostly Cloudy";
weatherConditions[2000] = "Fog";
weatherConditions[2100] = "Light Fog";
weatherConditions[3000] = "Light Wind";
weatherConditions[3001] = "Wind";
weatherConditions[3002] = "Strong Wind";
weatherConditions[4000] = "Drizzle";
weatherConditions[4001] = "Rain";
weatherConditions[4200] = "Light Rain";
weatherConditions[4201] = "Heavy Rain";
weatherConditions[5000] = "Snow";
weatherConditions[5001] = "Flurries";
weatherConditions[5100] = "Light Snow";
weatherConditions[5101] = "Heavy Snow";
weatherConditions[6000] = "Freezing Drizzle";
weatherConditions[6001] = "Freezing Rain";
weatherConditions[6200] = "Light Freezing Rain";
weatherConditions[6201] = "Heavy Freezing Rain";
weatherConditions[7000] = "Ice Pellets";
weatherConditions[7101] = "Heavy Ice Pellets";
weatherConditions[7102] = "Light Ice Pellets";
weatherConditions[8000] = "Thunderstorm";

const Main = () => {
  const [currentWeather, setCurrentweather] = useState("");
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState("");
  const [precipitationProbability, setprecipitationProbability] = useState("");
  const [temperature, setTemperature] = useState("");
  const fetchCurrentweather = async (city) => {
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      let url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apikey}`;
      const response = await fetch(url);
      const resJson = await response.json();
      const currentData = resJson.data.values;
      let weatherCode = resJson.data.values.weatherCode;
      let currentWeather = weatherConditions[weatherCode];
      setHumidity(currentData.humidity);
      setprecipitationProbability(currentData.precipitationProbability);
      setCurrentweather(currentWeather);
      setTemperature(Math.ceil(currentData.temperature) + "°C");
    } catch (error) {
      console.log("Error..");
    }
  };
  useEffect(() => {
    fetchCurrentweather(city);
  }, []);
  const handleSearchClick = () => {
    fetchCurrentweather(city); // Fetch weather based on user input
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="City"
          className="search-bar"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <div className="current-weather">
        <h1>{temperature}</h1>
        <h3>{currentWeather}</h3>
        <h4>Humidity: {humidity}%</h4>
        <h4>Precipitation: {precipitationProbability}%</h4>
      </div>
    </div>
  );
};
export default Main;
