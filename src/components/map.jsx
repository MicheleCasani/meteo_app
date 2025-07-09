import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix per i marker icons di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente per aggiornare il centro della mappa
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const map = ({ city, country, lat, lon }) => {
    // Gestire il caso di coordinate mancanti
    if (!lat || !lon) {
        return <div>Caricamento mappa...</div>;
    }

    return (
        <>

            <MapContainer className='rounded-3'
                center={[lat, lon]}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
            >
                <ChangeView center={[lat, lon]} zoom={13} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[lat, lon]}>
                    <Popup>{city}, {country}</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default map
