import { useEffect, useState } from 'react'
import { getDriverRoutes } from '../utils/firebase/service'
import { Arrow, PingMap } from './icons/Icons'

export function ListRoutesDriver({ uid, displayButton = true }) {
  const [routes, setRoutes] = useState(null)
  useEffect(() => {
    const fetchRoutes = async () => {
      const routes = await getDriverRoutes(uid)
      setRoutes(routes)
    }
    fetchRoutes()

    return () => {
      // cleanup if necessary
    }
  }, [])

  return (
    <>
      {routes?.map((route) => (
        <li key={route.docId}>
          <a href={`/drivers/route/${route.docId}`}>
            <article className='flex bg-azur-50 justify-between items-center p-4 border-2 border-azur-600 rounded-lg bg-azur-200/20'>
              <div className='w-full pr-4'>
                <header className='pb-2 border-b-2 flex intems center justify-between'>
                  <div className='flex gap-x-2 items-center text-xl font-bold'>
                    <PingMap />
                    <h2>{route.routeName}</h2>
                  </div>
                  <p className='text-sm text-green-500'>Entregado</p>
                </header>
                <h3 className='pt-2 text-gray-600'>Datos de entrega:</h3>
                <p>
                  <strong>Cliente: </strong>
                  <span>{route.name}</span>
                </p>
                <p>
                  <strong>Telefono: </strong>
                  <span>{route.phoneNumber}</span>
                </p>
              </div>
              {displayButton && (
                <button className='rounded-full bg-azur-600 text-azur-50/80 p-2 '>
                  <Arrow />
                </button>
              )}
            </article>
          </a>
        </li>
      ))}
    </>
  )
}
