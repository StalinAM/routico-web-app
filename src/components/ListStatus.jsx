import { useEffect, useState } from 'react'
import { fetchStatus } from '../utils/firebase/service'
import { useRouteStore } from '../store/useRouteStore'
import { useAuthStore } from '../store/useAuthStore'

export function ListStatus({ uid }) {
  const [statusList, setStatusList] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchRoutes, getFilteredRoutes } = useRouteStore()
  const { fetchdrivers, getFilteredDrivers } = useAuthStore()
  const [routesLoaded, setRoutesLoaded] = useState(false)
  const [driversLoaded, setDriversLoaded] = useState(false)

  useEffect(() => {
    const getStatusList = async () => {
      try {
        const data = await fetchStatus(uid)
        // Ordenar por fecha
        const sortedData = data.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0)
          const dateB = b.date ? new Date(b.date) : new Date(0)
          return dateB - dateA
        })

        // Agrupar por fecha
        const groupedData = sortedData.reduce((groups, status) => {
          const date = status.date
            ? new Date(status.date).toLocaleDateString()
            : 'Sin fecha'
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(status)
          return groups
        }, {})

        setStatusList(groupedData)
      } catch (error) {
        console.error('Error al obtener los estados:', error)
      } finally {
        setLoading(false)
      }
    }

    if (uid) getStatusList()
  }, [uid])

  useEffect(() => {
    if (!routesLoaded && uid) {
      fetchRoutes(uid).then(() => setRoutesLoaded(true))
    }
  }, [routesLoaded, uid, fetchRoutes])

  useEffect(() => {
    if (!driversLoaded && uid) {
      fetchdrivers(uid).then(() => setDriversLoaded(true))
    }
  }, [driversLoaded, uid, fetchdrivers])

  const routes = getFilteredRoutes()
  const drivers = getFilteredDrivers()

  if (loading) return <p>Cargando entregas...</p>
  if (Object.keys(statusList).length === 0)
    return <p>No hay estados disponibles.</p>

  return (
    <>
      {Object.keys(statusList).map((date) => (
        <div key={date} className='mb-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>{date}</h3>
          <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6 justify-center'>
            {statusList[date].map((status) => (
              <li
                key={status.docId}
                className='bg-azur-50 h-full rounded-xl p-4 flex flex-col gap-2 border-2 border-azur-800'
              >
                <div className='flex justify-between items-center'>
                  <div className='w-full'>
                    <div className='flex items-center justify-between border-b-2 pb-2'>
                      <div>
                        <p className='capitalize'>
                          <strong>Conductor: </strong>
                          {
                            drivers.find(
                              (drive) => drive.uidDriver === status.uidDriver
                            )?.name
                          }{' '}
                          {drivers.find(
                            (drive) => drive.uidDriver === status.uidDriver
                          )?.lastName || 'No asignado'}
                        </p>
                        <p className='capitalize'>
                          <strong>Ruta: </strong>
                          {routes.find(
                            (route) => route.docId === status.routeId
                          )?.routeName || 'No asignada'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-sm text-white rounded-full ${
                          status.status === 'Pendiente'
                            ? 'bg-yellow-500'
                            : status.status === 'En camino'
                            ? 'bg-blue-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {status.status}
                      </span>
                    </div>
                    <div className=' border-b-2 pt-2 pb-2'>
                      <p>
                        <strong>Tipo de pago: </strong>
                        {status.selectedPay || 'No especificado'}
                      </p>
                      <p>
                        <strong>Monto: </strong>${status.amount || '0.00'}
                      </p>
                    </div>
                    <div className='pt-2'>
                      <p>
                        <strong>Detalles: </strong> {status.details}
                      </p>
                      <p>
                        <strong>Comentarios: </strong>
                        {status.comments || 'Sin comentarios'}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
