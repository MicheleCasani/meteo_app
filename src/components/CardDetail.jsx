import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

// CardDetail: componente per mostrare i dettagli meteo di una singola previsione oraria
const CardDetail = ({ item }) => {
    // Ottieni la funzione weatherEmoji dal GlobalContext
    const { weatherEmoji } = useContext(GlobalContext);

    return (
        <>
            <div className="card-text d-flex justify-content-around">
                {/* Orario della previsione */}
                <span className='meteo-info'>Orario: {item.dt_txt.split(' ')[1]}</span>
                {/* Emoji meteo e descrizione */}
                <span className='meteo-info'>
                    Meteo: {item.weather[0].description} {weatherEmoji(item.weather[0].main)}
                </span>
                {/* Altri dati meteo */}
                <span className='meteo-info'>Temperatura: {item.main.temp}°C</span>
                <span className='meteo-info'>Temperatura percepita: {item.main.feels_like}°C</span>
                <span className='meteo-info'>Umidità: {item.main.humidity}%</span>
                <span className='meteo-info'>Vento: {item.wind.speed} km/h</span>
                <span className='meteo-info'>Pressione: {item.main.pressure} hPa</span>
            </div>
            <hr />
        </>
    )
}

export default CardDetail
