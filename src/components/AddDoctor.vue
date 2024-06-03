<script setup lang="ts">

</script>

<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="profile-info">
        <img class="profile-image" src="../../public/img/profile-icon.png" alt="Profile Icon">
        <div class="profile-name">
          <h3>Администратор</h3>
        </div>
      </div>
      <nav class="profile-nav">
        <router-link to="/admin">Врачи</router-link>
        <router-link to="/admin/records">Записи</router-link>
        <router-link to="/admin/services">Услуги</router-link>
      </nav>
    </header>

  </div>
  <div class="registration-container">
    <h1>Добавление врача</h1>
    <form class="registration-form" >
      <input  type="text" id="lastname" placeholder="Фамилия врача" name="lastname" required />
      <input  type="text" id="firstname" placeholder="Имя врача" name="firstname" required />
      <input  type="text" id="patronymic" placeholder="Отчество врача" name="patronymic" required />
      <input  type="text" id="speciality" placeholder="Специальность  врача" name="speciality" required />
      <input  type="text" id="photo" placeholder="Фотография врача" name="photo" required />
      <button type="submit">Добавить</button>

    </form>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  overflow-x: hidden;
}



.profile-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}

.profile-info {
  display: flex;
  align-items: center;
  margin-left: 100px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-name {
  font-size: 24px;
}

.profile-nav {
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  flex-wrap: wrap;
}

.profile-nav a {
  margin: 10px;
  text-decoration: none;
  color: #FF8C00;
  font-weight: bold;
  font-size: 20px;
}

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