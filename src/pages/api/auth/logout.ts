import type { APIRoute } from 'astro'

export const get: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('__session', {
    path: '/'
  })
  return redirect('/signin', 302)
}
