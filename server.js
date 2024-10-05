const express = require('express');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, child } = require('firebase/database');
const bodyParser = require('body-parser');
const cors = require('cors');  // Для разрешения запросов с клиента

const firebaseConfig = {
    apiKey: "AIzaSyCvmC0Udk4D3jOqqmRdV5Alp7Rq0rvFSjo",
    authDomain: "vetclinic-6a468.firebaseapp.com",
    databaseURL: "https://vetclinic-6a468-default-rtdb.firebaseio.com",
    projectId: "vetclinic-6a468",
    storageBucket: "vetclinic-6a468.appspot.com",
    messagingSenderId: "1080872217369",
    appId: "1:1080872217369:web:bba4407269cffd65dc3388"
};

const app = express();
const port = 8080;

initializeApp(firebaseConfig);
const db = getDatabase();

app.use(cors());  // Для разрешения CORS-запросов
app.use(bodyParser.json());  // Для обработки JSON-запросов

// Маршрут для авторизации
app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const dbReference = ref(db);
        const snapshot = await get(child(dbReference, 'Users'));

        if (snapshot.exists()) {
            const users = snapshot.val();
            const user = Object.values(users).find(
                user => user.login === login && user.password === password
            );

            if (user) {
                const token = Buffer.from(`${login}:${password}`).toString('base64');
                res.status(200).json({
                    token: `Bearer ${token}`,
                    userId: user.id,
                    role: user.role
                });
            } else {
                res.status(401).json({ error: 'Неверный логин или пароль' });
            }
        } else {
            res.status(404).json({ error: 'Нет зарегистрированных пользователей' });
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Маршрут для получения списка врачей
app.get('/doctors', async (req, res) => {
    const doctorRef = ref(db, 'Doctors');
    const snapshot = await get(doctorRef);

    if (snapshot.exists()) {
        const doctors = snapshot.val();
        res.json(doctors);
    } else {
        res.status(404).send('No data available');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
