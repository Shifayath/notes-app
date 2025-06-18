import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));
    setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addNote = async () => {
    if (newNote) {
      await addDoc(collection(db, "notes"), { text: newNote });
      setNewNote("");
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="card">
      <h2>Your Notes</h2>
      <div className="input-group">
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="New note" />
        <button className="btn add" onClick={addNote}>Add</button>
      </div>
      <ul className="note-list">
        {notes.map(note => (
          <li key={note.id} className="note-item">
            <span>{note.text}</span>
            <button className="btn delete" onClick={() => deleteNote(note.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
