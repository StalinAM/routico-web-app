import { create } from 'zustand'
import { fetchDrivers } from '../utils/firebase/service'

export const useAuthStore = create((set, get) => ({
  drivers: [],
  driver: {},
  openModal: false,
  openModalRoutes: false,
  loading: true,
  searchTerm: '',
  setOpenModalRoutes: (value) => set({ openModalRoutes: value }),
  setOpenModal: (value) => set({ openModal: value }),
  setDriver: (driver) => set({ driver }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  getFilteredDrivers: () => {
    const { drivers, searchTerm } = get()
    if (!searchTerm) return drivers
    return drivers.filter((driver) => {
      const fullName = `${driver.name} ${driver.lastName}`.toLowerCase()
      return fullName.includes(searchTerm.toLowerCase())
    })
  },
  error: null,
  fetchdrivers: async (uid) => {
    set({ loading: true, error: null })
    try {
      const driversList = await fetchDrivers(uid)
      set({ drivers: driversList, loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  }
}))
