import { create } from 'zustand'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../lib/firebase/client'

export const useAuthStore = create((set) => ({
  drivers: [],
  loading: false,
  error: null,

  fetchdrivers: async (uid) => {
    set({ loading: true, error: null })
    const driversList = []
    const q = query(collection(db, 'drivers'), where('uidAdmin', '==', uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const driver = { ...doc.data() }
      driver.docId = doc.id
      driversList.push(driver)
    })
    set({ drivers: driversList, loading: false })
  }
}))
