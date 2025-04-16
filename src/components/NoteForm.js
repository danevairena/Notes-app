//importing the useState from React allows a component to store and update data dynamically
import { useState } from "react";

//defines a React component called NoteForm
//it receives a prop called onAddNote — a function that will be called when a new note is added
//this function is passed down from the App.js component
function NoteForm({ onAddNote }) {
    //state variable for the title - title holds the current value, and setTitle is used to change it
    const [title, setTitle] = useState("");
    //state variable for the content - content holds the current value, and setContent is used to change it
    const [content, setContent] = useState("");
  
    //This function runs when the form is submitted
    //checks if both title and content are entered, then calls onAddNote({title, content}) to send the data up yo App.js
    const handleSubmit = (e) => {
        //e.preventDefault() stops the page from reloading
      e.preventDefault();
      if (!title || !content) return;
  
      onAddNote({ title, content });
      //clear text input fields
      setTitle("");
      setContent("");
    };
  
    return (
        //the function returns the form in jsx code
        <form onSubmit={handleSubmit}>
            <input
                //Shows whatever is in the title state
                type="text"
                placeholder="Note title"
                value={title}
                //onChange updates the state as the user types
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                //Shows whatever is in the content state
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add Note</button>
        </form>
    );
}
  
//export default -  when a file has one main thing to export (like a component)
export default NoteForm;