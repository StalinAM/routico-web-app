import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'
import { useAuthStore } from '../store/useAuthStore'
import { updateStatusDriver } from '../utils/firebase/service'

export function AddDetails() {
  const { setOpenModal, openModal } = useAuthStore()
  const { route, detailRoute } = useRouteStore()
  const methodsPayment = ['Efectivo', 'Tarjeta de crédito', 'No pago']
  const statusOptions = ['Pendiente', 'En camino', 'Entregado']

  const [formData, setFormData] = useState({
    selectedPay: '',
    status: 'Pendiente',
    amount: '',
    comments: ''
  })

  const [isClosing, setIsClosing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Llamada a la función para actualizar solo los campos existentes
    try {
      // Llamar a la función para actualizar los datos del documento
      await updateStatusDriver(detailRoute.docId, formData)

      console.log('Estado del conductor actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar el estado del conductor:', error)
    }
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
        <div className='border-b p-4 md:p-6 flex justify-between items-center sticky top-0 bg-azur-50 z-50'>
          <h3 className='text-center font-semibold text-xl'>
            Detalles de la entrega
          </h3>
          <CloseButton
            data={route}
            setOpenModal={setOpenModal}
            setIsClosing={setIsClosing}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-y-2 md:gap-y-4'
        >
          <div className='w-full px-4 md:px-6'>
            <h4>Tipo de pago</h4>
            <select
              name='selectedPay'
              value={formData.selectedPay}
              onChange={handleChange}
              className='w-full border border-gray-200 rounded-xl py-2 px-4 bg-white'
              required
            >
              {methodsPayment.map((pay, index) => (
                <option key={index} value={pay}>
                  {pay}
                </option>
              ))}
            </select>
          </div>

          <div className='w-full px-4 md:px-6'>
            <h4>Monto</h4>
            <input
              type='number'
              min='0'
              step='0.01'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              className='w-full border border-gray-200 rounded-xl py-2 px-4'
              placeholder='Ingrese el monto'
              required
            />
          </div>

          <div className='w-full px-4 md:px-6'>
            <h4>Estado</h4>
            <select
              name='status'
              value={formData.selectedStatus}
              onChange={handleChange}
              className='block w-full border border-gray-200 rounded-xl py-2 px-4 bg-white cursor-pointer'
              required
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full px-4 md:px-6'>
            <h4>Comentarios</h4>
            <textarea
              name='comments'
              value={formData.comments}
              onChange={handleChange}
              className='w-full border border-gray-200 rounded-xl py-2 px-4 h-24 resize-none'
              placeholder='Ingrese comentarios sobre la entrega'
            />
          </div>
          <div className='border-t p-4 md:p-6 flex mt-2'>
            <button
              type='submit'
              className='w-full bg-azur-800 text-azur-50/90 rounded-xl py-2 px-4 hover:bg-azur-600 hover:text-azur-50 transition-colors duration-300 ease-in-out'
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
