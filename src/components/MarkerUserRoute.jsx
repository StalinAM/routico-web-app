import { useEffect, useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
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

export function MarkerUserRoute() {
  const { routes, route } = useRouteStore()
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error)
        }
      )
    }
  }, [])
  return (
    <MapContainer
      center={userLocation || [-0.201662, -78.494125]} // Ubicación por defecto si no se obtiene la del usuario
      zoom={12}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Capa base del mapa */}
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker de la ubicación del usuario */}
      {userLocation && (
        <Marker position={userLocation} icon={redIcon}>
          <Popup>Estás aquí</Popup>
        </Marker>
      )}

      {/* Markers de las rutas */}
      {routes?.map((route) => (
        <Marker key={route.docId} position={route.address} icon={blueIcon}>
          <Popup>{route.routeName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
