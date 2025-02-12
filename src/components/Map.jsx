import { MapContainer, TileLayer } from 'react-leaflet'
import RoutineMachine from './RoutineMachine'
import 'leaflet/dist/leaflet.css'
import { useRouteStore } from '../store/useRouteStore'
import { useEffect, useState } from 'react'
import { getDriverRoutesToday } from '../utils/firebase/service'

const Map = ({ uid, id }) => {
  const { setRoute, setRoutes, setDetailRoute, routes } = useRouteStore()
  const [origin, setOrigin] = useState(null) // Estado para la ubicación actual
  const [waypoints, setWaypoints] = useState([])
  const [destination, setDestination] = useState(null)
  const [details, setDetails] = useState([])

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
        const fetchedRoutes = await getDriverRoutesToday(uid)
        setRoutes(fetchedRoutes.routes)
        setDetails(fetchedRoutes.routeStatusList)
        const selectedRoute = fetchedRoutes.routes.find(
          (route) => route.docId === id
        )
        const selectedRouteStatus = fetchedRoutes.routeStatusList.find(
          (detail) => detail.routeId === id
        )

        if (selectedRoute && selectedRouteStatus) {
          setRoute(selectedRoute)
          setDetailRoute(selectedRouteStatus)

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

  return (
    <MapContainer
      center={origin || [-0.284917, -78.545485]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {origin && waypoints.length > 0 && (
        <RoutineMachine waypoints={[origin, ...waypoints, destination]} />
      )}
      {origin && destination && (
        <RoutineMachine waypoints={[origin, ...waypoints, destination]} />
      )}
    </MapContainer>
  )
}

export default Map
