import { useEffect, useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { PingMap } from './icons/Icons'

export function ListRoutes({ uid, simple }) {
  const { setOpenModal, setRoute, loading, fetchRoutes, getFilteredRoutes } =
    useRouteStore()
  const [routesdLoaded, setRoutesLoaded] = useState(false)

  useEffect(() => {
    if (!routesdLoaded) {
      fetchRoutes(uid).then(() => setRoutesLoaded(true))
    }
  }, [routesdLoaded, fetchRoutes, uid])

  const filteredRoutes = getFilteredRoutes()
  if (loading) {
    return <p>Cargando rutas...</p>
  }
  if (!filteredRoutes || filteredRoutes.length === 0) {
    return <p>No hay rutas agregados</p>
  }
  const openRouteModal = (route) => {
    setRoute(route)
    setOpenModal(true)
  }
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-4 justify-center'>
      {filteredRoutes.map((route) => (
        <li key={route.docId}>
          <article className='flex flex-col gap-2 text-sm bg-azur-50 justify-between p-4 border-2 border-azur-600 rounded-lg bg-azur-200/20'>
            <header className='w-full pb-2 border-b-2 flex intems-center justify-between'>
              <div className='flex gap-x-2 text-lg font-bold'>
                <PingMap />
                <h2>{route.routeName}</h2>
              </div>
              <div className='flex items-center gap-2'>
                {simple && (
                  <button
                    onClick={() => openRouteModal(route)}
                    className='bg-azur-800 hover:bg-azur-600 text-azur-50 rounded-xl px-3 py-1 hover:scale-105 ease-in-out transition-all duration-300'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v8' />
                      <path d='M9 4v13' />
                      <path d='M15 7v6.5' />
                      <path d='M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                      <path d='M19.001 15.5v1.5' />
                      <path d='M19.001 21v1.5' />
                      <path d='M22.032 17.25l-1.299 .75' />
                      <path d='M17.27 20l-1.3 .75' />
                      <path d='M15.97 17.25l1.3 .75' />
                      <path d='M20.733 20l1.3 .75' />
                    </svg>
                  </button>
                )}
              </div>
            </header>
            <p className='text-base'>
              <strong>Nombre: </strong>
              <span>{route.name}</span>
            </p>
            <p className='text-base'>
              <strong>Teléfono: </strong>
              <span>{route.phoneNumber}</span>
            </p>
          </article>
        </li>
      ))}
    </ul>
  )
}
