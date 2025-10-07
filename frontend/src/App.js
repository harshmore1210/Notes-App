import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const API = 'http://localhost:4000';

  useEffect(() => {
    fetch(API + '/notes')
      .then(r => r.json())
      .then(setNotes);
  }, []);

  async function addNote(e) {
    e.preventDefault();
    const res = await fetch(API + '/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    });
    const newNote = await res.json();
    setNotes([newNote, ...notes]);
    setTitle('');
    setBody('');
  }

  async function del(id) {
    await fetch(API + '/notes/' + id, { method: 'DELETE' });
    setNotes(notes.filter(n => n._id !== id));
  }

  return (
    <div className="container">
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Body"
        />
        <button>Add Note</button>
      </form>
      <ul>
        {notes.map(n => (
          <li key={n._id}>
            <h4>{n.title}</h4>
            <p>{n.body}</p>
            <button onClick={() => del(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
