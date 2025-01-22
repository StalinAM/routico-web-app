import { create } from 'zustand'
import { fetchRoutes } from '../utils/firebase/service'

export const useRouteStore = create((set, get) => ({
  routes: [],
  loading: true,
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  getFilteredRoutes: () => {
    const { routes, searchTerm } = get()
    if (!searchTerm) return routes
    return routes.filter((route) => {
      return route.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  },
  error: null,
  fetchRoutes: async (uid) => {
    set({ loading: true, error: null })
    try {
      const routesList = await fetchDrivers(uid)
      set({ routes: routesList, loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  }
}))
