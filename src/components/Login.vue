<script setup>
</script>

<template>
  <div class="login-container">
    <h1>Авторизация</h1>
    <form class="login-form">
      <input type="text" id="username" placeholder="Логин" name="username" />
      <input type="password" id="password" placeholder="Пароль" name="password" />
      <button type="submit">Войти</button>
      <router-link  class="register-link" to="/registration">Зарегистрироваться</router-link>

    </form>
  </div>
</template>

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
</style>
