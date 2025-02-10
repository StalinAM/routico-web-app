export const prerender = false
import type { APIRoute } from 'astro'
import { app } from '../../../lib/firebase/server'
import { getAuth } from 'firebase-admin/auth'

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app)

  /* Obtener el token del header */
  const idToken = request.headers.get('Authorization')?.split('Bearer ')[1]
  if (!idToken) {
    return new Response(JSON.stringify({ error: 'No token found' }), {
      status: 401
    })
  }

  try {
    /* Verificar el token de Firebase */
    await auth.verifyIdToken(idToken)

    const fiveDays = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: fiveDays
    })

    /* Guardar la cookie */
    cookies.set('session', sessionCookie, {
      path: '/'
    })

    /* Verificar la cookie y obtener el usuario */
    const decodedCookie = await auth.verifySessionCookie(sessionCookie, true)
    const user = await auth.getUser(decodedCookie.uid)

    /* Redireccionar según el dominio del correo */
    return user.email?.match(/@routico\.ec/)
      ? redirect('/drivers')
      : redirect('/admin')
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Invalid token or session creation failed' }),
      { status: 401 }
    )
  }
}
