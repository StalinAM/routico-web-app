import { useState } from 'react'
import { AddDriver } from './AddDriver'
import { Search } from './Search'
import { useAuthStore } from '../store/useAuthStore'
import { AddDriverI, DeleteRoute } from './icons/Icons'
import { AddRoutesDriver } from './AddRoutesDriver'
import { updateDriver } from '../utils/firebase/service'
import { toast } from 'sonner'

export function Wrapper({ uid }) {
  const { setOpenModal, searchTerm, setSearchTerm, drivers, fetchdrivers } =
    useAuthStore()
  const clearAllRoutes = async () => {
    if (!drivers.length) {
      toast.error('No hay conductores para actualizar.')
      return
    }

    try {
      await Promise.all(
        drivers.map(async (driver) => {
          const updatedDriver = { ...driver, routes: [] }
          await updateDriver(driver.docId, updatedDriver)
        })
      )

      toast.success('Se han eliminado todas las rutas de los conductores.')
      fetchdrivers(uid) // Refresca la lista de conductores
    } catch (error) {
      console.error('Error al limpiar rutas:', error)
      toast.error('Error al limpiar las rutas.')
    }
  }
  return (
    <section className='flex justify-between gap-x-2 items-center'>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className=' gap-x-2 flex'>
        <button
          onClick={clearAllRoutes}
          className='flex items-center gap-x-1 bg-azur-800 text-azur-50 border rounded-xl py-2 px-4 hover:bg-azur-600 hover:scale-105 ease-in-out transition-all duration-200'
        >
          <DeleteRoute />
          <span className='hidden md:block'>Limpiar Rutas</span>
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className='flex items-center gap-x-1 bg-azur-800 text-azur-50 border rounded-xl py-2 px-4 hover:bg-azur-600 hover:scale-105 ease-in-out transition-all duration-200'
        >
          <AddDriverI />
          <span className='hidden md:block'>Agregar</span>
        </button>
      </div>
      <AddDriver uid={uid} />
      <AddRoutesDriver uid={uid} />
    </section>
  )
}
