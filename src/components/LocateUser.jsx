import { useEffect, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje
  popupAnchor: [1, -34], // Punto de apertura del popup
  shadowSize: [41, 41]
})
const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje
  popupAnchor: [1, -34], // Punto de apertura del popup
  shadowSize: [41, 41]
})
export function LocateUser({ setCoordinates, address }) {
  const [currentPosition, setCurrentPosition] = useState(null) // Ubicación inicial
  const [selectedPosition, setSelectedPosition] = useState(null) // Ubicación seleccionada
  const [hasMoved, setHasMoved] = useState(false)

  // Usar la geolocalización del navegador para obtener la posición inicial del usuario
  useEffect(() => {
    if (address) {
      // Si existe una dirección en la ruta, la usamos como posición inicial
      setCurrentPosition(address)
    } else if (!currentPosition && !hasMoved && 'geolocation' in navigator) {
      // Solo obtenemos la ubicación si currentPosition es null y el usuario no ha movido el mapa
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentPosition({ lat: latitude, lng: longitude }) // Guarda la posición actual
          setCoordinates([latitude, longitude]) // Actualiza las coordenadas en el componente padre
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error)
        }
      )
    }
  }, [currentPosition, hasMoved, setCoordinates, address])
  // Manejo de eventos del mapa
  const map = useMapEvents({
    click: (e) => {
      setSelectedPosition(e.latlng) // Actualiza la ubicación seleccionada al hacer clic
      setCoordinates([e.latlng.lat, e.latlng.lng]) // Actualiza las coordenadas en el componente padre

      setHasMoved(true) // Indica que el usuario movió el mapa
    },
    locationfound: (location) => {
      // Actualiza la posición si se detecta automáticamente
      if (!selectedPosition) {
        // No actualizamos si el usuario ya ha seleccionado una ubicación
        setCurrentPosition(location.latlng)
        setCoordinates([location.latlng.lat, location.latlng.lng])
      }
    },
    moveend: () => {
      // Permite que el mapa se mueva sin que se recentre
      setHasMoved(true) // Marca que el mapa fue movido manualmente
    }
  })

  // Centrar el mapa en la posición inicial cuando esta cambie
  useEffect(() => {
    if (
      currentPosition &&
      currentPosition.lat !== undefined &&
      currentPosition.lng !== undefined &&
      !hasMoved
    ) {
      map.setView(currentPosition, 13) // Centra el mapa en la ubicación inicial
    }
  }, [currentPosition, map, hasMoved])

  return (
    <>
      {/* Marcador para la ubicación inicial */}
      {currentPosition && !selectedPosition && (
        <Marker position={currentPosition} icon={redIcon}>
          <Popup>
            Estás aquí: <br />
            Latitud: {currentPosition[0]} <br />
            Longitud: {currentPosition[1]}
          </Popup>
        </Marker>
      )}

      {/* Marcador para la ubicación seleccionada */}
      {selectedPosition && (
        <Marker position={selectedPosition} icon={blueIcon}>
          <Popup>
            Ubicación seleccionada: <br />
            Latitud: {selectedPosition.lat} <br />
            Longitud: {selectedPosition.lng}
          </Popup>
        </Marker>
      )}
    </>
  )
}
