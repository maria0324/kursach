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
import initialData from '../../initialData.json';

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const patronymic = ref('');
const phone = ref('');
const errorMessage = ref('');

const registerUser = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  }

  const newUser = {
    id: Date.now().toString(), // Используем текущий timestamp как уникальный ID
    firstName: firstName.value,
    lastName: lastName.value,
    patronymic: patronymic.value,
    login: login.value,
    password: password.value,
    phoneNumber: phone.value,
  };

  initialData.Users[`user${newUser.id}`] = newUser;

  // Очистка формы после регистрации
  login.value = '';
  password.value = '';
  confirmPassword.value = '';
  firstName.value = '';
  lastName.value = '';
  patronymic.value = '';
  phone.value = '';
  errorMessage.value = '';
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
