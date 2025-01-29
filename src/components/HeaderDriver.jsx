import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'

export function HeaderDriver() {
  const [deliver, setDeliver] = useState(false)
  const { route } = useRouteStore()

  return (
    <header className='flex justify-between items-center'>
      <div>
        <h1 className='text-xl font-bold'>{route.routeName}</h1>
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
          <span>{route.phoneNumber}</span>
        </p>
      </div>
      <button
        onClick={() => setDeliver(!deliver)}
        className='bg-azur-600 text-azur-50 border rounded-xl py-2 px-4 hover:bg-azur-800'
      >
        {deliver ? 'Entregado' : 'En camino'}
      </button>
    </header>
  )
}
