import { useState } from 'react'
import { useRouteStore } from '../store/useRouteStore'
import { CloseButton } from './CloseButton'
import { useAuthStore } from '../store/useAuthStore'

export function DetailsDelivery() {
  const { setOpenModalRoutes, openModalRoutes } = useAuthStore()
  const { route, detailRoute, setRoute } = useRouteStore()
  const [isClosing, setIsClosing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Ruta seleccionada:', route)
    console.log('Método de pago seleccionado:', selectedPay)
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
        <div className='border-b p-4 md:p-6 flex justify-between items-center sticky top-0 bg-azur-50 z-50'>
          <h3 className='text-center font-semibold text-xl'>
            Detalles de la entrega
          </h3>
          <CloseButton
            data={route}
            setOpenModal={setOpenModalRoutes}
            setIsClosing={setIsClosing}
          />
        </div>
        <section className='px-4 md:px-6 pb-4 md:pb-6'>
          <p>
            <strong>Estado de entrega: </strong>
            {detailRoute.status}
          </p>
          <p>
            <strong>Instrucciones: </strong>
            {detailRoute.details}
          </p>
        </section>
      </div>
    </div>
  )
}
