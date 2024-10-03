<template>
  <div id="app">
    <header :class="headerClass">
      <img class="logo" src="../public/img/logo.png" alt="logo">
      <div class="logo-text">
        <p>BestF</p>
      </div>
      <div class="navbar">
        <router-link to="/">Главная</router-link>
        <router-link to="/doctors">Врачи</router-link>
        <router-link to="/services">Услуги и цены</router-link>
        <router-link to="/about">О клинике</router-link>
        <router-link to="/contacts">Контакты</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Вход</router-link>
        <router-link v-else to="/profile">Профиль</router-link>
        <a v-if="isAuthenticated" @click="logout">Выход</a>
      </div>
    </header>

    <router-view/>

    <footer>
      <div class="footer-navbar">
        <div class="footer-column">
          <router-link to="/">Главная</router-link>
          <router-link to="#">О клинике</router-link>
          <router-link to="/doctors">Врачи</router-link>
        </div>
        <div class="footer-column">
          <router-link to="#">Контакты</router-link>
          <router-link to="#">Услуги и цены</router-link>
          <router-link to="#">Вход</router-link>
        </div>
      </div>
      <div class="footer-contact">
        <div class="contact-item">
          <img src="../public/img/location.svg" alt="Location Icon">
          <p>г. Томск, ул.Герцена 78</p>
        </div>
        <div class="contact-item">
          <img src="../public/img/mail.png" alt="Email Icon">
          <p>bestf@mail.ru</p>
        </div>
        <div class="contact-item">
          <img src="../public/img/phone.png" alt="Phone Icon">
          <p>+89 51 152 3212</p>
        </div>
      </div>
      <img class="footer-puppy" alt="puppy" src="../public/img/footer-puppy.png">
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
    const router = useRouter();

    const logout = () => {
      isAuthenticated.value = false;
      localStorage.removeItem('isAuthenticated');
      router.push('/');
    };

    return {
      isAuthenticated,
      logout,
    };
  },
  computed: {
    headerClass() {
      const route = this.$route.path;
      if (route === '/') {
        return 'header-home';
      } else {
        return 'header-other';
      }
    }
  },
  watch: {
    '$route'(to) {
      this.updateBodyClass(to.path);
    }
  },
  mounted() {
    this.updateBodyClass(this.$route.path);
  },
  methods: {
    updateBodyClass(path) {
      if (path === '/') {
        document.body.className = 'home-background';
      } else {
        document.body.className = 'default-background';
      }
    }
  }
}
</script>

<style>
html, body, #app {
  height: auto; /* Изменяем фиксированную высоту */
  min-height: 100vh; /* Гарантируем минимум 100% высоты */
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex-grow: 1; /* Контент заполняет пространство между хедером и футером */
}

body.home-background {
  background-image: url("../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

body.default-background {
  background-image: none;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.header-home {
  background-image: url("../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.header-other {
  background-image: url("../public/img/header-screen.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 140px;
}

.logo {
  position: relative;
  top: 25px;
  left: 100px;
}

.navbar {
  position: absolute;
  right: 85px;
  top: 43px;
  display: inline-block;
}

.navbar a {
  float: left;
  font-size: 20px;
  display: block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

.navbar a:not(:first-child) {
  margin-left: 75px;
}

.logo-text p {
  color: white;
  height: 30px;
  width: 60px;
  font-size: 20px;
  position: relative;
  top: -20px;
  left: 173px;
}

.footer-navbar {
  position: absolute;
  top: 75px;
  left: 320px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 60%;
}

.footer-navbar a {
  text-decoration: none;
  padding-top: 15px;
  font-size: 20px;
  color: white;
  text-align: left;
}

.footer-column {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.footer-column:not(:first-child) {
  padding-right: 400px;
}

.footer-contact {
  position: absolute;
  top: 50px;
  left: 1160px;
}

.footer-contact p {
  font-size: 20px;
  color: #D9B8A1;
}

.contact-item {
  display: flex;
  align-items: center;
  padding-top: 25px;
}

.footer-puppy {
  position: absolute;
  top: 23px;
  right: 100px;
}
</style>
