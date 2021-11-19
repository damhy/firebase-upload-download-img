import { initializeApp } from '@firebase/app';
import { getStorage } from "firebase/storage";
import 'firebase/storage';
 
  const firebaseConfig = {
    apiKey: "AIzaSyBu_PRqc_jB4eoKHW6XTYaKF65VZ8iauZ4",
    authDomain: "frb-uplo.firebaseapp.com",
    projectId: "frb-uplo",
    storageBucket: "frb-uplo.appspot.com",
    messagingSenderId: "1041236939497",
    appId: "1:1041236939497:web:0d17b39769c6816d859678",
    measurementId: "G-385K97SNPB"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  export {firebaseApp,storage}