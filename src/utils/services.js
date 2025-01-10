import {
  getAuth,
  inMemoryPersistence,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { app } from '../lib/firebase/client'

const auth = getAuth(app)
// This will prevent the browser from storing session data
auth.setPersistence(inMemoryPersistence)

export const iniciar = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
      return
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const idToken = await userCredential.user.getIdToken()
    console.log(idToken)

    const response = await fetch('/api/auth/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })

    if (response.redirected) {
      window.location.assign(response.url)
    }
  })
}
