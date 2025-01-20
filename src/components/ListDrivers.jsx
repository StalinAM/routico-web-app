import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export function ListDrivers({ uid }) {
  const { drivers, loading, error, fetchdrivers } = useAuthStore()

  useEffect(() => {
    fetchdrivers(uid)
  }, [uid])
  console.log(drivers)
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6'>
      {drivers.map((driver) => (
        <article
          key={driver.docId}
          className='bg-azur-50 rounded-xl p-4 flex flex-col gap-2 border-2 border-azur-800'
        >
          <header className='py-2 border-b-2 flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>
              {driver.name} {driver.lastName}
            </h2>
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
          <p>
            <strong>Telefono:</strong> {driver.phoneNumber}
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
