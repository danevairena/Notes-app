import './App.css';
//useState - allows to store and update data
import { useState } from 'react';
//useEffect - When and what should happen after render
import { useEffect } from "react";

//importing components
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

//function App() is the main component (main function)
function App() {
  //creting state for notes - useState() that reads from localStorage if data exists
  //if there is no data saved in localStorage it initializes empty array []
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  //this function is called when a new note is submitted from the form
  //it takes a note object (with title & content), then adds the new note to the 
  // existing notes array using the spread operator ...notes
  const addNote = (note) => {
    //add unique id
    const newNote = {...note, id:Date.now()};
    setNotes([...notes, newNote]);
  };

  //function to delete note
  const deleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  //new state variable called editingNote that stores the note currently being edited, or null if we're not editing anything
  //when a user clicks “Edit,” we’ll set this to that note
  const [editNote, setEditNote] = useState(null);

  //new state to store the search query
  const [searchQery, setSearchQuery] = useState("");

  //this function is called when the user submits the edited note
  //it loops through all existing notes and if a note’s title matches 
  //the one being edited, we replace it with the new version (updatedNote).
  const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === editNote.id ? updatedNote : note)
    );
    //reset the edit state to go back to default behavior (adding new notes)
    setEditNote(null);
  }

  //save notes to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  //filtering notes based on the title or content matching the search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQery.toLocaleLowerCase()) ||
    note.content.toLocaleLowerCase().includes(searchQery.toLocaleLowerCase())
  );


  //in NoteForm you are passing the necessary props
  //onAddNote(note) — crating new notes
  //onUpdateNote - for updating edited notes
  //noteToEdit - the note we’re editing (used to pre-fill the form inputs)
  return (
    <div>
      <h1>My notes app</h1>
      <NoteForm 
        onAddNote={addNote}
        onUpdateNote={updateNote}
        noteToEdit={editNote}
      />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => setSearchQuery("")} aria-label="Clear search">❌</button>
      <NoteList notes={filteredNotes} onEditNote={setEditNote} onDeleteNote={deleteNote}/>
    </div>
  );
}

export default App;
