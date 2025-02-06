import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { useAuthStore } from '../store/useAuthStore'
import { CheckRoute, DetailsRoute } from './icons/Icons'

export function HeaderDriver() {
  const { route } = useRouteStore()
  const { setOpenModal, setOpenModalRoutes } = useAuthStore()
  return (
    <header className='flex flex-col gap-y-2'>
      <div className='flex justify-between items-center'>
        <a
          className='flex gap-2 items-center border rounded-xl py-1 px-2 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
          href='/drivers'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M5 12l4 4' />
            <path d='M5 12l4 -4' />
          </svg>
        </a>
        <div className='flex gap-4'>
          <button
            onClick={() => setOpenModalRoutes(true)}
            className='flex gap-2 items-center bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
          >
            <DetailsRoute />
            <span className='hidden md:block'>Detalles</span>
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className='flex gap-2 items-center bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
          >
            <CheckRoute />
            <span className='hidden md:block'>Entrega</span>
          </button>
        </div>
      </div>
      <div className='border rounded-xl py-1 px-3'>
        <h2 className='text-lg font-bold'>{route.routeName}</h2>
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
            className='w-4'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
          </svg>
          <span className='text-sm'>{route.phoneNumber}</span>
        </p>
      </div>
    </header>
  )
}
