import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'

export function DetailsDelivery() {
  const { route } = useRouteStore()
  const methodsPayment = ['Efectivo', 'Tarjeta de crédito', 'Transferencia']
  const [selectedPay, setSelectedPay] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Ruta seleccionada:', route)
    console.log('Método de pago seleccionado:', selectedPay)
  }

  return (
    <div className='fixed flex z-50 justify-center items-center top-0 left-0 w-full bg-slate-400/40 h-full'>
      <div className='bg-azur-50 overflow-y-scroll rounded-xl w-full max-w-xs md:max-w-sm lg:max-w-md max-h-[80%] flex flex-col gap-y-4'>
        <div className='border-b p-4 md:p-6 flex justify-between items-center'>
          <h3 className='text-lg font-bold pt-4 pb-2 border-b-2'>
            Detalles de la entrega
          </h3>
          <CloseButton
            data={route}
            setOpenModal={setOpenModal}
            setObject={setRoute}
            setFormData={setFormData}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full px-4 flex flex-col gap-y-4 bg-azur-50 rounded-xl'
        >
          <div className=''>
            <h4 className='pb-1'>Tipo de pago</h4>
            <div className=' flex flex-wrap gap-x-4 gap-y-3'>
              {methodsPayment.map((pay, index) => (
                <label
                  key={index}
                  className={`border rounded-lg px-3 py-1 ring-1 ring-transparent border-azur-600 hover:bg-azur-800 hover:text-azur-50 cursor-pointer ${
                    selectedPay === pay ? 'bg-azur-800 text-azur-50' : ''
                  }`}
                >
                  <input
                    className='hidden'
                    type='radio'
                    name='payment'
                    value={pay}
                    checked={selectedPay === pay}
                    onChange={() => setSelectedPay(pay)}
                  />
                  <span>{pay}</span>
                </label>
              ))}
            </div>
          </div>
          <div className='border-t p-4'>
            <button
              type='submit'
              className='w-full bg-azur-600 text-azur-50/90 border-2 border-azur-600 rounded-xl py-2 px-4 hover:bg-azur-800 hover:text-azur-50'
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
