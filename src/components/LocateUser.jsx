import { useEffect, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useRouteStore } from '../store/useRouteStore'

export function LocateUser({ setCoordinates }) {
  const [currentPosition, setCurrentPosition] = useState(null) // Ubicación inicial
  const [selectedPosition, setSelectedPosition] = useState(null) // Ubicación seleccionada
  const [hasMoved, setHasMoved] = useState(false)
  const { route } = useRouteStore()

  // Usar la geolocalización del navegador para obtener la posición inicial del usuario
  useEffect(() => {
    if (route?.address) {
      // Si existe una dirección en la ruta, la usamos como posición inicial
      setCurrentPosition(route.address)
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
  }, [currentPosition, hasMoved, setCoordinates, route?.address])
  // Manejo de eventos del mapa
  const map = useMapEvents({
    click: (e) => {
      setSelectedPosition(e.latlng) // Actualiza la ubicación seleccionada al hacer clic
      console.log('e.latlng', e.latlng.lat, e.latlng.lng)
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
        <Marker position={currentPosition}>
          <Popup>
            Estás aquí: <br />
            Latitud: {currentPosition[0].toFixed(4)} <br />
            Longitud: {currentPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}

      {/* Marcador para la ubicación seleccionada */}
      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>
            Ubicación seleccionada: <br />
            Latitud: {selectedPosition.lat?.toFixed(4)} <br />
            Longitud: {selectedPosition.lng?.toFixed(4)}
          </Popup>
        </Marker>
      )}
    </>
  )
}
