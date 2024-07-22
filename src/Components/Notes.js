import React, { useContext, useEffect, useRef, useState } from 'react';
import NotesContext from '../Context/NotesContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import {useNavigate} from 'react-router-dom';

export default function Notes(props) {

  // redirect
  const navigate=useNavigate();
  // Destructure props
const {showAlert}=props;

  // Use context to get notes and the function to fetch notes
  const context = useContext(NotesContext);
  const { notes, getNotes, editNotes } = context;

  // Fetch notes when the component mounts
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
    navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  // Refs to handle modal open
  const ref = useRef(null);
  // const refClose = useRef(null);

  

  // State to manage the current note being edited
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: ""
  });

  // Function to open the modal and set the note to be edited
  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  // Handle the click event for updating the note
  const handleClick = (e) => {
    e.preventDefault();
    editNotes(note.id,note.etitle,note.edescription, note.etag)
    // refClose.current.click();
  };

  // Handle input changes and update the note state
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Component to add new notes */}
      <AddNotes showAlert={showAlert} />
      
      {/* Hidden button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      
      {/* Modal for editing a note */}
      <div
      style={{color: 'black'}}
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label className="mb-3" htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter title"
                    value={note.etitle}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-3" htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter description"
                    value={note.edescription}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-check-label mx-2" htmlFor="etag">Tag: </label>
                  <input
                    type="text"
                    className="form-input"
                    value={note.etag}
                    onChange={onChange}
                    id="etag"
                    name='etag'
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                // ref={refClose}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={note.etitle.length<5 || note.edescription.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* List of notes */}
      <div className="row my-3">
        <div className="container mx-4">
        {notes.length===0 && 'No Notes to Display'}
        </div>
        {notes.map((item) => (
          <NoteItem key={item._id} note={item} updateNotes={updateNotes}  />
        ))}
      </div>
    </>
  );
}
