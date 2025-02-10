import { type APIRoute } from 'astro'
export const prerender = false
export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('session', {
    path: '/'
  })
  return redirect('/signin')
}
