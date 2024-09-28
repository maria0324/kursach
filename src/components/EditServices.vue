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
  <div class="service-container">
    <h2>Создание и редактирование услуг</h2>
    <form @submit.prevent="addService" class="service-form">
      <div class="input-group">
        <input v-model="newServiceName" type="text" placeholder="Услуга" required />
        <input v-model="newServicePrice" type="number" placeholder="Цена" required />
      </div>
      <button type="submit">Добавить</button>
    </form>

    <form @submit.prevent="updateService" class="service-form">
      <div class="input-group">
        <select v-model="selectedServiceId">
          <option  v-for="service in services" :key="service.id"  :value="service.id" >
            {{ service.name }}
          </option>
        </select>
        <input v-model="selectedServicePrice" type="number" placeholder="Цена" required />
      </div>
      <button type="submit">Изменить</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, get, set, update } from 'firebase/database';

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing or invalid');
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const newServiceName = ref('');
const newServicePrice = ref(0);
const selectedServiceId = ref('');
const selectedServicePrice = ref(0);
const services = ref([]);

const fetchServices = async () => {
  try {
    const servicesRef = dbRef(db, 'Services');
    const snapshot = await get(servicesRef);
    if (snapshot.exists()) {
      services.value = Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...value
      }));
    }
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

const addService = async () => {
  try {
    const newServiceId = `service${Date.now()}`;
    const newService = {
      id: newServiceId,
      name: newServiceName.value,
      price: newServicePrice.value
    };
    const newServiceRef = dbRef(db, 'Services/' + newServiceId);
    await set(newServiceRef, newService);
    fetchServices();
    newServiceName.value = '';
    newServicePrice.value = 0;
  } catch (error) {
    console.error('Error adding service:', error);
  }
};

const updateService = async () => {
  try {
    const serviceRef = dbRef(db, 'Services/' + selectedServiceId.value);
    await update(serviceRef, { price: selectedServicePrice.value });
    fetchServices();
  } catch (error) {
    console.error('Error updating service:', error);
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.service-container {
  text-align: center;
}

.service-form {
  margin: 20px 0;
}

.input-group {

  justify-content: space-between;
  margin-bottom: 20px;
}

.input-group input[type="text"],
.input-group select {
  width: 300px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
}

.input-group input[type="number"] {
  width: 100px;
  padding: 10px;
  font-size: 20px;
  border-radius: 20px;
  border: 2px solid #ffa500;
  margin-left: 20px;
}

.service-form button {
  margin: 5px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3e3e3e;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  display: block;
}
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
.records-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.record-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 450px;
  height: 340px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}
.record-card button {
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
.record-card p {
  margin: 20px 45px;
}
.error-message {
  color: red;
  font-size: 18px;
}
</style>
