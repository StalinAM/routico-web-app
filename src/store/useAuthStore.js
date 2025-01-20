import { create } from 'zustand'
import { fetchDrivers } from '../utils/firebase/service'

export const useAuthStore = create((set) => ({
  drivers: [],
  loading: false,
  error: null,
  fetchdrivers: async (uid) => {
    set({ loading: true, error: null })
    const driversList = await fetchDrivers(uid)
    set({ drivers: driversList, loading: false })
  }
}))
