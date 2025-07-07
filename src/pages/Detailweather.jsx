import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { useContext } from "react";
import { Link } from 'react-router-dom';

// Detailweather: pagina di dettaglio con previsioni orarie per la città selezionata
const Detailweather = () => {
    // Ottieni la funzione weatherEmoji dal GlobalContext per mostrare l'emoji meteo
    const { weatherEmoji } = useContext(GlobalContext);

    // Ottieni i parametri city e country dalla URL tramite React Router
    const { city, country } = useParams();

    // Stato per memorizzare i dati delle previsioni meteo
    const [weatherData, setWeatherData] = useState(null);

    // Effettua la chiamata API per ottenere le previsioni meteo della città selezionata
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=6d581dda77b851906d20546134340afa&units=metric&lang=it`)
            .then(res => {
                setWeatherData(res.data);
            })
            .catch(err => {
                setWeatherData(null);
            });
    }, [city]); // Aggiorna la chiamata ogni volta che cambia la città

    // Stato per il giorno selezionato nelle previsioni
    const [selectedDay, setSelectedDay] = useState('');

    // Quando arrivano i dati, imposta come giorno selezionato il primo disponibile
    useEffect(() => {
        if (days.length > 0) setSelectedDay(days[0]);
    }, [weatherData]);

    // Estrai i giorni unici dalle previsioni (es: ["2025-07-04", "2025-07-05", ...])
    const days = weatherData
        ? Array.from(new Set(weatherData.list.map(item => item.dt_txt.split(' ')[0])))
        : [];

    return (
        <>
            {/* Header pagina */}
            <div className="row mt-3">
                <div className="col-12 text-light">
                    <h2 className='text-center'>Dettagli meteo</h2>
                    <p className='text-center'>Qui potete trovare i dettagli meteo per la vostra città.</p>
                </div>
            </div>
            {/* Select per scegliere il giorno delle previsioni */}
            <div className="row">
                <div className="col-12">
                    {days.length > 0 && (
                        <div className="mb-3 d-flex justify-content-center text-light">
                            <label htmlFor="day-select" className="form-label me-2">Seleziona il giorno:</label>
                            <select
                                id="day-select"
                                className="form-select w-auto"
                                value={selectedDay}
                                onChange={e => setSelectedDay(e.target.value)}
                            >
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {/* Card con le previsioni dettagliate */}
                    <div className="card m-4">
                        <div className="card-body">
                            {/* Titolo con il nome della città */}
                            {weatherData && weatherData.city && (
                                <h2 className="card-title text-center">{city}</h2>
                            )}
                            {/* Giorno selezionato */}
                            <h5 className='text-center'>{selectedDay}</h5>
                            <hr />
                            {/* Lista delle previsioni orarie per il giorno selezionato */}
                            {weatherData && weatherData.list && weatherData.list
                                .filter(item => item.dt_txt.split(' ')[0] === selectedDay)
                                .map((item, idx) => (
                                    <div key={idx} className="row align-items-center mb-2">
                                        <div className="col-3 col-md-2 text-center">
                                            {/* Orario */}
                                            <span style={{ width: "60px", display: "inline-block" }}>{item.dt_txt.split(' ')[1].slice(0, 5)}</span>
                                        </div>
                                        <div className="col-3 col-md-2 text-center">
                                            {/* Temperatura */}
                                            <span style={{ width: "60px", display: "inline-block" }}>{item.main.temp}°C</span>
                                        </div>
                                        <div className="col-4 col-md-6 text-center">
                                            {/* Descrizione meteo e emoji */}
                                            <span style={{ width: "180px", display: "inline-block" }}>{item.weather[0].description.toUpperCase()}</span>
                                            <span style={{ fontSize: "2rem" }}>{weatherEmoji(item.weather[0].main)}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* Link per tornare alla homepage */}
                    <div className="text-center">
                        <Link to="/" className="btn btn-secondary mt-3">Torna alla Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detailweather


