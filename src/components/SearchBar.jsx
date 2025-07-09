import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '../context/GlobalContext';

// SearchBar: barra di ricerca per trovare una città e navigare alla pagina di dettaglio
const SearchBar = () => {
    // Ottengo la funzione fetchCityData dal context globale
    const { fetchCityData } = useContext(GlobalContext);
    // Stato per l'input della città
    const [city, setCity] = useState("");
    // Stato per eventuali errori di ricerca
    const [error, setError] = useState("");
    // Hook per la navigazione tra pagine
    const navigate = useNavigate();

    // Funzione per gestire la ricerca della città, e restituisce alla pagina di dettaglio
    // Utilizza la funzione fetchCityData dal context per ottenere i dati della città
    const handleSearch = async () => {
        try {
            // Chiamata asincrona al context per ottenere i dati della città
            const cityData = await fetchCityData(city);
            // Naviga alla pagina di dettaglio, passando anche la regione nello stato
            navigate(`/dettaglio/${cityData.name}/${cityData.country}`, { state: { region: cityData.state } });
            setError("");
        } catch (err) {
            setError(err.message || "Errore durante la ricerca della città");
        }
        setCity("");
    }

    return (
        <>
            <div className="input-group ">
                {/* Input per la città, con gestione invio tramite Enter */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci la città"
                    aria-label="Inserisci la città"
                    aria-describedby="button-addon2"
                    value={city}
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                {/* Bottone per avviare la ricerca */}
                <button
                    className="btn  btn-search"
                    type="button"
                    id="button-addon2"
                    onClick={handleSearch}
                >Cerca</button>
            </div>
            {/* Messaggio di errore se presente */}
            {error && (
                <div className="alert alert-danger mt-2 position-absolute top-100 " role="alert">
                    Città non trovata
                </div>
            )}
        </>
    )
}

export default SearchBar
