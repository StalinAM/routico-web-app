import { useEffect, useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'
import { useAuthStore } from '../store/useAuthStore'
import {
  addOrUpdateRouteStatus,
  deleteRouteStatus,
  updateDriver
} from '../utils/firebase/service'
import { toast } from 'sonner'

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
  const [details, setDetails] = useState({})

  useEffect(() => {
    if (!route.length) {
      fetchRoutes(uid)
    }
  }, [fetchRoutes, uid, route])

  useEffect(() => {
    if (openModalRoutes && driver?.routes) {
      setSelectedRoutes(driver.routes.map((r) => r.id))
      setDetails(
        driver.routes.reduce(
          (acc, r) => ({ ...acc, [r.id]: r.detail || '' }),
          {}
        )
      )
    }
  }, [openModalRoutes, driver])

  useEffect(() => {
    if (!openModalRoutes) {
      setSelectedRoutes([])
      setDetails({})
    }
  }, [openModalRoutes])

  const toggleRouteSelection = (routeId) => {
    setSelectedRoutes((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    )
  }

  const handleDetailChange = (routeId, value) => {
    setDetails((prev) => ({ ...prev, [routeId]: value }))
  }
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Formato "YYYY-MM-DD"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const todayDate = getTodayDate()

    // 🔥 1. Obtener las rutas previamente asignadas
    const previousRoutes = driver?.routes?.map((r) => r.id) || []

    // 🔥 2. Determinar las rutas eliminadas (las que estaban antes y ya no están)
    const removedRoutes = previousRoutes.filter(
      (routeId) => !selectedRoutes.includes(routeId)
    )

    // 🔥 3. Actualizar el conductor en Firestore con las nuevas rutas
    const newDriver = {
      ...driver,
      routes: selectedRoutes.map((routeId) => ({
        id: routeId,
        detail: details[routeId] || ''
      }))
    }

    setDriver(newDriver)
    await updateDriver(driver.docId, newDriver)

    // 🔥 4. Eliminar de Firestore las rutas que se deseleccionaron
    for (const routeId of removedRoutes) {
      await deleteRouteStatus(driver.uidDriver, routeId, todayDate)
    }

    // 🔥 5. Agregar o actualizar las rutas seleccionadas en `routes-status`
    for (const routeId of selectedRoutes) {
      const routeStatusData = {
        routeId,
        details: details[routeId] || '',
        driverId: driver.uidDriver,
        status: 'Pendiente',
        comments: '',
        date: todayDate
      }
      await addOrUpdateRouteStatus(routeStatusData)
    }

    // 🔥 6. Actualizar la lista de conductores
    fetchdrivers(uid)

    toast.success(`Rutas actualizadas correctamente para ${driver.name}`)
    closeModal()
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenModalRoutes(false)
      setIsClosing(false)
    }, 400)
  }

  if (!openModalRoutes) return null

  return (
    <div
      className={`fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full ${
        isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
      }`}
    >
      <div
        className={`bg-azur-50 overflow-y-scroll rounded-xl w-full max-w-xs md:max-w-sm lg:max-w-md max-h-[80%] flex flex-col gap-y-4 ${
          isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
        }`}
      >
        <div className='border-b p-6 flex justify-between items-center sticky top-0 bg-azur-50'>
          <h3 className='text-center font-semibold text-xl'>
            Agregar Rutas a {driver.name}
          </h3>
          <CloseButton
            setOpenModal={setOpenModalRoutes}
            setObject={setDetails}
            setIsClosing={setIsClosing}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full px-6 flex flex-col gap-y-2'
        >
          <h4>Selecciona las Rutas</h4>
          <div className='flex flex-col gap-y-2'>
            {loading ? (
              <p>Cargando rutas...</p>
            ) : (
              filteredRoutes.map((route) => (
                <label
                  key={route.docId}
                  className='flex items-center gap-2 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={selectedRoutes.includes(route.docId)}
                    onChange={() => toggleRouteSelection(route.docId)}
                  />
                  {route.routeName}
                </label>
              ))
            )}
          </div>
          {selectedRoutes.map((routeId) => (
            <div key={routeId} className='flex flex-col gap-2 mt-2'>
              <label>
                Detalles para{' '}
                {filteredRoutes.find((r) => r.docId === routeId)?.routeName ||
                  routeId}
                :
              </label>
              <input
                type='text'
                className='p-2 border rounded'
                placeholder='Ingrese detalles...'
                value={details[routeId] || ''}
                onChange={(e) => handleDetailChange(routeId, e.target.value)}
              />
            </div>
          ))}
          <div className='border-t py-6'>
            <button
              type='submit'
              className='w-full bg-azur-800 text-azur-50 rounded-xl py-2 px-4 hover:bg-azur-600 transition-colors'
            >
              Agregar rutas
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
