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
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const holdTimeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }, 2000);
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

// ☁️ Cloud Background with Parallax
const BackgroundClouds = () => (
  <>
    <img
      src="/cloud2.svg"
      alt="cloud"
      className="absolute top-10 left-5 w-20 sm:w-32 md:w-40 lg:w-52 opacity-20 z-0 animate-cloud-slow"
    />
    <img
      src="/cloud1.svg"
      alt="cloud"
      className="absolute top-32 right-20 w-16 sm:w-24 md:w-32 lg:w-40 opacity-25 z-0 animate-cloud-fast"
    />
    <img
      src="/cloud1.svg"
      alt="cloud"
      className="absolute bottom-10 left-20 w-24 sm:w-36 md:w-44 lg:w-56 opacity-30 z-0 animate-cloud-medium"
    />
    <img
      src="/cloud2.svg"
      alt="cloud"
      className="absolute bottom-32 right-10 w-20 sm:w-28 md:w-36 lg:w-48 opacity-20 z-0 animate-cloud-slow"
    />
  </>
);


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4 py-10">
      {/* ☁️ Animated Cloud Background */}
      <BackgroundClouds />

      {/* 🔠 Heading with Typing Effect */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-center min-h-[2.5rem] z-10">
        {displayedText}
        <span className="animate-pulse text-blue-800">|</span>
      </h1>

      {/* 🔍 Search Input and Weather Data */}
      <div className="z-10 w-full max-w-md">
        <SearchBar onSearch={fetchWeather} />
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
