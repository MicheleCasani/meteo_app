import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="container-fluid ">
                    <Link
                        className="navbar-brand text-light mx-3 d-flex align-items-center"
                        to={"/"}>
                        <h1>Meteo </h1>
                        <img src="/logo per sito meteo.png" alt="Logo Meteo" className='logo-navbar' />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
