import { useRouteStore } from '../store/useRouteStore'
import { AddRoute } from './AddRoute'
import { Search } from './Search'
import { AddRouteI } from './icons/Icons'

export function WrapperRoutes({ uid }) {
  const { searchTerm, setSearchTerm, setOpenModal } = useRouteStore()
  return (
    <section className='flex justify-between gap-x-2 items-center'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setOpenModal(true)}
        className='flex items-center gap-x-1 bg-azur-800 text-azur-50/80 border rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 hover:scale-105 ease-in-out transition-all duration-200'
      >
        <AddRouteI />
        Agregar
      </button>
      <AddRoute uid={uid} />
    </section>
  )
}
