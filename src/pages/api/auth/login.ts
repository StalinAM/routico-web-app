export const prerender = false
import type { APIRoute } from 'astro'
import { app } from '../../../lib/firebase/server'
import { getAuth } from 'firebase-admin/auth'

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app)

  /* Get token from request headers */
  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1]
  if (!idToken) {
    return new Response('No token found', { status: 401 })
  }

  /* Verify id token */
  try {
    await auth.verifyIdToken(idToken)
  } catch (error) {
    return new Response('Invalid token', { status: 401 })
  }

  /* Create and set session cookie */
  const fiveDays = 60 * 60 * 24 * 5 * 1000
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays
  })

  cookies.set('__session', sessionCookie, {
    path: '/'
  })
  const decodedCookie = await auth.verifySessionCookie(sessionCookie)
  const user = await auth.getUser(decodedCookie.uid)

  if (user.email?.match(/@routico.com/)) {
    return redirect('/drivers')
  }
  return redirect('/admin')
}
