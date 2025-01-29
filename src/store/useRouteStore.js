import { create } from 'zustand'
import { fetchRoutes } from '../utils/firebase/service'

export const useRouteStore = create((set, get) => ({
  routes: [],
  route: {},
  openModal: false,
  loading: true,
  searchTerm: '',
  setRoutes: (routes) => set({ routes }),
  setOpenModal: (value) => set({ openModal: value }),
  setRoute: (route) => set({ route }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  getFilteredRoutes: () => {
    const { routes, searchTerm } = get()
    if (!searchTerm) return routes
    return routes.filter((route) => {
      return route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
    })
  },
  error: null,
  fetchRoutes: async (uid) => {
    set({ loading: true, error: null })
    try {
      const routesList = await fetchRoutes(uid)
      set({ routes: routesList, loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  }
}))
