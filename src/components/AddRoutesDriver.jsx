import { useEffect, useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'
import { useAuthStore } from '../store/useAuthStore'
import { updateDriver } from '../utils/firebase/service'
import { toast, Toaster } from 'sonner'

export function AddRoutesDriver({ uid }) {
  const { route, fetchRoutes, loading, getFilteredRoutes } = useRouteStore()
  const {
    fetchdrivers,
    openModalRoutes,
    setOpenModalRoutes,
    setDriver,
    driver
  } = useAuthStore()
  const filteredRoutes = getFilteredRoutes()
  const [selectedRoutes, setSelectedRoutes] = useState([])
  const [isClosing, setIsClosing] = useState(false)
  useEffect(() => {
    // Cargar las rutas solo si no se han cargado
    if (!route.length) {
      fetchRoutes(uid)
    }
  }, [fetchRoutes, uid, route])

  useEffect(() => {
    if (openModalRoutes && driver?.routes) {
      const selected = filteredRoutes.filter((r) =>
        driver.routes.includes(r.docId)
      )
      setSelectedRoutes(selected)
    }
  }, [openModalRoutes, driver, filteredRoutes])

  useEffect(() => {
    if (!openModalRoutes) {
      setSelectedRoutes([])
    }
  }, [openModalRoutes, driver])

  const toggleRoute = (route) => {
    setSelectedRoutes(
      (prev) =>
        prev.includes(route)
          ? prev.filter((r) => r !== route) // Quitar si ya está seleccionado
          : [...prev, route] // Agregar si no está seleccionado
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Extraer los `docId` de las rutas seleccionadas
    const selectedDocIds = selectedRoutes.map((route) => route.docId)

    // Actualizar el conductor con las rutas seleccionadas\
    const newDriver = {
      ...driver,
      routes: selectedDocIds
    }
    setDriver(newDriver)
    // Mostrar los docIds en la consola después de actualizar el estado
    await updateDriver(driver.docId, newDriver)
    fetchdrivers(uid)
    toast.success(`Rutas asignadas correctamente a ${driver.name}`)
    closeModal()
  }
  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenModalRoutes(false)
      setIsClosing(false)
      setSelectedRoutes([])
    }, 400) // Tiempo de la animación
  }

  if (!openModalRoutes) return null
  return (
    <div
      className={`fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full ${
        isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
      }`}
    >
      <div
        className={`bg-azur-50 rounded-xl w-full max-w-xs md:max-w-sm lg:max-w-md flex flex-col gap-y-6 ${
          isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
        }`}
      >
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>
            Agregar Rutas a {driver.name}
          </h3>
          <CloseButton
            data={driver}
            setOpenModal={setOpenModalRoutes}
            setObject={setDriver}
            setIsClosing={setIsClosing}
            setFormData={() => {}}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full px-6 flex flex-col gap-y-2'
        >
          <h4>Lista de Rutas</h4>
          <div className=' flex flex-col items-center md:flex-row md:flex-wrap gap-x-4 gap-y-3 pb-4'>
            {loading ? (
              <p>Cargando rutas...</p>
            ) : filteredRoutes.length === 0 ? (
              <p>No hay rutas disponibles</p>
            ) : (
              filteredRoutes.map((route, index) => (
                <label
                  key={route.docId}
                  className='border rounded-lg px-3 py-1 ring-1 ring-transparent hover:bg-azur-800 hover:text-azur-50 has-[:checked]:bg-azur-800 has-[:checked]:text-azur-50 cursor-pointer transition-colors duration-300 ease-in-out'
                >
                  <input
                    className='hidden '
                    type='checkbox'
                    checked={selectedRoutes.includes(route)}
                    onChange={() => toggleRoute(route)}
                  />
                  <span>{route.routeName}</span>
                </label>
              ))
            )}
          </div>
          <div className='border-t py-6'>
            <button
              type='submit'
              className='w-full bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
            >
              Agregar rutas
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
