import { useEffect, useState } from 'react'
import { getDriverRoutesToday } from '../utils/firebase/service'
import { Arrow, PingMap } from './icons/Icons'
import { useRouteStore } from '../store/useRouteStore'

export function ListRoutesDriver({ uid, displayButton = true }) {
  const { routes, setRoutes } = useRouteStore()
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true)
      try {
        const fetchedRoutes = await getDriverRoutesToday(uid) // 🔥 Ahora usa la función que filtra por el día actual
        setRoutes(fetchedRoutes.routes)
        setDetails(fetchedRoutes.routeStatusList)
        console.log(routes)
      } catch (error) {
        console.error('Error obteniendo rutas:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRoutes()
  }, [uid])

  if (loading) {
    return <p>Cargando rutas...</p>
  }
  if (!routes || routes.length === 0) {
    return <p>No hay rutas asignadas</p>
  }

  return (
    <>
      {routes?.map((route) => (
        <li key={route.docId}>
          <article className='flex bg-azur-50 justify-between items-center p-4 border-2 border-azur-800 rounded-lg bg-azur-200/20'>
            <div className='w-full pr-4'>
              <header className='pb-2 border-b-2 flex intems center justify-between'>
                <div className='flex gap-x-2 items-center text-lg font-bold'>
                  <PingMap />
                  <h2>{route.routeName}</h2>
                </div>
                <p className='text-sm text-green-500'>
                  {
                    details.find((detail) => detail.routeId === route.docId)
                      ?.status
                  }
                </p>
              </header>
              <h3 className='pt-2 text-sm text-gray-600'>Datos de entrega:</h3>
              <p>
                <strong>Nombre: </strong>
                <span>{route.name}</span>
              </p>
              <p>
                <strong>Telefono: </strong>
                <span>{route.phoneNumber}</span>
              </p>
            </div>
            {displayButton && (
              <a
                href={`/drivers/route/${route.docId}`}
                className='rounded-full bg-azur-800 hover:bg-azur-600 text-azur-50/80 p-2 hover:translate-x-1 ease-in-out transition-all duration-300'
              >
                <Arrow />
              </a>
            )}
          </article>
        </li>
      ))}
    </>
  )
}
