import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const RoutineMachine = ({ waypoints }) => {
  const map = useMap() // Obtener instancia del mapa

  useEffect(() => {
    if (!map) return

    const routingControl = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }]
      },
      routeWhileDragging: true,
      show: true,
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false
    }).addTo(map)

    return () => {
      map.removeControl(routingControl)
    }
  }, [map, waypoints])

  return null // No renderiza elementos en el DOM
}

export default RoutineMachine
