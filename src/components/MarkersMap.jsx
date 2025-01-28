import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LocateUser } from './LocateUser'
import { useRouteStore } from '../store/useRouteStore'

export function MarkersMap({ showMain = true, setCoordinates = () => {} }) {
  const { routes, route } = useRouteStore()
  console.log(routes)

  if (showMain) {
    return (
      <MapContainer
        center={[-0.201662, -78.494125]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Capa base del mapa */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routes.map((route) => (
          <Marker key={route.docId} position={route.address}>
            <Popup>{route.routeName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  }

  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={route?.address}
      zoom={13}
    >
      {/* Capa base del mapa */}
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocateUser setCoordinates={setCoordinates} />
    </MapContainer>
  )
}
