import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

// Navbar: barra di navigazione principale con logo e searchbar
const Navbar = () => {
    return (
        <>
            <div className="row ">
                <nav className="navbar bg-black p-0">
                    <div className="col-12 d-flex align-items-center bg-navbar">
                        {/* Logo e titolo */}

                        <Link
                            className="navbar-brand text-light mx-5 d-flex align-items-center"
                            to={"/"}>
                            <h1>Meteo </h1>
                            {/* Logo del sito */}
                            <img src="/logo-per-sito-meteo.png" alt="Logo Meteo" className='logo-navbar' />
                        </Link>

                        {/* SearchBar centrata verticalmente */}
                        <div className="d-flex align-items-center position-relative ms-auto mx-5">
                            <SearchBar />
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
