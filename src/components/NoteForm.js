//importing the useState from React allows a component to store and update data dynamically
import { useState } from "react";
//useEffect - When and what should happen after render
import { useEffect } from "react";

//defines a React component called NoteForm
//it receives a prop called onAddNote — a function that will be called when a new note is added
//this function is passed down from the App.js component
//noteToEdit – an object with the note’s current title/content
//onUpdateNote – function to call if editing
function NoteForm({ onAddNote, noteToEdit, onUpdateNote }) {
    //state variable for the title - title holds the current value, and setTitle is used to change it
    const [title, setTitle] = useState("");
    //state variable for the content - content holds the current value, and setContent is used to change it
    const [content, setContent] = useState("");
    // state to store the note's category
    const [category, setCategory] = useState("Others");
  
    //prefill form if editing
    useEffect(() => {
        if(noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setCategory(noteToEdit.category);
        }
    },[noteToEdit]);

    //This function runs when the form is submitted
    //checks if both title and content are entered, then calls onAddNote({title, content}) to send the data up yo App.js
    const handleSubmit = (e) => {
        //e.preventDefault() stops the page from reloading
        e.preventDefault();
        //check if one or both of the fields are empty
        if (!title || !content) return;
        const note = noteToEdit
        ? {...noteToEdit, title, content, category}
        : {title, content, category};
        if(noteToEdit) {
            onUpdateNote(note);
        }
        else {
            onAddNote(note);
        }
  
        //clear text input fields
        setTitle("");
        setContent("");
        setCategory("Others");
    };
  
    return (
        //the function returns the form in jsx code
        <div className="note-form">
            <form onSubmit={handleSubmit}>
                <input
                    //Shows whatever is in the title state
                    type="text"
                    placeholder="Note title"
                    value={title}
                    //onChange updates the state as the user types
                    onChange={(e) => setTitle(e.target.value)}
                /><br/>
                <textarea
                    //Shows whatever is in the content state
                    placeholder="Note content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /><br/>
                <label> Select category:
                    <select 
                        name="category"
                        //force the select's value to match the state variable
                        value={category}
                        //update the state variable on any change
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="Others">Others</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Home">Home</option>
                    </select>
                </label><br/>
                <button type="submit" className="btn btn-success">
                    {noteToEdit ? "Update Note" : "Add Note"}
                </button>
            </form>
        </div>
    );
}
  
//export default -  when a file has one main thing to export (like a component)
export default NoteForm;