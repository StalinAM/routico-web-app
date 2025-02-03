import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'
import { useAuthStore } from '../store/useAuthStore'

export function AddDetails() {
  const { setOpenModal, openModal } = useAuthStore()
  const { route } = useRouteStore()
  const methodsPayment = ['Efectivo', 'Tarjeta de crédito', 'Transferencia']
  const statusOptions = ['Pendiente', 'En camino', 'Entregado'] // 🚀 Opciones de estado

  const [selectedPay, setSelectedPay] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('Pendiente') // 🚀 Estado por defecto
  const [isClosing, setIsClosing] = useState(false)
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Ruta seleccionada:', route)
    console.log('Método de pago seleccionado:', selectedPay)
    console.log('Estado seleccionado:', selectedStatus)
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
            <h4 className='pb-1'>Tipo de pago</h4>
            <select
              value={selectedPay}
              onChange={(e) => setSelectedPay(e.target.value)}
              className='w-full border border-gray-200 rounded-xl py-2 px-4 bg-white'
              required
            >
              <option value='' disabled>
                Selecciona un método de pago
              </option>
              {methodsPayment.map((pay, index) => (
                <option key={index} value={pay}>
                  {pay}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full px-4 md:px-6'>
            <h4 className='pb-1'>Monto</h4>
            <input
              type='number'
              min='0'
              step='0.01'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full border border-gray-200 rounded-xl py-2 px-4'
              placeholder='Ingrese el monto'
              required
            />
          </div>
          <div className='w-full px-4 md:px-6'>
            <h4 className='pb-1'>Estado</h4>
            <select
              name='status'
              className='block w-full border border-gray-200 rounded-xl py-2 px-4 bg-white cursor-pointer'
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className='border-t p-4 md:p-6 flex'>
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
