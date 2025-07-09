import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import CardDetail from '../components/CardDetail'
import Map from '../components/map'

const Detailweather = () => {
    // Ottieni i parametri city e country dalla URL tramite React Router
    const { city, country } = useParams();

    // Recupera la regione passata tramite state (se presente)
    const location = useLocation();
    const region = location.state?.region || null;

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
                <div className="col-12 d-flex position-relative">
                    <Link to="/" className="btn btn-dark text-white btn-homepage position-absolute start-10px" style={{ width: "200px", maxHeight: "40px" }}>{"< Torna alla Home"}</Link>
                </div>
                <h2 className='text-center'>Dettagli meteo</h2>
                <div className="col-12 my-3 ">

                    {/* Mostra la regione se disponibile */}
                    {weatherData && weatherData.city && (
                        <h2 className="card-title text-center">{city}</h2>
                    )}
                    {region && <h5 className='text-center'>Regione: {region}</h5>}
                </div>
            </div>

            <div className="row <div bg-map p-4 mx-3 rounded-3">

                {/* Select per scegliere il giorno delle previsioni */}
                {days.length > 0 && (
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <label htmlFor="day-select" className="form-label me-2 mb-0 text-light">Seleziona il giorno:</label>
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
                <div className="col-8">
                    {/* Card con le previsioni dettagliate */}
                    <div className="card m-4">
                        <div className="card-body">
                            {/* Titolo con il nome della città */}

                            {/* Giorno selezionato */}
                            <h5 className='text-center'>{selectedDay}</h5>
                            <hr />
                            {/* Lista delle previsioni orarie per il giorno selezionato */}
                            {weatherData &&
                                weatherData.list
                                    .filter(item => item.dt_txt.startsWith(selectedDay))
                                    .map((item) => (
                                        <CardDetail key={item.dt_txt} item={item} />
                                    ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <Map city={city} country={country} lat={weatherData?.city.coord.lat} lon={weatherData?.city.coord.lon} />
                </div>

            </div >
        </>
    )
}

export default Detailweather


