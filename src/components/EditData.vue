<template>
  <div class="profile-container">
    <header class="profile-header">
      <div class="profile-info">
        <img class="profile-image" src="../../public/img/profile-icon.png" alt="Profile Icon">
        <div class="profile-name">
          <h3>{{ userFullName }}</h3> <!-- Добавляем отображение полного имени -->
        </div>
      </div>
      <nav class="profile-nav">
        <router-link to="/profile">Мои питомцы</router-link>
        <router-link to="/profile/my-records">Мои записи</router-link>
        <router-link to="/profile/edit">Редактировать данные</router-link>
      </nav>
    </header>
    <div class="edit-container">
      <h2>Редактирование данных</h2>
      <form class="edit-form" @submit.prevent="updateUser">
        <input v-model="login" type="text" id="login" placeholder="Логин" name="login" required />
        <input v-model="password" type="password" id="password" placeholder="Пароль" name="password" />
        <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Подтвердите пароль" name="confirm-password" />
        <input v-model="phone" type="text" id="phone" placeholder="Номер телефона" name="phone" required />
        <button type="submit">Сохранить</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
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
const userFullName = ref('');



const fetchUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    console.log("Authenticated user: ", user);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("Fetched user data: ", userData);
      login.value = user.email;
      firstName.value = userData.firstName || '';
      lastName.value = userData.lastName || '';
      patronymic.value = userData.patronymic || '';
      phone.value = userData.phone || '';
      userFullName.value = `${userData.firstName} ${userData.lastName}`; // Обновляем полное имя
    } else {
      console.error("No such document!");
    }
  } else {
    console.error("No authenticated user found!");
  }
};

const updateUser = async () => {
  const user = auth.currentUser;
  if (user) {
    if (password.value && password.value !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }

    try {
      if (login.value !== user.email) {
        await updateEmail(user, login.value);
      }
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
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
      errorMessage.value = `Ошибка: ${error.message}`;
    }
  } else {
    console.error("No authenticated user found!");
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

.edit-container {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  height: calc(100vh - 140px);
  text-align: center;
  padding-bottom: 70px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
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
h2{
  margin-bottom: 30px;
}
</style>
