export function Waypoint({ setCoordinates, address }) {
  return (
    <div className='w-full h-48 rounded-xl overflow-hidden'>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={address || [-0.201662, -78.494125]}
        zoom={13}
      >
        {/* Capa base del mapa */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocateUser setCoordinates={setCoordinates} address={address} />
      </MapContainer>
    </div>
  )
}
