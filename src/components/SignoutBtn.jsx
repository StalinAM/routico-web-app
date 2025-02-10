export default function SignoutBtn({ main }) {
  async function signout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'GET' })

      if (!res.ok) {
        try {
          const data = await res.json()
          console.error('Error al cerrar sesión:', data)
        } catch (error) {
          console.error('Error al procesar la respuesta de logout:', error)
        }
        return
      }

      // Redirección si el backend la devuelve
      if (res.redirected) {
        window.location.assign(res.url)
      } else {
        // Redirección manual si la respuesta no es automática
        window.location.href = '/signin'
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  console.log(typeof main)

  return (
    <button
      className='flex gap-1 border items-center hover:bg-azur-800 hover:text-azur-50 rounded-lg px-3 py-1 [&_svg]:w-5 hover:scale-105 ease-in-out transition-all duration-300'
      type='button'
      onClick={signout}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2'></path>
        <path d='M9 12h12l-3 -3'></path>
        <path d='M18 15l3 -3'></path>
      </svg>
      {main === 'active' ? <span>Salir</span> : null}
    </button>
  )
}
