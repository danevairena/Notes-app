//importing the useState from React allows a component to store and update data dynamically
import { useState } from "react";

//defines a React component called NoteList
//accept the list of notes and function for deleting note as a prop
//his function is passed down from the App.js component
function NoteList({ notes, onDeleteNote }) {
    return (
        //check if there are no notes and show response message
        //notes.map(...) — loops through the array and displays each note’s title and content
        <div>
            <h2>Notes:</h2>
            {notes.length === 0 ? (
                <p>No notes yet. Add one above!</p>
            ):(
                notes.map((note, index) => (
                    <div key={index}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => onDeleteNote(index)}>Delete</button>
                    </div>
                )
            ))}
        </div>
    );
}
export default NoteList;