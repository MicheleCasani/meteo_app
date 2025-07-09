import React, { createContext } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Crea il context globale per funzioni/metodi condivisi
export const GlobalContext = createContext();

// Funzione per ottenere l'emoji del meteo in base al main
function weatherEmoji(main) {
    if (main === "Clear") return "☀️";
    if (main === "Clouds") return "☁️";
    if (main === "Rain") return "🌧️";
    if (main === "Snow") return "❄️";
    if (main === "Thunderstorm") return "⛈️";
    if (main === "Drizzle") return "🌦️";
    if (["Mist", "Fog", "Haze"].includes(main)) return "🌫️";
    return "🌡️";
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
