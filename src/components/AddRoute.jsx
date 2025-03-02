import { useEffect, useState } from 'react'
import { CloseButton } from './CloseButton'
import { addRoute, updateRoute } from '../utils/firebase/service'
import { useRouteStore } from '../store/useRouteStore'
import { MarkersMap } from './MarkersMap'
import { routes } from '../lib/routes'
import { MarkerMapLimit } from './MarkersMapLimit'
import { toast, Toaster } from 'sonner'

export function AddRoute({ uid }) {
  const { setOpenModal, setRoute, route, openModal, fetchRoutes } =
    useRouteStore()

  const [formData, setFormData] = useState({
    routeName: '',
    name: '',
    phoneNumber: '',
    address: [],
    waypoints: {}
  })
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (route.routeName) {
      setFormData({
        routeName: route.routeName,
        name: route.name,
        phoneNumber: route.phoneNumber,
        address: route.address || []
      })
    }
  }, [route])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSetCoordinates = (coords) => {
    if (Array.isArray(coords) && coords.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        address: coords
      }))
    } else {
      console.error(
        'Las coordenadas deben ser un arreglo con latitud y longitud.'
      )
    }
  }

  const handleSetWaypoints = (waypoints) => {
    setFormData((prevData) => ({
      ...prevData,
      waypoints
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!route.routeName) {
      const completeData = {
        ...formData,
        uidAdmin: uid
      }
      await addRoute(completeData)
      toast.success(`Ruta ${completeData.routeName} agregada correctamente`)
    } else {
      const completeData = {
        ...route,
        routeName: formData.routeName,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        uidAdmin: uid
      }
      await updateRoute(route.docId, completeData)
      toast.success(`Ruta ${completeData.routeName} actualizada correctamente`)

      setRoute({})
    }
    fetchRoutes(uid)
    closeModal()
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenModal(false)
      setRoute({})
      setIsClosing(false)
    }, 400) // Tiempo de la animación
  }

  if (!openModal) return null
  return (
    <div
      className={`fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full ${
        isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
      }`}
    >
      <div
        className={`bg-azur-50 overflow-y-scroll rounded-xl w-full max-w-xs md:max-w-sm lg:max-w-xl max-h-[80%] flex flex-col gap-y-4 ${
          isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
        }`}
      >
        <div className='border-b py-4 px-6 flex justify-between items-center sticky top-0 bg-azur-50 z-50'>
          <h3 className='text-center font-semibold md:text-lg'>
            {route?.name ? 'Actualizar ruta' : 'Nueva ruta'}
          </h3>
          <CloseButton
            data={route}
            setOpenModal={setOpenModal}
            setObject={setRoute}
            setFormData={setFormData}
            setIsClosing={setIsClosing}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-y-2 md:gap-y-4 text-sm md:text-base'
        >
          <div className='w-full px-4 md:px-6'>
            <label htmlFor='routeName' className='block text-gray-700  '>
              Nombre Ruta
              <input
                type='text'
                name='routeName'
                value={formData.routeName}
                onChange={handleChange}
                className='block w-full border border-gray-200 rounded-xl py-2 px-4'
                required
              />
            </label>
          </div>
          <div className='w-full px-4 md:px-6'>
            <label htmlFor='name' className='block text-gray-700  '>
              Nombre Cliente
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='block w-full border border-gray-200 rounded-xl py-2 px-4'
                required
              />
            </label>
          </div>
          <label
            htmlFor='phoneNumber'
            className='text-gray-700 px-4 md:px-6   '
          >
            Teléfono
            <input
              type='text'
              name='phoneNumber'
              className='block w-full border border-gray-200 rounded-xl py-2 px-4 placeholder:font-extralight'
              placeholder='xx-xxxxxxxx'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <div className='px-4 md:px-6 flex flex-col'>
            <p className=' text-gray-700'>Dirección</p>
            <div className='w-full h-48 lg:h-56 rounded-xl overflow-hidden z-10'>
              <MarkersMap
                showMain={false}
                setCoordinates={handleSetCoordinates}
              />
            </div>
          </div>
          <div className='px-4 md:px-6 flex flex-col'>
            <p className=' text-gray-700'>Puntos de referencia</p>
            <div className='w-full h-48 lg:h-56 rounded-xl overflow-hidden z-10'>
              <MarkerMapLimit setWaypoints={handleSetWaypoints} />
            </div>
          </div>
          <div className='border-t p-4 md:p-6 flex '>
            <button
              type='submit'
              className='w-full bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
            >
              Agregar ruta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
