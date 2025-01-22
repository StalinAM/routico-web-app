export function ListRoutes({ uid }) {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-6 justify-center md:justify-start'>
      <article className='flex flex-col bg-azur-50 justify-between p-4 border-2 border-azur-600 rounded-lg bg-azur-200/20'>
        <header className='w-full pb-2 border-b-2 flex intems-center justify-between'>
          <div className='flex gap-x-2 text-xl font-bold'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <path d='M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7'></path>
              <path d='M9 4v13'></path>
              <path d='M15 7v5'></path>
              <path d='M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z'></path>
              <path d='M19 18v.01'></path>
            </svg>

            <h2>Ruta 1</h2>
          </div>
          <p className='text-sm text-green-500'>Entregado</p>
        </header>
        <h3 className='pt-2 text-gray-600'>Información Cliente:</h3>
        <p>
          <strong>Nombre: </strong>
          <span>Juan</span>
        </p>
        <p>
          <strong>Teléfono: </strong>
          <span>098868</span>
        </p>
      </article>
    </ul>
  )
}
