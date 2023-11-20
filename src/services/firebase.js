import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCzQNPQBmbSR7kyWEFoOyO9rFv6cypwjgw',
  authDomain: 'moore-bf94c.firebaseapp.com',
  projectId: 'moore-bf94c',
  storageBucket: 'moore-bf94c.appspot.com',
  messagingSenderId: '393131656874',
  appId: '1:393131656874:web:0cfe36085e12370fd7f2d3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
