//defines a React component called NoteList
//accept the list of notes and function for deleting note as a prop
//his function is passed down from the App.js component
function NoteList({ notes, onEditNote, onDeleteNote }) {
    return (
        //check if there are no notes and show response message
        //notes.map(...) — loops through the array and displays each note’s title and content
        <div>
            <h2>Notes:</h2>
            {notes.length === 0 ? (
                <p>No notes yet. Add one above!</p>
            ):(
                notes.map((note) => (
                    <div key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <p><strong>Category:</strong>{note.category}</p>
                        <button onClick={() => onEditNote(note)}>Edit</button>{" "}
                        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </div>
                )
            ))}
        </div>
    );
}
export default NoteList;