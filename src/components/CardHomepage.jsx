import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;


// CardHomepage: mostra il meteo attuale di una città in una card della homepage
const CardHomepage = ({ city, country }) => {
    // Ottengo la funzione per le emoji meteo dal context globale
    const { weatherEmoji } = useContext(GlobalContext);

    // Stato per memorizzare i dati del meteo attuale
    // Inizializzo a null per evitare errori di rendering prima del caricamento
    const [weather, setWeather] = useState(null);

    // Effetto che esegue la chiamata all'API meteo ogni volta che city o country cambiano
    useEffect(() => {
        // Chiamata all'endpoint OpenWeatherMap per il meteo attuale
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=it`)
            .then(res => {
                setWeather(res.data); // Salva i dati meteo nello stato
            })
            .catch(err => {
                setWeather(null); // In caso di errore, resetta lo stato
            });
    }, [city, country]); // Dipendenze: effetto si attiva se city o country cambiano

    // Render della card meteo
    return (
        <>
            {/* Colonna responsive Bootstrap */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-2 p-0">
                {/* Card Bootstrap con effetto hover */}
                <div className="card card-hover" style={{ width: "32rem" }}>
                    <div className="card-body">
                        {/* Titolo con il nome della città */}
                        <h5 className="card-title">{city}</h5>
                        {/* Temperatura attuale, oppure messaggio di caricamento */}
                        <p className="card-text">
                            {weather ? `Temperatura: ${weather.main.temp}°C` : "Caricamento..."}
                        </p>
                        {/* Descrizione meteo e emoji */}
                        <p>
                            {weather ? weather.weather[0].description.toUpperCase() : "Caricamento..."}&nbsp;
                            {/* Emoji meteo in base al valore di main */}
                            {weather && (
                                <span style={{ fontSize: "2rem" }}>
                                    {weatherEmoji(weather.weather[0].main)}
                                </span>
                            )}
                        </p>
                        {/* Link alla pagina di dettaglio della città */}
                        <Link to={`/dettaglio/${city}/${country}`}
                            className="btn btn-dark text-light"
                        >Dettagli aggiuntivi sul meteo</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardHomepage
