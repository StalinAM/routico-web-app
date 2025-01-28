import {
  query,
  collection,
  getDocs,
  getDoc,
  where,
  doc,
  addDoc,
  setDoc
} from 'firebase/firestore'
import { db, auth } from '../../lib/firebase/client'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const fetchDrivers = async (uid) => {
  const driversList = []
  const q = query(collection(db, 'drivers'), where('uidAdmin', '==', uid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const driver = { ...doc.data(), docId: doc.id }
    driversList.push(driver)
  })
  return driversList
}

export const fetchRoutes = async (uid) => {
  const routesList = []
  const q = query(collection(db, 'routes'), where('uidAdmin', '==', uid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const route = { ...doc.data(), docId: doc.id }
    routesList.push(route)
  })
  return routesList
}

export const addDriver = async (driver) => {
  try {
    const driverRef = collection(db, 'drivers')
    await addDoc(driverRef, driver)
  } catch (e) {
    console.log(e)
  }
}

export const addRoute = async (route) => {
  try {
    const routeRef = collection(db, 'routes')
    await addDoc(routeRef, route)
  } catch (e) {
    console.log(e)
  }
}

export const registerDriver = async (name, email, password) => {
  try {
    const driverCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await updateProfile(driverCredentials.user, { displayName: name })
    return driverCredentials.user.uid
  } catch (e) {
    console.log(e)
  }
}

export const updateDriver = async (docId, driver) => {
  try {
    await setDoc(doc(db, 'drivers', docId), driver)
  } catch (e) {
    console.log(e)
  }
}
export const updateRoute = async (docId, route) => {
  try {
    await setDoc(doc(db, 'routes', docId), route)
  } catch (e) {
    console.log(e)
  }
}

export const getDriverRoutes = async (uidDriver) => {
  try {
    // 1. Obtener el documento del conductor desde 'drivers'
    const q = query(
      collection(db, 'drivers'),
      where('uidDriver', '==', uidDriver)
    )
    const querySnapshot = await getDocs(q)

    const driverData = querySnapshot.docs[0].data()

    // 2. Verificar si tiene rutas asignadas
    if (!driverData.routes || driverData.routes.length === 0) {
      console.log('No hay rutas asignadas')
      return []
    }

    // 3. Obtener las rutas desde la colección 'routes'
    const routesPromises = driverData.routes.map(async (routeId) => {
      const routeRef = doc(db, 'routes', routeId)
      const routeDoc = await getDoc(routeRef)
      return routeDoc.exists() ? { id: routeDoc.id, ...routeDoc.data() } : null
    })

    const routes = (await Promise.all(routesPromises)).filter(Boolean)

    return routes
  } catch (e) {
    console.error('Error obteniendo rutas:', e)
    return []
  }
}
