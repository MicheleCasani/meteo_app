import React, { createContext } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
import { useEffect, useState } from 'react';

//importo le animazioni meteo



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

// Componente che mostra l'animazione Lottie in base al meteo
// Usa fetch per caricare il file JSON dalla cartella public/animations
function WeatherLottie({ main, style = { width: 80, height: 80 } }) {
    // Stato per l'animazione caricata
    const [animationData, setAnimationData] = useState(null);

    // Mapping tra condizione meteo e nome file
    const animationMap = {
        "Clear": "sun.json",
        "Clouds": "clouds.json",
        "Rain": "rain.json",
        "Snow": "snow.json",
        "Thunderstorm": "thunderstorm.json",
        "Drizzle": "drizzle.json",
        "Mist": "mist.json",
        "Fog": "mist.json",
        "Haze": "mist.json"
    };

    // Determina il file da caricare
    const fileName = animationMap[main] || "default.json";

    useEffect(() => {
        // Carica il file JSON dalla cartella public/animations
        fetch(`/animations/${fileName}`)
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(() => setAnimationData(null));
    }, [fileName]);

    // Mostra l'animazione se caricata, altrimenti un placeholder
    return animationData ? (
        <Lottie animationData={animationData} style={style} />
    ) : (
        <span style={{ fontSize: 40 }}>🌡️</span>
    );
}

// Provider che espone le funzioni globali tramite context
export const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{ weatherEmoji, fetchCityData, WeatherLottie }}>
            {children}
        </GlobalContext.Provider>
    );
};
