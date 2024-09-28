<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="profile-info">
        <img class="profile-image" src="../../public/img/profile-icon.png" alt="Profile Icon">
        <div class="profile-name">
          <h3>{{ userFullName }}</h3>
        </div>
      </div>
      <nav class="profile-nav">
        <router-link to="/profile">Мои питомцы</router-link>
        <router-link to="/profile/my-records">Мои записи</router-link>
        <router-link to="/profile/edit">Редактировать данные</router-link>
      </nav>
    </header>
    <div class="appointment-form">
      <h2>Запись на прием</h2>
      <form @submit.prevent="makeAppointment">
        <input v-model="appointmentDate" type="datetime-local" placeholder="Дата и время" required>

        <select v-model="selectedPet" required>
          <option value="" disabled>Выберите питомца</option>
          <option v-for="pet in pets" :key="pet.id" :value="pet.id">{{ pet.name }}</option>
        </select>

        <select v-model="selectedDoctor" required>
          <option value="" disabled>Выберите врача</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.lastname }} {{ doctor.firstname }}</option>
        </select>

        <select v-model="selectedService" required>
          <option value="" disabled>Выберите услугу</option>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
        </select>

        <button type="submit">Записаться</button>
      </form>
    </div>

    <section class="my-records-section">
      <div class="my-record-card-container" v-for="record in records" :key="record.id">
        <div class="my-record-card">
          <p>Питомец: {{ getPetName(record.petId) }}</p>
          <p>Врач: {{ getDoctorName(record.doctorId) }}</p>
          <p>Время: {{ record.timestamp }}</p>
          <p>Услуга: {{ getServiceName(record.serviceId) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDatabase, ref as dbRef, push, onValue } from 'firebase/database';

const db = getDatabase();
const userId = localStorage.getItem('userId');

const pets = ref([]);
const doctors = ref([]);
const services = ref([]);
const records = ref([]);

const userFullName = ref(''); // Добавляем переменную для хранения полного имени пользователя
const selectedPet = ref('');
const selectedDoctor = ref('');
const selectedService = ref('');
const appointmentDate = ref('');

onMounted(() => {
  // Получение имени и фамилии пользователя
  const userRef = dbRef(db, 'Users/' + userId);
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    if (userData) {
      userFullName.value = `${userData.firstName} ${userData.lastName}`;
    }
  });

  fetchPets();
  fetchDoctors();
  fetchServices();
  fetchRecords();
});

const fetchPets = () => {
  const petRef = dbRef(db, 'Pets');
  onValue(petRef, (snapshot) => {
    const petsData = snapshot.val();
    pets.value = petsData ? Object.keys(petsData).map(key => ({ id: key, ...petsData[key] })).filter(pet => pet.userId === userId) : [];
  });
};

const fetchDoctors = () => {
  const doctorRef = dbRef(db, 'Doctors');
  onValue(doctorRef, (snapshot) => {
    const doctorsData = snapshot.val();
    doctors.value = doctorsData ? Object.keys(doctorsData).map(key => ({ id: key, ...doctorsData[key] })) : [];
  });
};

const fetchServices = () => {
  const serviceRef = dbRef(db, 'Services');
  onValue(serviceRef, (snapshot) => {
    const servicesData = snapshot.val();
    services.value = servicesData ? Object.keys(servicesData).map(key => ({ id: key, ...servicesData[key] })) : [];
  });
};

const fetchRecords = () => {
  const recordRef = dbRef(db, 'Records');
  onValue(recordRef, (snapshot) => {
    const recordsData = snapshot.val();
    records.value = recordsData ? Object.keys(recordsData).map(key => ({ id: key, ...recordsData[key] })).filter(record => record.userId === userId) : [];
  });
};

const makeAppointment = async () => {
  if (!selectedPet.value || !selectedDoctor.value || !selectedService.value || !appointmentDate.value) {
    return;
  }

  const newRecord = {
    doctorId: selectedDoctor.value,
    petId: selectedPet.value,
    serviceId: selectedService.value,
    timestamp: appointmentDate.value,
    userId
  };

  const recordRef = dbRef(db, 'Records');
  await push(recordRef, newRecord);

  selectedPet.value = '';
  selectedDoctor.value = '';
  selectedService.value = '';
  appointmentDate.value = '';
};

const getPetName = (petId) => {
  const pet = pets.value.find(p => p.id === petId);
  return pet ? pet.name : 'Не найдено';
};

const getDoctorName = (doctorId) => {
  const doctor = doctors.value.find(d => d.id === doctorId);
  return doctor ? `${doctor.lastname} ${doctor.firstname}` : 'Не найдено';
};

const getServiceName = (serviceId) => {
  const service = services.value.find(s => s.id === serviceId);
  return service ? service.name : 'Не найдено';
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-left: 470px;
  margin-top: -400px;
}

.my-record-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 400px;
  height: 170px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.appointment-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-top: 25px;
  margin-right: 1495px;
}

.appointment-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.appointment-form input,
.appointment-form select {
  width: calc(100% - 20px);
  margin: 10px 10px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
  border-radius: 4px;
}

.appointment-form button {
  display: block;
  width: calc(100% - 20px);
  margin: 0px 10px;
  padding: 10px;
  background-color: #FF8C00;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.appointment-form button:hover {
  background-color: #ffa500;

}

.appointment-form input:focus,
.appointment-form select:focus {
  outline: none;
}
</style>
