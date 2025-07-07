import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;


const SearchBar = () => {

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Funzione per gestire la ricerca della città
    const handleSearch = () => {
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
            .then(response => {
                if (response.data.length > 0) {
                    const cityData = response.data[0];
                    setCountry(cityData.country);
                    // Naviga alla pagina dei dettagli meteo
                    navigate(`/dettaglio/${cityData.name}/${cityData.country}`);
                } else {
                    setError("Città non trovata");
                }
            })
            .catch(error => {
                console.error("Errore durante la ricerca della città:", error);
                setError("Non è stato inserito alcun valore");
            });
        setCity(""); // Resetta il campo di input dopo la ricerca
        setError(""); // Resetta l'errore se presente

    }

    return (
        <>
            <div className="input-group ">
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
                >
                </input>
                <button
                    className="btn  btn-search"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                        handleSearch();
                    }}
                >Cerca</button>
            </div>
        </>
    )
}

export default SearchBar
