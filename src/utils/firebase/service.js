import {
  query,
  collection,
  getDocs,
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
    await setDoc(doc(db, 'drivers', docId), route)
  } catch (e) {
    console.log(e)
  }
}
