import { useState } from "react";

export default function GetWeatherData() {
  const [cityValue, setCityValue] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Your API key pulled from env once at module load
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Vite
  // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  // CRA

  const fetchWeather = async (city) => {
    try {
      setError(null);
      setWeather(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityValue.trim()) fetchWeather(cityValue.trim());
  };
  return (
    <div className="container">
      <h2>Get Weather</h2>
      <form onSubmit={handleSubmit}>

        <input type="text"
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
          placeholder="Enter city"
        />

        <input type="submit" value="Get Weather" />

      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      
      {weather && (
        <div>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </div>

          <h2>{weather.name}</h2>
          <div className="temperature">{Math.round(weather.main.temp)} °C</div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="details">
            <div>
              Feels like:
              <br />
              {Math.round(weather.main.feels_like)}
            </div>
            <div>
              Temp-Min:
              <br />
              {Math.round(weather.main.temp_min)} °C
            </div>
            <div>
              Temp-Max:
              <br />
              {Math.round(weather.main.temp_max)} °C
            </div>
            <div>
              Humidity:
              <br />
              {weather.main.humidity}%
            </div>
            <div>
              Wind speed:
              <br />
              {weather.wind.speed} m/s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
