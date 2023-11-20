import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';

export const login = async (username, password) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return 'User not found';
    }
    const userData = userSnapshot.docs[0].data();
    const id = userSnapshot.docs[0].id;
    const email = userData.email;
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('user', JSON.stringify({ ...userData, id }));
    return 'success';
  } catch (error) {
    console.log('Error logging in:', error);
    return error.message;
  }
};

export const register = async (name, username, email, password, address) => {
  try {
    const usernameCheck = collection(db, 'users');
    const usernameQuery = await getDocs(
      query(usernameCheck, where('username', '==', username)),
    );

    if (!usernameQuery.empty) {
      return 'Username is already taken';
    }

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const userDocRef = await addDoc(collection(db, 'users'), {
      name,
      username,
      email,
      address,
    });
    const userData = {
      id: userDocRef.id,
      name,
      username,
      email,
      address,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    return 'success';
  } catch (error) {
    console.error('Error registering user:', error);
    return error.message;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.clear();
    return 'success';
  } catch (error) {
    console.log('Error logging out:', error);
    return 'failed';
  }
};

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(user);
      } else {
        reject('User not authenticated');
      }
    });
  });
};
