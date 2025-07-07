import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { useContext } from "react";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;


const CardHomepage = ({ city, country }) => {

    const { weatherEmoji } = useContext(GlobalContext);

    // stato per memorizzare i dati del meteo
    // inizializzo a null per evitare errori di rendering prima del caricamento
    const [weather, setWeather] = useState(null);

    // eseguo la chiamata all'endpoint delle rpevisioni del meteo
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=it`)
            .then(res => {
                setWeather(res.data);
            })
            .catch(err => {
                setWeather(null);
            });
    }, [city, country]);

    // funzione per restituire l'emoji che viene utilizzata in base al valore di main

    return (
        <>
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-2">
                <div className="card card-hover" style={{ width: "32rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{city}</h5>
                        <p className="card-text">
                            {weather ? `Temperatura: ${weather.main.temp}°C` : "Caricamento..."}
                        </p>
                        <p>
                            {weather ? weather.weather[0].description.toUpperCase() : "Caricamento..."}
                            {/* utilizzo le emoji  */}
                            {weather && (
                                <span style={{ fontSize: "2rem" }}>
                                    {weatherEmoji(weather.weather[0].main)}
                                </span>
                            )}
                        </p>
                        <Link to={`/dettaglio/${city}/${country}`}
                            className="btn btn-primary"
                        >Dettagli aggiuntivi sul meteo</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardHomepage
