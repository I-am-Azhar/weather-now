import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    if (!city) return;
    setQuery(city);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        Weather Now 🌦️
      </h1>
      <SearchBar onSearch={fetchWeather} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
