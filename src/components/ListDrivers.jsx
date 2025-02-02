import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { AddRouteI } from './icons/Icons'
import { useRouteStore } from '../store/useRouteStore'
import { toast, Toaster } from 'sonner'

export function ListDrivers({ uid }) {
  const {
    drivers,
    setOpenModal,
    setOpenModalRoutes,
    setDriver,
    loading,
    fetchdrivers,
    getFilteredDrivers
  } = useAuthStore()
  const { routes } = useRouteStore()
  const [visiblePasswords, setVisiblePasswords] = useState({})
  const [driversLoaded, setDriversLoaded] = useState(false)

  useEffect(() => {
    if (!driversLoaded) {
      fetchdrivers(uid).then(() => setDriversLoaded(true))
    }
    console.log(drivers)
  }, [uid, fetchdrivers, driversLoaded])

  const filteredDrivers = getFilteredDrivers()

  if (loading) {
    return <p>Cargando conductores...</p>
  }
  if (!filteredDrivers || filteredDrivers.length === 0) {
    return <p>No hay conductores agregados</p>
  }
  const togglePasswordVisibility = (docId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [docId]: !prev[docId] // Cambia el estado de visibilidad para este `docId`
    }))
  }
  const openDriverModal = (driver) => {
    setDriver(driver)
    setOpenModal(true)
  }

  const openRouteModal = (driver) => {
    setDriver(driver)
    setOpenModalRoutes(true)
  }

  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6 justify-center'>
      {filteredDrivers.map((driver) => (
        <li className='rounded-xl' key={driver.docId}>
          <article className='bg-azur-50 rounded-xl p-4 flex flex-col gap-2 border-2 border-azur-800'>
            <header className='pb-2 border-b-2 flex justify-between items-center'>
              <div className=''>
                <h2 className='font-bold text-lg  capitalize'>
                  {driver.name} {driver.lastName}
                </h2>
                <p className='flex gap-1 items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
                  </svg>
                  <span className='text-sm'>{driver.phoneNumber}</span>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => openRouteModal(driver)}
                  className='bg-azur-800 text-azur-50 rounded-xl px-3 py-1 hover:bg-azur-600 hover:scale-105 ease-in-out transition-all duration-200'
                >
                  <AddRouteI />
                </button>
                <button
                  onClick={() => openDriverModal(driver)}
                  className='bg-azur-800 text-azur-50 rounded-xl px-3 py-1 hover:bg-azur-600 hover:scale-105 ease-in-out transition-all duration-200'
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
                    <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                    <path d='M6 21v-2a4 4 0 0 1 4 -4h3.5' />
                    <path d='M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z' />
                  </svg>
                </button>
              </div>
            </header>
            <h3 className='text-sm text-gray-700'>Credenciales:</h3>
            <p>
              <strong>Email:</strong> {driver.email}
            </p>
            <div className='flex justify-between items-center'>
              <p>
                <strong>Contraseña:</strong>{' '}
                {visiblePasswords[driver.docId]
                  ? driver.password
                  : '************'}
              </p>
              <button
                className='bg-slate-100 rounded p-1 hover:scale-105 ease-in-out transition-all duration-300'
                onClick={() => togglePasswordVisibility(driver.docId)}
              >
                {!visiblePasswords[driver.docId] ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                    <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                    <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                    <path d='M3 3l18 18' />
                  </svg>
                )}
              </button>
            </div>
            <div className='border-t-2 pt-2'>
              <h3 className='text-sm text-gray-700'>Rutas:</h3>
              <ul>
                {driver?.routes?.map((routeId, index) => {
                  const matchedRoute = routes.find(
                    (route) => route.docId === routeId
                  )
                  return (
                    <li key={index}>
                      {matchedRoute
                        ? matchedRoute.routeName
                        : 'Ruta no encontrada'}
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
