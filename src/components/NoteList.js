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
                    <div className="card mb-3">
                        <div key={note.id} className="card-body">
                            <h3 className="card-title text-center">{note.title}</h3>
                            <p className="text-center">{note.content}</p>
                            <div className="d-flex justify-content-center align-items-center gap-3 mt-2 flex-wrap">
                                <p className="card-text mb-0"><strong>{note.category}</strong></p>
                                <button className="btn btn-sm btn-primary" onClick={() => onEditNote(note)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDeleteNote(note.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
export default NoteList;