import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

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
    <div>
      <h2>Your Notes</h2>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="New note" />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text} <button onClick={() => deleteNote(note.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
