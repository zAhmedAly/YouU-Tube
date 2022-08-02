import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1Cq8xGnQvoELXWhUpFKE6IQn3fzT9oVg",
  authDomain: "tubeapp-f5211.firebaseapp.com",
  projectId: "tubeapp-f5211",
  storageBucket: "tubeapp-f5211.appspot.com",
  messagingSenderId: "968801715958",
  appId: "1:968801715958:web:eee0c534a613f98acd8ed7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
