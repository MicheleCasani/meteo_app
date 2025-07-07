import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

// DefaultLayout: layout principale con Navbar e contenuto dinamico
const DefaultLayout = () => {
    return (
        <>
            <main>
                {/* Navbar sempre visibile */}
                <Navbar />
                {/* Container per le pagine figlie (Outlet) */}
                <div className='container-fluid'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default DefaultLayout
