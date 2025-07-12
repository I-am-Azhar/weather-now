function SuggestionList({ suggestions, onSelect }) {
  return (
    <ul className="absolute z-10 w-full bg-white shadow-md rounded-xl mt-2 max-h-60 overflow-auto">
      {suggestions.map((city, index) => (
        <li
          key={index}
          onClick={() => onSelect(city)}
          className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition"
        >
          {city}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionList;
