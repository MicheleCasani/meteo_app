import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const DefaultLayout = () => {
    return (
        <>
            <main>
                <Navbar />
                <div className='container-fluid'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default DefaultLayout
