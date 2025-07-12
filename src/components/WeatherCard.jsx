function WeatherCard({ weather }) {
  const { name } = weather;
  const { description, icon } = weather.weather[0];
  const { temp, humidity } = weather.main;
  const { speed } = weather.wind;

  const formattedDesc = description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <div className="mt-10 w-full max-w-md p-6 bg-white rounded-3xl shadow-xl text-gray-800 space-y-6">
      {/* Top Section: Location + Description + Icon */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold leading-snug">{name}</h2>
          <p className="text-md text-gray-600 italic mt-1">{formattedDesc}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="Weather icon"
          className="w-24 h-24"
        />
      </div>

      {/* Middle Section: Big Temperature */}
      <div className="text-center">
        <p className="text-6xl font-extrabold text-blue-500">{Math.round(temp)}°C</p>
        <p className="text-sm text-gray-500 mt-1">Feels like outside right now</p>
      </div>

      {/* Bottom Stats: Humidity + Wind */}
      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="bg-blue-50 rounded-xl py-4 shadow-sm">
          <p className="text-xl font-semibold text-blue-700">{humidity}%</p>
          <p className="text-gray-600 mt-1">Humidity</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-4 shadow-sm">
          <p className="text-xl font-semibold text-blue-700">{Math.round(speed)} m/s</p>
          <p className="text-gray-600 mt-1">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
