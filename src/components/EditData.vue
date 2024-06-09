<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="profile-info">
        <img class="profile-image" src="../../public/img/profile-icon.png" alt="Profile Icon">
        <div class="profile-name">
          <h3>{{ firstName }} {{ lastName }}</h3>
        </div>
      </div>
      <nav class="profile-nav">
        <router-link to="/profile">Мои питомцы</router-link>
        <router-link to="/profile/my-records">Мои записи</router-link>
        <router-link to="/profile/edit">Редактировать данные</router-link>
      </nav>
    </header>
    <div class="edit-container">
      <form class="edit-form" @submit.prevent="updateUser">
        <input v-model="login" type="text" id="login" placeholder="Логин" name="login" required />
        <input v-model="password" type="password" id="password" placeholder="Пароль" name="password" required />
        <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Подтвердите пароль" name="confirm-password" required />
        <input v-model="firstName" type="text" id="first-name" placeholder="Имя" name="first-name" required />
        <input v-model="lastName" type="text" id="last-name" placeholder="Фамилия" name="last-name" required />
        <input v-model="patronymic" type="text" id="patronymic" placeholder="Отчество" name="patronymic" />
        <input v-model="phone" type="text" id="phone" placeholder="Номер телефона" name="phone" required />
        <button type="submit">Сохранить</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const patronymic = ref('');
const phone = ref('');
const errorMessage = ref('');

const fetchUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      login.value = user.email;
      firstName.value = userData.firstName || '';
      lastName.value = userData.lastName || '';
      patronymic.value = userData.patronymic || '';
      phone.value = userData.phone || '';
    }
  }
};

const updateUser = async () => {
  const user = auth.currentUser;
  if (user) {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }

    try {
      await updateEmail(user, login.value);
      if (password.value) {
        await updatePassword(user, password.value);
      }
      await updateProfile(user, {
        displayName: `${firstName.value} ${lastName.value}`
      });
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        patronymic: patronymic.value,
        phone: phone.value
      });
      errorMessage.value = 'Данные успешно обновлены';
    } catch (error) {
      errorMessage.value = `Ошибка: ${error.message}`;
    }
  }
};

onMounted(fetchUserData);
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


.edit-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 140px);
  text-align: center;
  padding-bottom: 70px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-form label {
  font-size: 24px;
  margin-bottom: 5px;
}
.edit-form input {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #ffa500;
}
.edit-form button {
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
