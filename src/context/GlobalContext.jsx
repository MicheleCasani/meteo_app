import React, { createContext } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Crea il context globale per funzioni/metodi condivisi
export const GlobalContext = createContext();

// Funzione per ottenere l'icona del meteo in base al main
function weatherEmoji(main) {
    const iconMap = {
        "Clear": <img src="/animations/icons8-sun-50.png" alt="Sole" style={{ width: 30, height: 30 }} />,
        "Clouds": <img src="/animations/icons8-clouds-50.png" alt="Nuvoloso" style={{ width: 30, height: 30 }} />,
        "Rain": <img src="/animations/icons8-heavy-rain-50.png" alt="Pioggia" style={{ width: 30, height: 30 }} />,
        "Snow": <img src="/animations/icons8-snow-50.png" alt="Neve" style={{ width: 30, height: 30 }} />,
        "Thunderstorm": <img src="/animations/icons8-storm-with-heavy-rain-50.png" alt="Temporale" style={{ width: 30, height: 30 }} />,
        "Drizzle": <img src="/animations/icons8-stormy-weather-50.png" alt="Pioggerella" style={{ width: 30, height: 30 }} />,
        "Mist": <img src="/animations/icons8-fog-50.png" alt="Nebbia" style={{ width: 30, height: 30 }} />,
        "Fog": <img src="/animations/icons8-fog-50.png" alt="Nebbia" style={{ width: 30, height: 30 }} />,
        "Haze": <img src="/animations/icons8-fog-50.png" alt="Foschia" style={{ width: 30, height: 30 }} />
    };
    return iconMap[main] || <img src="/animations/icons8-sun-50.png" alt="Meteo" style={{ width: 30, height: 30 }} />;
}

// Funzione asincrona per fetch dati città tramite geocoding API, che restituisce nome, paese, stato, latitudine e longitudine
// Utilizza l'API OpenWeatherMap per ottenere i dati della città
async function fetchCityData(city) {
    try {
        // Chiamata all'endpoint OpenWeatherMap per geocoding
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        if (response.data.length > 0) {
            return response.data[0]; // contiene name, country, state, lat, lon
        } else {
            throw new Error("Città non trovata");
        }
    } catch (error) {
        throw error;
    }
}

// Provider che espone le funzioni globali tramite context
export const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{ weatherEmoji, fetchCityData, }}>
            {children}
        </GlobalContext.Provider>
    );
};
