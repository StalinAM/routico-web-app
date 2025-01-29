import { MapContainer, TileLayer } from 'react-leaflet'
import RoutineMachine from './RoutineMachine'
import 'leaflet/dist/leaflet.css'
import { useRouteStore } from '../store/useRouteStore'
import { useEffect, useState } from 'react'
import { getDriverRoutes } from '../utils/firebase/service'

const Map = ({ uid, id }) => {
  const { routes, setRoutes } = useRouteStore()
  const [origin, setOrigin] = useState(null) // Estado para la ubicación actual
  const [waypoints, setWaypoints] = useState([])
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error)
        }
      )
    } else {
      console.error('Geolocalización no soportada en este navegador.')
    }
  }, [])

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await getDriverRoutes(uid)
        setRoutes(fetchedRoutes)
        const selectedRoute = fetchedRoutes.find((route) => route.docId === id)
        if (selectedRoute) {
          setDestination(selectedRoute.address)
          setWaypoints(
            Object.values(selectedRoute.waypoints)
              .map(({ lat, lng }) => [lat, lng])
              .reverse()
          )
        }
      } catch (error) {
        console.error('Error obteniendo rutas:', error)
      }
    }
    fetchRoutes()
  }, [uid, id, setRoutes])
  console.log(origin)
  console.log(waypoints)
  console.log(destination)

  return (
    <MapContainer
      center={origin || [-0.284917, -78.545485]}
      zoom={13}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {origin && waypoints.length > 0 && (
        <RoutineMachine waypoints={[origin, ...waypoints, destination]} />
      )}
    </MapContainer>
  )
}

export default Map
