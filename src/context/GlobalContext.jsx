import React, { createContext } from 'react';

// Crea il context
export const GlobalContext = createContext();

// Funzione per ottenere l'emoji del meteo
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

// Provider che espone la funzione
export const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{ weatherEmoji }}>
            {children}
        </GlobalContext.Provider>
    );
};
