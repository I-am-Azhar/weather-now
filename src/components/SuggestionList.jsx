function SuggestionList({ suggestions, onSelect }) {
  return (
    <ul className="absolute z-10 w-full mt-2 max-h-60 overflow-auto bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-xl">
      {suggestions.map((city, index) => (
        <li
          key={index}
          onClick={() => onSelect(city)}
          className="px-4 py-2 text-black hover:text-blue-600 hover:bg-white/30 transition cursor-pointer"
        >
          {city}
        </li>
      ))}
    </ul>
  );
}

export default SuggestionList;
