import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCum_b7-XpN8SRgU_glE442LW-a7Sh6ldA",
  authDomain: "apis-b86cc.firebaseapp.com",
  projectId: "apis-b86cc",
  storageBucket: "apis-b86cc.firebasestorage.app",
  messagingSenderId: "124529709594",
  appId: "1:124529709594:web:3d745ac45b5c7cce9db7a3",
  measurementId: "G-MFF2JCMXC1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Servicios de Firebase
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app
