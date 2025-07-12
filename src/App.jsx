import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const greetings = [
  "Weather Now 🌦️",
  "Check Your City's Forecast 📍",
  "Live Weather Updates 🌍",
  "Type a City to Begin 🔍",
];

function App() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  // 🔠 Typewriter Effect
  useEffect(() => {
    const currentGreeting = greetings[greetingIndex];

    if (charIndex < currentGreeting.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentGreeting[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80); // Typing speed

      return () => clearTimeout(timeout);
    } else {
      // Wait before rotating to next greeting
      const holdTimeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }, 2000); // Hold time after full greeting

      return () => clearTimeout(holdTimeout);
    }
  }, [charIndex, greetingIndex]);

  // 🌦 Weather Fetch
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
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-center min-h-[2.5rem]">
        {displayedText}
        <span className="animate-pulse text-blue-800">|</span>
      </h1>

      <SearchBar onSearch={fetchWeather} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
