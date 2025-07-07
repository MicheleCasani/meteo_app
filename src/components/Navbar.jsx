import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import Classes from 'dom/lib/classes'

const Navbar = () => {
    return (
        <>
            <div className="row">
                <nav className="navbar bg-primary">
                    <div className="container-fluid ">
                        <div className="col-10">
                            <Link
                                className="navbar-brand text-light mx-3 d-flex align-items-center"
                                to={"/"}>
                                <h1>Meteo </h1>
                                <img src="/logo per sito meteo.png" alt="Logo Meteo" className='logo-navbar' />
                            </Link>
                        </div>
                        <div className="col-2 d-flex align-items-center px-3">
                            <SearchBar />
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
