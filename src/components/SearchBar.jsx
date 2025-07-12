import { useState } from "react";
import SuggestionList from "./SuggestionList";

const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY;
const GEODB_HOST = "wft-geo-db.p.rapidapi.com";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${input}&limit=5`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": GEODB_API_KEY,
            "X-RapidAPI-Host": GEODB_HOST,
          },
        }
      );

      const data = await res.json();
      setSuggestions(data.data.map((city) => city.city));
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    setSuggestions([]);
    onSearch(city);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 rounded-xl shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          onClick={() => {
            onSearch(query);
            setSuggestions([]);
          }}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <SuggestionList suggestions={suggestions} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default SearchBar;
