import { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

export function MarkerMapLimit({ setWaypoints }) {
  const [markers, setMarkers] = useState({})

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng }

        setMarkers((prevMarkers) => {
          let updatedMarkers = { ...prevMarkers }
          const keys = Object.keys(updatedMarkers)

          if (keys.length < 3) {
            updatedMarkers[keys.length] = newMarker
          } else {
            delete updatedMarkers[keys[0]] // Elimina el más antiguo
            updatedMarkers[keys[0]] = newMarker // Agrega el nuevo
          }

          setWaypoints(updatedMarkers) // Envía al estado principal
          return updatedMarkers
        })
      }
    })
    return null
  }

  return (
    <MapContainer
      center={[-0.201662, -78.494125]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <MapClickHandler />
      {Object.values(markers).map((position, idx) => (
        <Marker key={idx} position={[position.lat, position.lng]} />
      ))}
    </MapContainer>
  )
}
