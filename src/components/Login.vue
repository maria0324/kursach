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
import initialData from '../../initialData.json';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const loginUser = () => {
  const user = Object.values(initialData.Users).find(
      user => user.login === username.value && user.password === password.value
  );

  if (user) {
    // Успешная авторизация, перенаправление на страницу профиля
    router.push({ path: '/profile' });
  } else {
    errorMessage.value = 'Неверный логин или пароль';
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
.login-form label {
  font-size: 24px;
  margin-bottom: 5px;
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