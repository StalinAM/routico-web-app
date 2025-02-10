import { type APIRoute } from 'astro'
export const prerender = false
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('session', { path: '/' })

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/signin',
      'Cache-Control':
        'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0'
    }
  })
}
