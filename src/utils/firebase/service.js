import {
  query,
  collection,
  getDocs,
  getDoc,
  where,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db, auth } from '../../lib/firebase/client'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0] // Formato "YYYY-MM-DD"
}
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
    const doc = await addDoc(routeRef, route)
    await updateDoc(doc, { docId: doc.id })
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

export const getDriverRoutesToday = async (uidDriver) => {
  try {
    const todayDate = getTodayDate() // Fecha actual

    const routesStatusRef = collection(db, 'routes-status')
    const statusQuery = query(
      routesStatusRef,
      where('driverId', '==', uidDriver),
      where('date', '==', todayDate)
    )

    const statusSnapshot = await getDocs(statusQuery)

    if (statusSnapshot.empty) {
      console.log('No hay rutas activas para hoy.')
      return []
    }
    const routeStatusList = statusSnapshot.docs.map((doc) => ({
      statusId: doc.id, // 🔥 Guardamos el ID del documento en 'routes-status'
      ...doc.data()
    }))

    const activeRouteIds = statusSnapshot.docs.map((doc) => doc.data().routeId)

    // 4. Obtener los detalles de las rutas activas desde 'routes'
    const routesPromises = activeRouteIds.map(async (routeId) => {
      const routeRef = doc(db, 'routes', routeId)
      const routeDoc = await getDoc(routeRef)
      return routeDoc.exists() ? { id: routeDoc.id, ...routeDoc.data() } : null
    })

    const routes = (await Promise.all(routesPromises)).filter(Boolean)

    console.log(routes)

    return { routes, routeStatusList }
  } catch (e) {
    console.error('Error obteniendo rutas del conductor para hoy:', e)
    return {}
  }
}

export const addOrUpdateRouteStatus = async (routeStatusData) => {
  try {
    const routeStatusRef = collection(db, 'routes-status')
    const todayDate = getTodayDate() // Fecha del día actual

    const { routeId, uidDriver, status, comments, details } = routeStatusData

    // Verificar si ya existe un documento con el mismo routeId, driverId y fecha actual
    const q = query(
      routeStatusRef,
      where('routeId', '==', routeId),
      where('driverId', '==', uidDriver),
      where('date', '==', todayDate)
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Si existe, actualizar el documento existente
      const existingDocRef = querySnapshot.docs[0].ref
      await updateDoc(existingDocRef, { status, comments, details })

      return existingDocRef.id // Retornar el ID del documento actualizado
    } else {
      // Si no existe, agregar un nuevo documento con la fecha actual
      const newDocRef = await addDoc(routeStatusRef, {
        ...routeStatusData,
        routeId,
        details,
        uidDriver,
        status: status || 'Pendiente', // Estado por defecto
        comments: comments || '',
        date: todayDate // Guardamos solo la fecha
      })

      // Actualizar para incluir el docId
      await updateDoc(newDocRef, { docId: newDocRef.id })
    }
  } catch (e) {
    console.error('Error al agregar/actualizar el estado de la ruta:', e)
  }
}

export const updateStatusDriver = async (statusId, formData) => {
  try {
    const routeStatusRef = doc(db, 'routes-status', statusId)
    await updateDoc(routeStatusRef, formData) // Solo actualiza los campos existentes
  } catch (e) {
    console.error('Error al actualizar el estado del conductor:', e)
  }
}

export const deleteRouteStatus = async (driverId, routeId, date) => {
  try {
    const routesStatusRef = collection(db, 'routes-status')
    const q = query(
      routesStatusRef,
      where('driverId', '==', driverId),
      where('routeId', '==', routeId),
      where('date', '==', date)
    )

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      snapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'routes-status', docSnapshot.id))
      })
      console.log(`Ruta ${routeId} eliminada de routes-status`)
    }
  } catch (error) {
    console.error('Error al eliminar route-status:', error)
  }
}
export const fetchStatus = async (uid) => {
  const statusList = []
  const q = query(collection(db, 'routes-status'), where('uidAdmin', '==', uid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const statu = { ...doc.data(), docId: doc.id }
    statusList.push(statu)
  })
  return statusList
}
