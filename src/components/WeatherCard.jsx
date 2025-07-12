function WeatherCard({ weather }) {
  return (
    <div className="mt-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 w-full max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
          <p className="capitalize text-gray-600">
            {weather.weather[0].description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-20 h-20"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center text-gray-700">
        <div>
          <p className="text-2xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-sm">Temp</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{weather.main.humidity}%</p>
          <p className="text-sm">Humidity</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {Math.round(weather.wind.speed)} m/s
          </p>
          <p className="text-sm">Wind</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
