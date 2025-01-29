import { useRouteStore } from '../store/useRouteStore'

export function HeaderDriver() {
  const { route } = useRouteStore()
  console.log(route)

  return (
    <header className='p-4 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>{route.routeName}</h1>
      <button class='bg-azur-600 text-azur-50 border rounded-xl py-2 px-4 hover:bg-azur-800'>
        Entegrado
      </button>
    </header>
  )
}
