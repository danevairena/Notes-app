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
    const newNote = {...note, id: Date.now(), createdAt: Date.now()};
    setNotes([...notes, newNote]);
    //hide form after adding
    setShowForm(false);
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

  //filtering Notes by category
  const [categoryFilter, setCategoryFilter] = useState("All");

  //sorting state - keeps track of how the user wants the notes sorted
  const [sortOption, setSortOption] = useState("dateDesc");

  //new state to toggle form visibility
  const [showForm, setShowForm] = useState(false);


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
    setShowForm(false); //hide form after updating a note
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

  //filtering notes based on their category
  const filteredByCategory = 
  categoryFilter === "All"
  ? filteredNotes
  : filteredNotes.filter(note => note.category === categoryFilter);

  //sorting notes
  const sortedNotes = [...filteredByCategory].sort((a,b) => {
    if(sortOption === "titleAsc") {
      //localeCompare is a string method in JavaScript that compares two strings 
      //according to the language rules of the current locale (i.e., language and region settings).
      return a.title.localeCompare(b.title);
    } else if(sortOption === "titleDesc") {
      return b.title.localeCompare(a.title);
    } else if(sortOption === "dateAsc") {
      //a.id - b.id is commonly used in sorting numbers,
      //especially when you want to sort objects based on a numeric property like id
      return a.createdAt - b.createdAt;
    } else if(sortOption === "dateDesc") {
      return b.createdAt - a.createdAt;
    }
    return 0;
  })
  

  //in NoteForm you are passing the necessary props
  //onAddNote(note) — crating new notes
  //onUpdateNote - for updating edited notes
  //noteToEdit - the note we’re editing (used to pre-fill the form inputs)
  //show the form only when showForm is true
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">My notes app</h1>

      {/* Add new note button */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : editNote ? "Edit note" : "Add new note"}
        </button>
      </div>
      {/* Add NoteForm conditionally */}
      {showForm && (
        <NoteForm 
          onAddNote={addNote}
          onUpdateNote={updateNote}
          noteToEdit={editNote}
        />
      )}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          onClick={() => setSearchQuery("")} 
          className="btn btn-outline-danger"
          type="button"
          aria-label="Clear search"
        >
          ❌
        </button>
        <select 
          name="categoryFilter"
          //force the select's value to match the state variable
          value={categoryFilter}
          //update the state variable on any change
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Others">Others</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
        </select>
        <select
          name="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="dateDesc">Newest first</option>
          <option value="dateAsc">Oldest first</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
        </select>
      </div>
      <NoteList 
        notes={sortedNotes} 
        onEditNote={(note) => {
          setEditNote(note);
          setShowForm(true); //this shows the form when editing
        }} 
        onDeleteNote={deleteNote}/><br/>
    </div>
  );
}

export default App;
