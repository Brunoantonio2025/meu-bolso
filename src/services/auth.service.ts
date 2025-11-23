import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const authService = {
  async cadastrar(email: string, senha: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  },

  async entrar(email: string, senha: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  },

  async sair() {
    await signOut(auth);
  },

  async obterUsuario() {
    return new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      callback(user);
    });
    return unsubscribe;
  },
};
