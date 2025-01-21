import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export function ListDrivers({ uid }) {
  const { drivers, loading, fetchdrivers, getFilteredDrivers } = useAuthStore()
  const [visiblePasswords, setVisiblePasswords] = useState({})
  const [driversLoaded, setDriversLoaded] = useState(false)

  useEffect(() => {
    if (!driversLoaded) {
      fetchdrivers(uid).then(() => setDriversLoaded(true))
    }
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
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6 justify-center md:justify-start'>
      {filteredDrivers.map((driver) => (
        <li key={driver.docId}>
          <article className='bg-azur-50 rounded-xl p-4 flex flex-col gap-2 border-2 border-azur-800'>
            <header className='py-2 border-b-2 flex justify-between items-center'>
              <div className=''>
                <h2 className='font-bold text-2xl capitalize'>
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
                  <span>{driver.phoneNumber}</span>
                </p>
              </div>
              <span className='bg-azur-800 text-green-400 rounded-xl px-3 py-1'>
                Activo
              </span>
            </header>
            <h3 className='font-bold'>Credenciales:</h3>
            <p>
              <strong>Email:</strong> {driver.email}
            </p>
            <div className='flex justify-between'>
              <p>
                <strong>Contraseña:</strong>{' '}
                {visiblePasswords[driver.docId]
                  ? driver.password
                  : '************'}
              </p>
              <button onClick={() => togglePasswordVisibility(driver.docId)}>
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
              <h3 className='font-bold'>Rutas:</h3>
              <ul className='route-list'>
                <li>Central Park to Downtown</li>
                <li>Main Street to Airport</li>
                <li>Harbor Road to City Center</li>
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
