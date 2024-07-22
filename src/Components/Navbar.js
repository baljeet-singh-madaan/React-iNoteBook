import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const onClick = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();

    useEffect(() => {
    }, [location])
    document.body.style.backgroundColor = '#040720';
    document.body.style.color = '#FDEEF4';

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">INoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""} `} aria-disabled="true" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to='/signup' role="button">Sign up</Link>
                        </form> :
                            <form className="d-flex">
                                <Link className="btn btn-info mx-1" to='/profile' role="button">Profile</Link>
                                <button className="btn btn-danger mx-2" onClick={onClick} >Log Out</button>
                            </form>}

                    </div>
                </div>
            </nav>
        </>
    )
}
