import { useEffect, useState } from 'react'
import {
  addDriver,
  registerDriver,
  updateDriver
} from '../utils/firebase/service'
import { useAuthStore } from '../store/useAuthStore'
import { CloseButton } from './CloseButton'
import { toast } from 'sonner'

export function AddDriver({ uid }) {
  const { fetchdrivers, setOpenModal, openModal, driver, setDriver } =
    useAuthStore()
  const [isClosing, setIsClosing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  })
  useEffect(() => {
    if (driver.email) {
      setFormData({
        name: driver.name,
        lastName: driver.lastName,
        phoneNumber: driver.phoneNumber
      })
    }
  }, [driver])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const generateEmail = (name, lastName) => {
    return `${name.toLowerCase()}.${lastName.toLowerCase()}@routico.ec`
  }
  const generateSecurePassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~'
    return Array.from({ length: 12 }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length))
    ).join('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Generar email y contraseña
    if (!driver.email) {
      const email = generateEmail(formData.name, formData.lastName)
      const password = generateSecurePassword()
      const uidDriver = await registerDriver(formData.name, email, password)
      const completeData = {
        ...formData,
        email,
        password,
        uidAdmin: uid,
        uidDriver: uidDriver
      }
      await addDriver(completeData)
      toast.success(`Conductor ${completeData.name} agregado correctamente`)
      setDriver({})
    } else {
      // Crear el objeto completo antes de actualizar el estado
      const completeData = {
        ...driver,
        name: formData.name,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        uidAdmin: uid
      }

      // Actualizar el estado con los datos generados
      await updateDriver(driver.docId, completeData)
      toast.success(`Conductor ${completeData.name} actualizado correctamente`)
      setDriver({})
    }
    setFormData({
      name: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: ''
    })

    fetchdrivers(uid)
    closeModal()
  }
  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenModal(false)
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
        className={`bg-azur-50 overflow-y-scroll rounded-xl w-full max-w-xs md:max-w-sm lg:max-w-md max-h-[80%] flex flex-col gap-y-4 ${
          isClosing ? 'animate-scale-down-center' : 'animate-scale-up-center'
        }`}
      >
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>
            {driver?.email ? 'Actualizar conductor' : 'Nuevo conductor'}
          </h3>
          <CloseButton
            data={driver}
            setOpenModal={setOpenModal}
            setObject={setDriver}
            setFormData={setFormData}
            setIsClosing={setIsClosing}
          />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4'>
          <div className='grid grid-cols-2 gap-4 px-6'>
            <div>
              <label htmlFor='name' className='block text-gray-700'>
                Nombre
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
            <div>
              <label htmlFor='lastName' className='text-gray-700'>
                Apellido
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='block w-full border border-gray-200 rounded-xl py-2 px-4'
                  required
                />
              </label>
            </div>
          </div>
          <label htmlFor='phoneNumber' className='text-gray-700 px-6'>
            Teléfono
            <input
              type='text'
              name='phoneNumber'
              max={10}
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
              className='w-full bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
            >
              Agregar conductor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
