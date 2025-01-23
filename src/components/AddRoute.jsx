import { useState } from 'react'
import { CloseButton } from './CloseButton'

export function AddRoute({ uid, isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
  }
  if (!isOpen) return null
  return (
    <div className='fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full'>
      <div className='bg-azur-50 rounded-xl w-full max-w-sm flex flex-col gap-y-4'>
        <div className='border-b p-6 flex justify-between items-center'>
          <h3 className='text-center font-semibold text-xl'>Nueva ruta</h3>
          <CloseButton setIsOpen={setIsOpen} />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-4'>
          <div className='w-full px-6'>
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
          <label htmlFor='phoneNumber' className='text-gray-700 px-6'>
            Teléfono
            <input
              type='text'
              name='phoneNumber'
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
              Agregar ruta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
