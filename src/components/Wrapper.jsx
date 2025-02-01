import { useState } from 'react'
import { AddDriver } from './AddDriver'
import { Search } from './Search'
import { useAuthStore } from '../store/useAuthStore'
import { AddDriverI } from './icons/Icons'
import { AddRoutesDriver } from './AddRoutesDriver'

export function Wrapper({ uid }) {
  const { setOpenModal, searchTerm, setSearchTerm } = useAuthStore()
  return (
    <section className='flex justify-between gap-x-2 items-center'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setOpenModal(true)}
        className='flex items-center gap-x-1 bg-azur-600 text-azur-50 border rounded-xl py-2 px-4 hover:bg-azur-800 hover:scale-105 ease-in-out transition-all duration-200'
      >
        <AddDriverI />
        Agregar
      </button>
      <AddDriver uid={uid} />
      <AddRoutesDriver uid={uid} />
    </section>
  )
}
