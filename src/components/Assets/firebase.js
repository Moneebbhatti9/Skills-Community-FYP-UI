import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyD3NTtvwAtidP11Tbpc_Oiku12TD1O21nw",
   authDomain: "developersblog-7a2f6.firebaseapp.com",
   projectId: "developersblog-7a2f6",
   storageBucket: "developersblog-7a2f6.appspot.com",
   messagingSenderId: "715396986428",
   appId: "1:715396986428:web:bd4c0505e679b2e820b539",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
