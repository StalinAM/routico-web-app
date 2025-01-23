import { useState } from 'react'
import { addDriver, registerDriver } from '../utils/firebase/service'
import { useAuthStore } from '../store/useAuthStore'
import { CloseButton } from './CloseButton'

export function AddDriver({ uid, isOpen, setIsOpen }) {
  const { fetchdrivers } = useAuthStore()

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  })

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
    const email = generateEmail(formData.name, formData.lastName)
    const password = generateSecurePassword()

    // Crear el objeto completo antes de actualizar el estado
    const completeData = {
      ...formData,
      email,
      password,
      uidAdmin: uid
    }

    // Actualizar el estado con los datos generados
    setFormData(completeData)

    console.log('Driver added:', completeData)
    await registerDriver(completeData.name, email, password)
    await addDriver(completeData)
    fetchdrivers(uid)
    setIsOpen(false)
  }
  if (!isOpen) return null

  return (
    <div className='fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full'>
      <div className='bg-azur-50 rounded-xl w-full max-w-sm flex flex-col gap-y-4'>
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>Nuevo conductor</h3>
          <CloseButton setIsOpen={setIsOpen} />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4'>
          <div className='grid grid-cols-2 gap-4 px-6'>
            <div>
              <label htmlFor='name' className='block text-gray-700'>
                Nombre
                <input
                  type='text'
                  name='name'
                  value={formData.nombre}
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
                  value={formData.apellido}
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
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </label>
          <div className='border-t p-6'>
            <button
              type='submit'
              className='w-full bg-azur-600 text-azur-50/90 border-2 border-azur-600 rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
            >
              Agregar conductor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
