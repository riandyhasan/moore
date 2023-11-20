import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const getUserData = async username => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return null;
    }
    const userData = userSnapshot.docs[0].data();
    const id = userSnapshot.docs[0].id;
    localStorage.setItem('user', JSON.stringify({ ...userData, id }));

    return userData;
  } catch (error) {
    console.log('Error logging in:', error);
    return null;
  }
};

export const editUserData = async (id, newData) => {
  try {
    const usersRef = doc(db, 'users', id);
    await updateDoc(usersRef, newData);

    localStorage.setItem('user', JSON.stringify({ ...newData, id }));

    return newData;
  } catch (error) {
    console.log('Error editing user data:', error);
    return null;
  }
};
