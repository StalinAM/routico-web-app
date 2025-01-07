import type { APIRoute } from 'astro'
import { auth } from '../../../lib/firebase/server'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const POST: APIRoute = async ({ redirect, request, cookies }) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const provider = formData.get('provider')?.toString()

  if (!email || !password) {
    return new Response('Email and password are required', { status: 400 })
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user

  return redirect('/admin')
}
