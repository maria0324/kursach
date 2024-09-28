<template>
  <div class="registration-container">
    <h1>Регистрация</h1>
    <form class="registration-form" @submit.prevent="registerUser">
      <input v-model="login" type="text" id="login" placeholder="Логин" name="login" required />
      <input v-model="password" type="password" id="password" placeholder="Пароль" name="password" required />
      <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Подтвердите пароль" name="confirm-password" required />
      <input v-model="firstName" type="text" id="first-name" placeholder="Имя" name="first-name" required />
      <input v-model="lastName" type="text" id="last-name" placeholder="Фамилия" name="last-name" required />
      <input v-model="patronymic" type="text" id="patronymic" placeholder="Отчество" name="patronymic" />
      <input v-model="phone" type="text" id="phone" placeholder="Номер телефона" name="phone" required />
      <button type="submit">Зарегистрироваться</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set } from "firebase/database";

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing or invalid');
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const patronymic = ref('');
const phone = ref('');
const errorMessage = ref('');

const registerUser = () => {
  // Проверка логина
  const loginRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (!loginRegex.test(login.value)) {
    errorMessage.value = 'Логин должен содержать заглавную букву, цифру и быть не короче 5 символов';
    return;
  }

  // Проверка пароля (только латинские буквы)
  const passwordRegex = /^[A-Za-z]+$/;
  if (!passwordRegex.test(password.value)) {
    errorMessage.value = 'Пароль должен содержать только латинские буквы';
    return;
  }

  // Проверка совпадения паролей
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  }

  // Проверка номера телефона (только цифры)
  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(phone.value)) {
    errorMessage.value = 'Номер телефона должен содержать только цифры';
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    firstName: firstName.value,
    lastName: lastName.value,
    patronymic: patronymic.value,
    login: login.value,
    password: password.value,
    phoneNumber: phone.value,
    role: '1'  // Устанавливаем значение роли по умолчанию
  };

  const userRef = dbRef(db, 'Users/' + newUser.id);
  set(userRef, newUser)
      .then(() => {
        login.value = '';
        password.value = '';
        confirmPassword.value = '';
        firstName.value = '';
        lastName.value = '';
        patronymic.value = '';
        phone.value = '';
        errorMessage.value = '';
        alert('Пользователь зарегистрирован успешно!');
      })
      .catch((error) => {
        console.error('Ошибка при регистрации пользователя: ', error);
        errorMessage.value = 'Ошибка при регистрации пользователя!';
      });
};
</script>

<style scoped>
.registration-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 140px);
  text-align: center;
  padding-bottom: 70px;
}

.registration-container h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.registration-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.registration-form label {
  font-size: 24px;
  margin-bottom: 5px;
}

.registration-form input {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
}

.registration-form button {
  width: 300px;
  padding: 10px;
  font-size: 24px;
  background-color: #3e3e3e;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.error-message {
  color: red;
  font-size: 18px;
}
</style>
