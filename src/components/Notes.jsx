
import {useSelector, useDispatch} from 'react-redux';
import {selectNotes, eraseNote, addNote} from '../store/notesSlice.js';

function Notes({bookId}) {
    
    const dispatch = useDispatch();
    
    function handleEraseNote(id) {
      if(confirm('Are you sure you want to erase this note?')) {
        dispatch(eraseNote(id));
      }
    }

    function handleAddNote(e) {
      e.preventDefault();

      const newNote = {
        book_id: bookId,
        title: document.querySelector('input[name=title]').value,
        text: document.querySelector('textarea[name=note]').value
      }
      if (newNote.title && newNote.text) {
          dispatch(addNote(newNote));
          document.querySelector('input[name=title]').value = "";
          document.querySelector('textarea[name=note]').value = "";
      } else {
          alert('Please fill the mandatory fields.');
      }

  }

    const notes = useSelector(selectNotes).filter(note => note.book_id == bookId);
    
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>

            {notes.length ?

              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick={()=>handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
              </div>

              :

              <p>This books doesn't have notes yet. Use the form below to add a note.</p>
            }
            

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick={(e)=>{handleAddNote(e)}}className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  