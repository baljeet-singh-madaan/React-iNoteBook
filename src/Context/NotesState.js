import NotesContext from './NotesContext';
import { useState } from 'react';

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = []

  // Desctructure props
  const {showAlert}=props;

  // Get ALl Notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
  }

  // Add Notes 
  const addNotes = async (title, description, tag) => {

    // API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  // Delete a Notes
  const deleteNotes = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();

    console.log(json)
    

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    showAlert('success','Notes Deleted Successfully')
  }
  // Edit a Note
  const editNotes = async (id, title, description, tag) => {
    try {
      // API CALL
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json)
      ;

      let newNotes = JSON.parse(JSON.stringify(notes));

      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }

      setNotes(newNotes);
      showAlert('success','Notes Updated Successfully')
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
const [notes, setNotes] = useState(notesinitial)
return (
  <NotesContext.Provider value={{ notes, setNotes, deleteNotes, editNotes, addNotes, getNotes }}>
    {props.children}
  </NotesContext.Provider>
)
}

export default NotesState;