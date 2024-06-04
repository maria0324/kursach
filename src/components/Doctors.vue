<template>
  <div class="doctors-container">
    <h1 class="title-doctor">Наши врачи</h1>
    <div class="search-bar">
      <label for="speciality-select">Поиск врача по специальности</label>
      <select id="speciality-select" v-model="selectedSpeciality">
        <option value="">Все специальности</option>
        <option v-for="speciality in specialities" :key="speciality" :value="speciality">{{ speciality }}</option>
      </select>
    </div>
    <div class="doctors-list">
      <div class="doctor-card" v-for="doctor in filteredDoctors" :key="doctor.id">
        <img :src="doctor.photo" :alt="doctor.name">
        <h2>{{ doctor.name }}</h2>
        <p>{{ doctor.speciality }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

const db = getDatabase();

const doctors = ref([]);
const specialities = ref([]);
const selectedSpeciality = ref('');

onMounted(() => {
  const doctorRef = dbRef(db, 'Doctors');
  onValue(doctorRef, (snapshot) => {
    const data = snapshot.val();
    doctors.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    // Update specialities list
    specialities.value = Array.from(new Set(doctors.value.map(doctor => doctor.speciality)));
  });
});

// Filtering doctors based on selected speciality
const filteredDoctors = ref([]);
watch(selectedSpeciality, () => {
  if (!selectedSpeciality.value) {
    filteredDoctors.value = doctors.value;
  } else {
    filteredDoctors.value = doctors.value.filter(doctor => doctor.speciality === selectedSpeciality.value);
  }
});
</script>

<style scoped>
.doctors-container {
  text-align: center;
  padding: 50px 20px;
}

.title-doctor {
  font-size: 48px;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 40px;
}

.search-bar label {
  font-size: 20px;
  margin-right: 10px;
}

.search-bar select {
  font-size: 18px;
  padding: 5px 10px;
  border: 1px solid #F7941E;
  border-radius: 15px;
}

.doctors-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.doctor-card {
  width: 250px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  text-align: center;
}

.doctor-card img {
  width: 100%;
  border-radius: 15px;
}

.doctor-card h2 {
  font-size: 20px;
  margin: 10px 0;
}

.doctor-card p {
  font-size: 16px;
  color: #D9B8A1;
}
</style>
