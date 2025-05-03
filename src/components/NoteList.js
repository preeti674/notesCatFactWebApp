import React from 'react';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p><strong>Cat Fact: </strong>{note.catFact}</p>
          <button onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
