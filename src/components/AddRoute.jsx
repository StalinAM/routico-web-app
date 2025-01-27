import { useEffect, useState } from 'react'
import { CloseButton } from './CloseButton'
import { addRoute, updateRoute } from '../utils/firebase/service'
import { useRouteStore } from '../store/useRouteStore'

export function AddRoute({ uid }) {
  const { setOpenModal, setRoute, route, openModal, fetchRoutes } =
    useRouteStore()
  const [formData, setFormData] = useState({
    routeName: '',
    name: '',
    phoneNumber: ''
  })

  useEffect(() => {
    if (route.routeName) {
      setFormData({
        routeName: route.routeName,
        name: route.name,
        phoneNumber: route.phoneNumber
      })
    }
  }, [route])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!route.routeName) {
      const completeData = {
        ...formData,
        uidAdmin: uid
      }
      await addRoute(completeData)
      setRoute({})
    } else {
      const completeData = {
        ...formData,
        routeName: route.routeName,
        name: route.name,
        phoneNumber: route.phoneNumber,
        uidAdmin: uid
      }
      await updateRoute(route.docId, completeData)
      setRoute({})
    }
    setFormData({
      routeName: '',
      name: '',
      phoneNumber: ''
    })
    fetchRoutes(uid)
    setOpenModal(false)
  }
  if (!openModal) return null
  return (
    <div className='fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full'>
      <div className='bg-azur-50 rounded-xl w-full max-w-sm flex flex-col gap-y-4'>
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>
            {route?.name ? 'Actualizar ruta' : 'Nueva ruta'}
          </h3>
          <CloseButton
            data={route}
            setOpenModal={setOpenModal}
            setObject={setRoute}
            setFormData={setFormData}
          />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4'>
          <div className='w-full px-6'>
            <label htmlFor='routeName' className='block text-gray-700'>
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
          <div className='w-full px-6'>
            <label htmlFor='name' className='block text-gray-700'>
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
          <label htmlFor='phoneNumber' className='text-gray-700 px-6'>
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
          <div className='border-t p-6'>
            <button
              type='submit'
              className='w-full bg-azur-600 text-azur-50/90 border-2 border-azur-600 rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
            >
              Agregar ruta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
