import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'

export function DetailsDelivery() {
  const { route } = useRouteStore()
  const methodsPayment = ['Efectivo', 'Tarjeta de crédito', 'Transferencia']
  const [selectedPay, setSelectedPay] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Ruta seleccionada:', route)
  }

  const togglePay = (pay) => {
    setSelectedPay(
      (prev) =>
        prev.includes(pay)
          ? prev.filter((r) => r !== pay) // Quitar si ya está seleccionado
          : [...prev, [pay]] // Agregar si no está seleccionado
    )
  }

  return (
    <form onSubmit={handleSubmit} className='w-full px-6 flex flex-col gap-y-4'>
      <h4>Tipo de pago</h4>
      <div className=' flex flex-wrap gap-x-4 gap-y-3'>
        {methodsPayment.map((pay, index) => (
          <label
            key={index}
            className='border rounded-lg px-3 py-1 ring-1 ring-transparent border-azur-600 hover:bg-azur-800 hover:text-azur-50 has-[:checked]:bg-azur-800 has-[:checked]:text-azur-50 cursor-pointer'
          >
            <input className='hidden ' type='checkbox' />
            <span>{pay}</span>
          </label>
        ))}
      </div>
      <div className='border-t p-6'>
        <button
          type='submit'
          className='w-full bg-azur-600 text-azur-50/90 border-2 border-azur-600 rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
        >
          Enviar
        </button>
      </div>
    </form>
  )
}
