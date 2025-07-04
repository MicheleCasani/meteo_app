import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { useContext } from "react";
import { Link } from 'react-router-dom';

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

            <div className="row">
                <div className="col-12">
                    {/* Select per scegliere il giorno delle previsioni */}
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
                            {weatherData &&
                                weatherData.list
                                    .filter(item => item.dt_txt.startsWith(selectedDay))
                                    .map((item, idx) => (
                                        <React.Fragment key={item.dt_txt}>
                                            <div className="card-text d-flex justify-content-around">
                                                {/* Orario della previsione */}
                                                <span className='meteo-info'>Orario: {item.dt_txt.split(' ')[1]}</span>
                                                {/* Emoji meteo e descrizione */}
                                                <span className='meteo-info'>
                                                    Meteo: {weatherEmoji(item.weather[0].main)} {item.weather[0].description}
                                                </span>
                                                {/* Altri dati meteo */}
                                                <span className='meteo-info'>Temperatura: {item.main.temp}°C</span>
                                                <span className='meteo-info'>Umidità: {item.main.humidity}%</span>
                                                <span className='meteo-info'>Vento: {item.wind.speed} km/h</span>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))
                            }
                        </div>
                    </div>
                    <Link to="/" className="btn btn-primary d-block mx-auto mb-3 btn-homepage">Torna alla Home</Link>
                </div>
            </div>
        </>
    )
}

export default Detailweather


