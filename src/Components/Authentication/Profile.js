import React, { useContext } from 'react'
import NotesContext from '../../Context/NotesContext';
import UserContext from '../../Context/UserContext';
import CredentialContext from '../../Context/CredentialContext';
const Profile = () => {
  const RAM = useContext(NotesContext)
  const { notes } = RAM;

  //credential context
  const context = useContext(UserContext)
  const { credential} = context;

  // Login Credential
  const docs = useContext(CredentialContext)
  const { credentials} = docs;

  return (
    <section className="vh-100" style={{backgroundColor: '#ADD8E6'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem"
                  }}
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: 80 , borderRadius: '80%'}}
                  />
                  <h5 style={{ color: "black" }}>{credential.name || credentials.name}</h5>
                  <i className="far fa-edit mb-5" />
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{credentials.email || credential.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Total Notes</h6>
                        <p className="text-muted">{notes.length}</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Notes</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">x
                        <i className="fab fa-facebook-f fa-lg me-3" />
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3" />
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Profile
