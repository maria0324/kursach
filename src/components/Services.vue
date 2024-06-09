<template>
  <div class="services-container">
    <h1 class="title-services">Услуги и цены</h1>
    <div class="services-section" v-if="services.length > 0">
      <h2>Список предоставляемых услуг</h2>
      <ul>
        <li v-for="service in services" :key="service.id">
          {{ service.name }}: <span>{{ service.price }} ₽</span>
        </li>
      </ul>
    </div>
    <div class="services-section" v-else>
      <p>Загрузка услуг...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, get } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing or invalid');
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

onMounted(() => {
  fetchServices();
});
</script>

<style scoped>
.services-container {
  padding: 50px 20px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

.title-services {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
}

.services-section {
  margin: 0 auto;
  max-width: 800px;
}

.services-section h2 {
  font-size: 32px;
  color: black;
  border-bottom: 2px solid #F7941E;
  display: inline-block;
  margin-bottom: 15px;
}

.services-section ul {
  list-style: none;
  padding: 0;
}

.services-section ul li {
  font-size: 32px;
  margin-bottom: 10px;
}

.services-section ul li span {
  font-weight: bold;
}
</style>
