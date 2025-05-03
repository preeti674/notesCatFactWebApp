import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/notes', {
        title,
        content
      });
      onNoteAdded(res.data); 
      setTitle('');
      setContent('');
    } catch (error) {
      alert('Error creating note');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <textarea
        placeholder="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      ></textarea><br />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
