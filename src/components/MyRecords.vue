<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="profile-info">
        <img class="profile-image" src="../../public/img/profile-icon.png" alt="Profile Icon">
        <div class="profile-name">
          <h3>Имя Фамилия</h3>
        </div>
      </div>
      <nav class="profile-nav">
        <router-link to="/profile">Мои питомцы</router-link>
        <router-link to="/profile/my-records">Мои записи</router-link>
        <router-link to="/profile/edit">Редактировать данные</router-link>
      </nav>
    </header>
    <section class="my-records-section">
      <div class="my-record-card-container" v-for="pet in pets" :key="pet.id">
        <div class="my-record-card">
          <p>Питомец: {{ pet.name }}</p>
          <p>Врач: {{ pet.type }}</p>
          <p>Время: {{ pet.breed }}</p>
          <p>Услуга:</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pets = ref([
  { id: 1, name: 'Кокос', type: 'Пес', breed: 'Алабай' },
  { id: 2, name: 'Кокос', type: 'Пес', breed: 'Алабай' },
  { id: 3, name: 'Кокос', type: 'Пес', breed: 'Алабай' }
]);

const deletePet = (id) => {
  pets.value = pets.value.filter(pet => pet.id !== id);
};
</script>

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

.my-records-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.my-record-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 350px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


.my-record-card-container {
  display: flex;
  justify-content: center;
}


.my-record-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 450px;
  height: 170px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}


.my-record-card button {
  background-color: #FF8C00;
  font-size: 16px;
  color: white;
  width: 200px;
  border: none;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}



.my-record-card p {
  margin: 20px 45px;

}


</style>
