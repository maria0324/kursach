<template>
  <div class="login-container">
    <h1>Авторизация</h1>
    <form class="login-form" @submit.prevent="loginUser">
      <input v-model="username" type="text" id="username" placeholder="Логин" name="username" required />
      <input v-model="password" type="password" id="password" placeholder="Пароль" name="password" required />
      <button type="submit">Войти</button>
      <router-link class="register-link" to="/registration">Зарегистрироваться</router-link>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, get, child } from 'firebase/database';

// Firebase configuration
const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing or invalid');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reactive variables
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

// Login function
const loginUser = async () => {
  try {
    const dbReference = dbRef(db);
    const snapshot = await get(child(dbReference, 'Users'));

    if (snapshot.exists()) {
      const users = snapshot.val();
      const user = Object.values(users).find(
          user => user.login === username.value && user.password === password.value
      );

      if (user) {
        // Generate a simple token for the session (for demo purposes)
        const token = btoa(`${username.value}:${password.value}`);
        localStorage.setItem('token', `Bearer ${token}`);

        // Redirect based on user role
        if (user.role === '0') {
          router.push({ path: '/admin' });
        } else if (user.role === '1') {
          router.push({ path: '/profile' });
        } else {
          errorMessage.value = 'Неизвестная роль пользователя';
        }
      } else {
        errorMessage.value = 'Неверный логин или пароль';
      }
    } else {
      errorMessage.value = 'Нет зарегистрированных пользователей';
    }
  } catch (error) {
    console.error('Ошибка при авторизации: ', error);
    errorMessage.value = 'Ошибка при авторизации!';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
  text-align: center;
}
.login-container h1 {
  font-size: 48px;
  margin-bottom: 20px;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-form input {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #FFA500;
}
.login-form button {
  width: 150px;
  padding: 10px;
  font-size: 24px;
  background-color: #3E3E3E;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}
.register-link {
  margin-top: 10px;
  font-size: 16px;
  color: #FFA500;
  text-decoration: none;
}
.error-message {
  color: red;
  font-size: 18px;
}
</style>
