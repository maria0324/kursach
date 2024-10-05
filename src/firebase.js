import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // добавлен импорт для работы с хранилищем

const firebaseConfig = {
    apiKey: "AIzaSyCvmC0Udk4D3jOqqmRdV5Alp7Rq0rvFSjo",
    authDomain: "vetclinic-6a468.firebaseapp.com",
    databaseURL: "https://vetclinic-6a468-default-rtdb.firebaseio.com",
    projectId: "vetclinic-6a468",
    storageBucket: "vetclinic-6a468.appspot.com",
    messagingSenderId: "1080872217369",
    appId: "1:1080872217369:web:bba4407269cffd65dc3388"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app); // получаем ссылку на хранилище

export { app, db, storage };