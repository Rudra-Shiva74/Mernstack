import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData, isLoggedIn, logOut } from './Auth'
export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        logOut();
        navigate('/singup');
    }
    useEffect(() => {
        isLoggedIn();
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {isLoggedIn() ?
                                <li className="nav-item">
                                    <Link to='/profile' className='nav-link'>Profile</Link>
                                </li> : ''}
                            {isLoggedIn() ?
                                <li className="nav-item">
                                    <Link to='/product' className="nav-link active">Product</Link>
                                </li> : ''}
                            {isLoggedIn() ?
                                <li className="nav-item">
                                    <Link to='/add-product' className="nav-link">Add Products</Link>
                                </li> : ''}

                            {isLoggedIn() ?
                                <li className="nav-item">
                                    <Link onClick={logout} to={'/signup'} className='nav-link'>Logout({UserData().res.name})</Link>
                                </li> : ''}
                            {isLoggedIn() ? '' : <>
                                <li className="nav-item">
                                    <Link to='/signup' className='nav-link'>SignUp</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className='nav-link'>Login</Link>
                                </li></>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
