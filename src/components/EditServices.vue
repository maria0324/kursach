<template>
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

// Initialize Firebase
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
</style>
