<script setup>
</script>

<template>
  <div class="registration-container">
    <h1>Регистрация</h1>
    <form class="registration-form">
      <label for="login">Логин</label>
      <input type="text" id="login" name="login" />

      <label for="password">Пароль</label>
      <input type="password" id="password" name="password" />

      <label for="confirm-password">Пароль</label>
      <input type="password" id="confirm-password" name="confirm-password" />

      <label for="first-name">Имя</label>
      <input type="text" id="first-name" name="first-name" />

      <label for="last-name">Фамилия</label>
      <input type="text" id="last-name" name="last-name" />

      <label for="patronymic">Отчество</label>
      <input type="text" id="patronymic" name="patronymic" />

      <label for="phone">Номер телефона</label>
      <input type="text" id="phone" name="phone" />

      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
.registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
  text-align: center;
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
  border-bottom: 2px solid #FFA500;
}

.registration-form button {
  width: 300px;
  padding: 10px;
  font-size: 24px;
  background-color: #3E3E3E;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}
</style>
