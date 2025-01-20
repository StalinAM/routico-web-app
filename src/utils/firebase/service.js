import { query, collection, getDocs, where, addDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase/client'

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

export const addDriver = async (driver) => {
  try {
    const driverRef = collection(db, 'drivers')
    await addDoc(driverRef, driver)
  } catch (e) {
    console.log(e)
  }
}
