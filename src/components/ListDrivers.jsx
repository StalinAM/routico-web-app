import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export function ListDrivers({ uid }) {
  const { drivers, fetchdrivers } = useAuthStore()

  useEffect(() => {
    fetchdrivers(uid)
  }, [uid])
  console.log(drivers)
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6 justify-center md:justify-start '>
      {drivers.map((driver) => (
        <article
          key={driver.docId}
          className='bg-azur-50 rounded-xl p-4 flex flex-col gap-2 border-2 border-azur-800'
        >
          <header className='py-2 border-b-2 flex justify-between items-center'>
            <div className=''>
              <h2 className='font-bold text-2xl'>
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
          <p>
            <strong>Contraseña:</strong> {driver.password}
          </p>
          <div className='border-t-2 pt-2'>
            <h3 className='font-bold'>Rutas:</h3>
            <ul className='route-list'>
              <li>Central Park to Downtown</li>
              <li>Main Street to Airport</li>
              <li>Harbor Road to City Center</li>
            </ul>
          </div>
        </article>
      ))}
    </ul>
  )
}
