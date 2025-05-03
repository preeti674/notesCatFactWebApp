import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notes/search/${query}`);
      onSearchResults(res.data);
    } catch (error) {
      alert('Search failed');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes or cat fact"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
