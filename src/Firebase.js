import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBEd5PIbDSQEfyyaimc7Hw0x8SAG02eQo8",
  authDomain: "comision-47140-fba36.firebaseapp.com",
  projectId: "comision-47140-fba36",
  storageBucket: "comision-47140-fba36.appspot.com",
  messagingSenderId: "1013720983782",
  appId: "1:1013720983782:web:7e35120883da5af7693327"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);