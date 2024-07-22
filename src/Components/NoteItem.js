import React, { useContext } from 'react';
import NotesContext from '../Context/NotesContext';

export default function NoteItem(props) {
    // Use context to get deleteNotes and editNotes functions
    const context = useContext(NotesContext);
    const { deleteNotes } = context;

    // Destructure props to get note and updateNotes
    const { note, updateNotes } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i
                            className="fa-solid fa-trash-can mx-3"
                            onClick={() => { deleteNotes(note._id); }}></i>
                        <i
                            className="fa-solid fa-pen-to-square mx-2"
                            onClick={() => { updateNotes(note); }}
                        ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
}
