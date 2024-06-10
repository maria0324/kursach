import { createApp } from 'vue';
import App from "@/App.vue";
import router from './router';
import store from './stores';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCvmC0Udk4D3jOqqmRdV5Alp7Rq0rvFSjo",
    authDomain: "vetclinic-6a468.firebaseapp.com",
    databaseURL: "https://vetclinic-6a468-default-rtdb.firebaseio.com",
    projectId: "vetclinic-6a468",
    storageBucket: "vetclinic-6a468.appspot.com",
    messagingSenderId: "1080872217369",
    appId: "1:1080872217369:web:bba4407269cffd65dc3388"
};

// Инициализация Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

createApp(App).use(store).use(router).mount('#app');