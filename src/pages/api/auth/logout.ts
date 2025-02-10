import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('__session', {
    path: '/',
    secure: true, // Asegura que se elimina solo en HTTPS
    httpOnly: true, // Evita que JavaScript pueda acceder a ella
    sameSite: 'lax' // O 'none' si usas 'secure: true'
  })

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie':
        '__session=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax',
      Location: '/signin'
    }
  })
}
