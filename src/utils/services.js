import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { auth, db } from '../lib/firebase/firebase'
import { useAuthStore } from '../store/useAuthStore'

export const registerUser = async (
  name,
  email,
  password,
  navigate,
  setError
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await updateProfile(userCredential.user, {
      displayName: name
    })
    navigate('/dashboard/overview')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use')
      setError('El correo electrónico ya está registrado.')
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    console.error('Error en loginUser:', error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.log(error)
  }
}
export const insertNewTransaction = async (transaction) => {
  try {
    const transactionsRef = collection(db, 'transactions')
    await addDoc(transactionsRef, transaction)
  } catch (e) {
    console.log(e)
  }
}
export const fetchTransactions = async (uid) => {
  const transactions = []
  const q = query(collection(db, 'transactions'), where('uid', '==', uid))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    const transaction = { ...doc.data() }
    transaction.docId = doc.id

    transactions.push(transaction)
  })
  return transactions
}

export const deleteTransaction = async (docId) => {
  await deleteDoc(doc(db, 'transactions', docId))
}
export const updateTransaction = async (docId, transaction) => {
  const res = await setDoc(doc(db, 'transactions', docId), transaction)
}
