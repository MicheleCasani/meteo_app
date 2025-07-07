import React from 'react'
import CardHomepage from '../components/CardHomepage'
import SearchBar from '../components/SearchBar'

// HomePage: pagina principale con titolo, descrizione e lista delle capitali
const HomePage = () => {
    // Array di oggetti con città e country code
    const capital = [
        { city: "Roma", country: "it" },
        { city: "Parigi", country: "fr" },
        { city: "Londra", country: "gb" },
        { city: "Madrid", country: "es" },
        { city: "Berlino", country: "de" },
        { city: "Ottawa", country: "ca" },
        { city: "Tokyo", country: "jp" },
        { city: "Washington", country: "us" },
        { city: "Canberra", country: "au" },
        { city: "Brasilia", country: "br" },
        { city: "Pechino", country: "cn" },
        { city: "Mosca", country: "ru" }
    ]

    return (
        <>
            {/* Header con titolo e descrizione */}
            <div className="row mt-3 text-light">
                <div className="col-12">
                    <h2 className='text-center'>
                        Benvenuti al sito del meteo più bello che ci sia
                    </h2>
                    <p className='text-center'>
                        Qui potete trovare le previsioni meteo per la vostra città, con un design semplice e intuitivo.
                    </p>
                </div>
            </div>
            {/* Lista delle capitali con CardHomepage */}
            <div className="row mt-5 justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <p className='text-center text-light'>Ecco le principali città del mondo ed il loro meteo</p>
                {capital.map((item, index) => (
                    <CardHomepage key={index} city={item.city} country={item.country} />
                ))}
            </div>
        </>
    )
}

export default HomePage

