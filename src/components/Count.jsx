import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useRouteStore } from '../store/useRouteStore'

export function Count({ data, uid }) {
  const { routes } = useRouteStore()
  const { drivers, getFilteredDrivers, fetchdrivers } = useAuthStore()

  useEffect(() => {
    fetchdrivers(uid)
  }, [])

  const filteredDrivers = getFilteredDrivers()

  if (data === 'rutas') {
    return (
      <div className='flex items-center gap-x-4'>
        <div className='rounded-full bg-azur-400 p-2 lg::p-3 text-azur-800'>
          <svg
            className='w-8 h-8 md:w-10 md:h-10'
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
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z'></path>
            <path d='M8 7l0 .01'></path>
            <path d='M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z'></path>
            <path d='M16 15l0 .01'></path>
          </svg>
        </div>
        <div>
          <h2 className='text-gray-500 text-center text-sm md:text-base capitalize'>
            {data}
          </h2>
          <p className='text-2xl md:text-3xl text-azur-600 font-bold'>
            {routes.length}
          </p>
        </div>
      </div>
    )
  }
  if (data === 'conductores') {
    return (
      <div className='flex items-center gap-x-4'>
        <div className='rounded-full bg-azur-400 p-2 lg:p-3 text-azur-800'>
          <svg
            className='w-8 h-8 md:w-10 md:h-10'
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
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'></path>
            <path d='M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1'></path>
            <path d='M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z'></path>
          </svg>
        </div>
        <div>
          <h2 className='text-gray-500 text-center text-sm md:text-base capitalize'>
            {data}
          </h2>
          <p className='text-2xl md:text-3xl text-azur-600 font-bold'>
            {filteredDrivers.length}
          </p>
        </div>
      </div>
    )
  }
  return <></>
}
