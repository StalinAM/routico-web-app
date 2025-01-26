import { PingMap } from './icons/Icons'

export function ListRoutes({ uid, simple }) {
  return (
    <li>
      <article className='flex flex-col text-sm md:text-base bg-azur-50 justify-between p-4 border-2 border-azur-600 rounded-lg bg-azur-200/20'>
        <header className='w-full pb-2 border-b-2 flex intems-center justify-between'>
          <div className='flex gap-x-2 text-base md:text-xl font-bold'>
            <PingMap />

            <h2>Ruta 1</h2>
          </div>
          {simple ? <p className=' text-green-500'>Entregado</p> : null}
        </header>
        <p>
          <strong>Nombre: </strong>
          <span>Juan</span>
        </p>
        <p>
          <strong>Teléfono: </strong>
          <span>098868</span>
        </p>
      </article>
    </li>
  )
}
