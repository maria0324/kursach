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
    <section class="form-section">
      <div class="add-pet-container">
        <form class="add-pet-form" @submit.prevent="addPet">
          <label>Добавление питомца</label>
          <input v-model="name" type="text" id="name" placeholder="Кличка" name="name" required />
          <input v-model="type" type="text" id="type" placeholder="Вид" name="type" required />
          <input v-model="breed" type="text" id="breed" placeholder="Порода" name="breed" required />
          <input v-model="gender" type="text" id="gender" placeholder="Пол" name="gender" required />
          <button type="submit">Добавить питомца</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </section>
    <section class="pets-section">
      <div class="pet-card-container" v-for="pet in pets" :key="pet.id">
        <div class="pet-card">
          <p>Кличка: {{ pet.name }}</p>
          <p>Вид: {{ pet.type }}</p>
          <p>Порода: {{ pet.breed }}</p>
          <p>Пол: {{ pet.gender }}</p>
          <button @click="deletePet(pet.id)">Удалить питомца</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, push, onValue, remove } from 'firebase/database';

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || '{}');
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const pets = ref([]);
const name = ref('');
const type = ref('');
const breed = ref('');
const gender = ref('');
const errorMessage = ref('');

const router = useRouter();

const userId = localStorage.getItem('userId'); // Retrieve user ID

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }

  const petRef = dbRef(db, 'Pets');
  onValue(petRef, (snapshot) => {
    const petsData = snapshot.val();
    if (petsData) {
      pets.value = Object.keys(petsData).map(key => ({
        id: key,
        ...petsData[key]
      })).filter(pet => pet.userId === userId); // Filter pets by user ID
    }
  }, (error) => {
    console.error('Ошибка при получении данных из Firebase:', error);
  });
});

const addPet = async () => {
  try {
    const newPet = {
      name: name.value,
      type: type.value,
      breed: breed.value,
      gender: gender.value,
      userId: userId // Associate pet with user ID
    };

    const petRef = dbRef(db, 'Pets');
    await push(petRef, newPet);

    onValue(petRef, (snapshot) => {
      const petsData = snapshot.val();
      if (petsData) {
        pets.value = Object.keys(petsData).map(key => ({
          id: key,
          ...petsData[key]
        })).filter(pet => pet.userId === userId); // Filter pets by user ID
      }
    });

    name.value = '';
    type.value = '';
    breed.value = '';
    gender.value = '';
    errorMessage.value = '';
  } catch (error) {
    console.error('Ошибка при добавлении питомца:', error);
    errorMessage.value = 'Ошибка при добавлении питомца!';
  }
};

const deletePet = async (id) => {
  try {
    const petRef = dbRef(db, `Pets/${id}`);
    await remove(petRef);

    pets.value = pets.value.filter(pet => pet.id !== id);
  } catch (error) {
    console.error('Ошибка при удалении питомца:', error);
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

.form-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.add-pet-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.add-pet-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-pet-form label {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
}

.add-pet-form input {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
}

.add-pet-form button {
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

.pets-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.pet-card-container {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.pet-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  height: 210px;
  width: 350px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}

.pet-card button {
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

.pet-card p {
  margin: 20px 45px;
}
</style>
