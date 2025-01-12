import { useState } from 'react'

export const Close = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='22'
    height='22'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
    <path d='M18 6l-12 12'></path>
    <path d='M6 6l12 12'></path>
  </svg>
)

export function AddDriver() {
  return (
    <div
      id='modal-add-driver'
      className='fixed hidden flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full'
    >
      <div className='bg-azur-50 rounded-xl w-full max-w-sm flex flex-col gap-y-4'>
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>Nuevo conductor</h3>
          <button
            id='close-modal'
            className='cursor-pointer hover:bg-azur-800 rounded-md p-1 hover:text-azur-50'
          >
            <Close />
          </button>
        </div>
        <form id='addDriverForm' className='w-full flex flex-col gap-y-4'>
          <div className='grid grid-cols-2 gap-4 px-6'>
            <div>
              <label htmlFor='driverName' className='block text-gray-700'>
                Nombre
                <input
                  type='text'
                  id='driverName'
                  className='block w-full border border-gray-200 rounded-xl py-2 px-4'
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor='driverName' className='text-gray-700'>
                Apellido
                <input
                  type='text'
                  id='driverName'
                  className='block w-full border border-gray-200 rounded-xl py-2 px-4'
                  required
                />
              </label>
            </div>
          </div>
          <label htmlFor='driverName' className='text-gray-700 px-6'>
            Correo electrónico
            <input
              type='email'
              id='driverName'
              className='block w-full border border-gray-200 rounded-xl py-2 px-4 placeholder:font-extralight'
              placeholder='nombre@ejemplo.com'
              required
            />
          </label>
          <label htmlFor='driverName' className='text-gray-700 px-6'>
            Teléfono
            <input
              type='text'
              id='driverName'
              className='block w-full border border-gray-200 rounded-xl py-2 px-4 placeholder:font-extralight'
              placeholder='xx-xxxxxxxx'
              required
            />
          </label>
          <div className='border-t p-6'>
            <button
              type='submit'
              className='w-full bg-azur-600 text-azur-50/90 border-2 border-azur-600 rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
            >
              Agregar conductor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
