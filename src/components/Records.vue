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

  <!-- Добавим выбор даты -->
  <div class="filter-section">
    <label for="dateFilter">Выберите дату:</label>
    <input type="date" v-model="selectedDate" @change="filterRecordsByDate">
  </div>

  <section class="records-section">
    <div
        v-for="record in filteredRecords"
        :key="record.id"
        class="record-card-container"
        :class="{ 'past-record': isPast(record.timestamp) }"
    >
      <div class="record-card">
        <p>Питомец: {{ getPetInfo(record.petId).name }}</p>
        <p>Вид: {{ getPetInfo(record.petId).type }}</p>
        <p>Порода: {{ getPetInfo(record.petId).breed }}</p>
        <p>Врач: {{ getDoctorName(record.doctorId) }}</p>
        <p>Владелец: {{ getOwnerInfo(getPetInfo(record.petId).ownerId).fullname }}</p>
        <p>Номер владельца: {{ getOwnerInfo(getPetInfo(record.petId).ownerId).phone }}</p>
        <p>Дата и время: {{ record.timestamp }}</p>
        <p>Услуга: {{ getServiceName(record.serviceId) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

const db = getDatabase();
const records = ref([]);
const filteredRecords = ref([]);
const pets = ref([]);
const doctors = ref([]);
const services = ref([]);
const users = ref([]);
const selectedDate = ref(null);

// Получение данных с Firebase
const fetchRecords = () => {
  const recordRef = dbRef(db, 'Records');
  onValue(recordRef, (snapshot) => {
    const recordsData = snapshot.val();
    records.value = recordsData ? Object.keys(recordsData).map(key => ({ id: key, ...recordsData[key] })) : [];
    filteredRecords.value = records.value;
  });
};

// Функция для фильтрации записей по выбранной дате
const filterRecordsByDate = () => {
  if (!selectedDate.value) {
    filteredRecords.value = records.value;
    return;
  }

  const selectedDateStr = new Date(selectedDate.value).toDateString();
  filteredRecords.value = records.value.filter(record => {
    const recordDateStr = new Date(record.timestamp).toDateString();
    return recordDateStr === selectedDateStr;
  });
};

// Функция для проверки, является ли запись прошедшей
const isPast = (timestamp) => {
  return new Date(timestamp) < new Date();
};

// Остальные функции для получения данных о питомцах, врачах, услугах, пользователях
const fetchPets = () => {
  const petRef = dbRef(db, 'Pets');
  onValue(petRef, (snapshot) => {
    const petsData = snapshot.val();
    pets.value = petsData ? Object.keys(petsData).map(key => ({ id: key, ...petsData[key] })) : [];
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

const fetchUsers = () => {
  const userRef = dbRef(db, 'Users');
  onValue(userRef, (snapshot) => {
    const usersData = snapshot.val();
    users.value = usersData ? Object.keys(usersData).map(key => ({ id: key, ...usersData[key] })) : [];
  });
};

onMounted(() => {
  fetchRecords();
  fetchPets();
  fetchDoctors();
  fetchServices();
  fetchUsers();
});

const getPetInfo = (petId) => {
  const pet = pets.value.find(p => p.id === petId);
  return pet ? { name: pet.name, breed: pet.breed, type: pet.type, ownerId: pet.userId } : { name: 'Не найдено', breed: '', type: '', ownerId: '' };
};

const getDoctorName = (doctorId) => {
  const doctor = doctors.value.find(d => d.id === doctorId);
  return doctor ? `${doctor.lastname} ${doctor.firstname}` : 'Не найдено';
};

const getServiceName = (serviceId) => {
  const service = services.value.find(s => s.id === serviceId);
  return service ? service.name : 'Не найдено';
};

const getOwnerInfo = (ownerId) => {
  const owner = users.value.find(u => u.id === ownerId);
  return owner ? { fullname: `${owner.firstName} ${owner.lastName}`, phone: owner.phoneNumber } : { fullname: 'Не найдено', phone: '' };
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
  transition: opacity 0.3s ease;
}

.past-record .record-card {
  opacity: 0.5; /* Прозрачность для прошедших записей */
}

.filter-section {
  display: flex;
  justify-content: center;
  margin: 20px 0;
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

.filter-section input {
  width: 150px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
}

.filter-section label {
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
}

.error-message {
  color: red;
  font-size: 18px;
}
</style>
