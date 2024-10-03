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
    <div class="registration-container">
      <h1>Добавление врача</h1>
      <form class="registration-form" @submit.prevent="addDoctor">
        <input v-model="lastname" type="text" placeholder="Фамилия врача" required />
        <input v-model="firstname" type="text" placeholder="Имя врача" required />
        <input v-model="patronymic" type="text" placeholder="Отчество врача" required />
        <input v-model="speciality" type="text" placeholder="Специальность врача" required />
        <div class="file-input-container">
          <input type="file" id="photo" ref="photoInput" class="file-input" required />
          <label for="photo" class="file-input-label">Выберите фотографию</label>
        </div>
        <button type="submit">Добавить врача</button>
      </form>
    </div>
    <div class="doctors-section">
      <h2>Наши врачи</h2>
      <div class="doctors-list">
        <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
          <img :src="doctor.photo" alt="Фото врача" class="doctor-photo" />
          <h3>{{ doctor.lastname }} {{ doctor.firstname }} {{ doctor.patronymic }}</h3>
          <p>Специальность: {{ doctor.speciality }}</p>
          <button @click="deleteDoctor(doctor.id)">Удалить врача</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, push, onValue, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const lastname = ref('');
const firstname = ref('');
const patronymic = ref('');
const speciality = ref('');
const photoInput = ref(null);
const doctors = ref([]);

onMounted(() => {
  const doctorRef = dbRef(db, 'Doctors');
  onValue(doctorRef, (snapshot) => {
    const data = snapshot.val();
    doctors.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
  });
});

const addDoctor = async () => {
  try {
    const photoFile = photoInput.value.files[0];
    if (!photoFile) {
      throw new Error('Файл фотографии не выбран');
    }

    const storageReference = storageRef(storage, `doctorPhotos/${photoFile.name}`);
    await uploadBytes(storageReference, photoFile);
    const photoURL = await getDownloadURL(storageReference);

    const newDoctor = {
      lastname: lastname.value,
      firstname: firstname.value,
      patronymic: patronymic.value,
      speciality: speciality.value,
      photo: photoURL
    };

    // Логирование значения speciality перед отправкой в Firebase
    console.log('Speciality:', speciality.value);

    const doctorReference = dbRef(db, 'Doctors');
    await push(doctorReference, newDoctor);

    lastname.value = '';
    firstname.value = '';
    patronymic.value = '';
    speciality.value = '';
    photoInput.value.value = '';

    alert('Врач успешно добавлен!');
  } catch (error) {
    console.error('Ошибка при добавлении врача:', error);
    alert('Ошибка при добавлении врача. Пожалуйста, попробуйте еще раз.');
  }
};


const deleteDoctor = async (doctorId) => {
  try {
    const doctorReference = dbRef(db, `Doctors/${doctorId}`);
    await remove(doctorReference);

    doctors.value = doctors.value.filter(doctor => doctor.id !== doctorId);

    alert('Врач успешно удален!');
  } catch (error) {
    console.error('Ошибка при удалении врача:', error);
    alert('Ошибка при удалении врача. Пожалуйста, попробуйте еще раз.');
  }
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
.registration-form .file-input-container {
  position: relative;
  width: 300px;
  margin-bottom: 20px;
}
.registration-form .file-input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.registration-form .file-input-label {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  background-color: #3e3e3e;
  color: white;
  border-radius: 30px;
  cursor: pointer;
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
.doctor-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.doctors-section {
  margin-top: 20px;
}
.doctors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.doctor-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  width: 200px;
}
.doctor-card button {
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}
.error-message {
  color: red;
  font-size: 18px;
}
</style>
