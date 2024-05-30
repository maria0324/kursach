<script setup>
</script>

<template>
  <div class="registration-container">
    <h1>Регистрация</h1>
    <form class="registration-form">

      <input type="text" id="login" placeholder="Логин" name="login" />
      <input type="password" id="password" placeholder="Пароль" name="password" />
      <input type="password" id="confirm-password" placeholder="Пароль" name="confirm-password" />
      <input type="text" id="first-name" placeholder="Имя" name="first-name" />
      <input type="text" id="last-name" placeholder="Фамилия" name="last-name" />
      <input type="text" id="patronymic" placeholder="Отчество" name="patronymic" />
      <input type="text" id="phone" placeholder="Номер телефона" name="phone" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

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
