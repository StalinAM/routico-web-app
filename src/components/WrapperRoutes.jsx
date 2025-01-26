import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { AddRoute } from './AddRoute'
import { Search } from './Search'
import { AddRouteI } from './icons/Icons'

export function WrapperRoutes({ uid }) {
  const { searchTerm, setSearchTerm } = useRouteStore()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section className='flex justify-between gap-x-2 items-center'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-x-1 bg-azur-600 text-azur-50/80 border rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
      >
        <AddRouteI />
        Agregar
      </button>
      <AddRoute uid={uid} isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  )
}
