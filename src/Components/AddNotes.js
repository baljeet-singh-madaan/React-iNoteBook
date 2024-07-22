import React,{useContext, useState} from 'react'
import NotesContext from '../Context/NotesContext';

function AddNotes(props) {
    // destructure props
    const {showAlert}=props;

    // useContext
    const context=useContext(NotesContext);
    const {addNotes}=context

    // handle click submit
    const handleClick=(e)=>{
        e.preventDefault();
        addNotes(note.title,note.description,note.tag)
        setNote({title: "", description: "", tag: ""})
        showAlert('success','Notes Added Successfully')
    }
    
    const [note,setNote]=useState({title: "", description: "", tag: ""})

    // Onchange Handle input
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label className="mb-3" htmlFor="title">Title</label>
                        <input type="text" className="form-control mb-2" id="title" name="title"  placeholder="Enter title" onChange={onChange}value={note.title} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label className="mb-3" htmlFor="description">Description</label>
                        <input type="text" className="form-control mb-2" id="description" name='description' placeholder="Enter description" onChange={onChange} value={note.description} minLength={5} required/>
                    </div>
                    {/* <div className="mb-3">
                        <label className="mb-3" htmlFor="tag">Tag</label>
                        <input type="text" className="form-control mb-2" id="tag" name='tag' placeholder="Enter tag" onChange={onChange} />
                    </div> */}
                    <div className="mb-3 ">
                    <label className="form-check-label mx-2 " htmlFor="tag">Tag: </label>
                        <input type="text" className="form-input" id="tag" name='tag' onChange={onChange} value={note.tag} minLength={3} />

                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                <h2>Your Notes</h2>
            </div>
        </div>
    )
}

export default AddNotes;
