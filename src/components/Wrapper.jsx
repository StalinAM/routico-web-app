import { useState } from 'react'
import { AddDriver } from './AddDriver'
import { Search } from './Search'
import { useAuthStore } from '../store/useAuthStore'

export function Wrapper({ uid }) {
  const { searchTerm, setSearchTerm } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section className='flex justify-between gap-x-2 items-center'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-x-1 bg-azur-600 text-azur-50/80 border rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
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
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
          <path d='M16 19h6'></path>
          <path d='M19 16v6'></path>
          <path d='M6 21v-2a4 4 0 0 1 4 -4h4'></path>
        </svg>
        Agregar
      </button>
      <AddDriver uid={uid} isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  )
}
