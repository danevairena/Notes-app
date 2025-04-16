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
    setNotes([...notes, note]);
  };

  //function to delete note
  const deleteNote = (indexToDelete) => {
    setNotes(notes.filter((_,index) => index !== indexToDelete));
  };

  //save notes to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  //onAddNote is function from NoteForm component
  //you are passing the addNote function as a property to NoteForm
  //when the user fills out the form and submits it, NoteForm will call 
  //onAddNote(note) — and the new note is added to the state
  return (
    <div>
      <h1>My notes app</h1>
      <NoteForm onAddNote={addNote} />
      <NoteList notes={notes} onDeleteNote={deleteNote}/>
    </div>
  );
}

export default App;
