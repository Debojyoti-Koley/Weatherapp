import { React, useState, useEffect } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudSun,
  faSmog,
  faWind,
  faCloudShowersHeavy,
  faCloudRain,
  faSnowflake,
  faBolt,
  faIcicles,
  faTemperatureLow,
} from "@fortawesome/free-solid-svg-icons";
const weatherConditions = [];

// Assigning weather conditions to their respective weather codes

weatherConditions[1000] = { label: "Clear Sky", icon: faSun };
weatherConditions[1001] = { label: "Cloudy", icon: faCloud };
weatherConditions[1100] = { label: "Mostly Clear", icon: faCloudSun };
weatherConditions[1101] = { label: "Partly Cloudy", icon: faCloudSun };
weatherConditions[1102] = { label: "Mostly Cloudy", icon: faCloud };
weatherConditions[2000] = { label: "Fog", icon: faSmog };
weatherConditions[2100] = { label: "Light Fog", icon: faSmog };
weatherConditions[3000] = { label: "Light Wind", icon: faWind };
weatherConditions[3001] = { label: "Wind", icon: faWind };
weatherConditions[3002] = { label: "Strong Wind", icon: faWind };
weatherConditions[4000] = { label: "Drizzle", icon: faCloudShowersHeavy };
weatherConditions[4001] = { label: "Rain", icon: faCloudRain };
weatherConditions[4200] = { label: "Light Rain", icon: faCloudRain };
weatherConditions[4201] = { label: "Heavy Rain", icon: faCloudShowersHeavy };
weatherConditions[5000] = { label: "Snow", icon: faSnowflake };
weatherConditions[5001] = { label: "Flurries", icon: faSnowflake };
weatherConditions[5100] = { label: "Light Snow", icon: faSnowflake };
weatherConditions[5101] = { label: "Heavy Snow", icon: faSnowflake };
weatherConditions[6000] = { label: "Freezing Drizzle", icon: faIcicles };
weatherConditions[6001] = { label: "Freezing Rain", icon: faTemperatureLow };
weatherConditions[6200] = {
  label: "Light Freezing Rain",
  icon: faTemperatureLow,
};
weatherConditions[6201] = {
  label: "Heavy Freezing Rain",
  icon: faTemperatureLow,
};
weatherConditions[7000] = { label: "Ice Pellets", icon: faIcicles };
weatherConditions[7101] = { label: "Heavy Ice Pellets", icon: faIcicles };
weatherConditions[7102] = { label: "Light Ice Pellets", icon: faIcicles };
weatherConditions[8000] = { label: "Thunderstorm", icon: faBolt };

const Main = () => {
  const [currentWeather, setCurrentweather] = useState("");
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState("");
  const [precipitationProbability, setprecipitationProbability] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weatherIcon, setweatherIcon] = useState(faSun);

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
      setCurrentweather(currentWeather.label);
      setTemperature(Math.ceil(currentData.temperature) + "°C");
      setweatherIcon(currentWeather.icon);
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
        <FontAwesomeIcon
          icon={weatherIcon}
          size="6x"
          style={{ color: "#fff" }}
        />
        <h1>{temperature}</h1>
        <h3>{currentWeather}</h3>
        <h4>Humidity: {humidity}%</h4>
        <h4>Precipitation: {precipitationProbability}%</h4>
      </div>
    </div>
  );
};
export default Main;
