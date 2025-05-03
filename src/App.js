import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleSearchResults = (results) => {
    setNotes(results);
  };

  return (
    <div className="App">
      <h1>Note App with Cat Facts 🐱</h1>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <SearchBar onSearchResults={handleSearchResults} />
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}

export default App;
