<template>
  <div>
    <header>
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
        <router-link to="#">Вход</router-link>
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
          <p>г. Томск, ул.Герцена 18</p>
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

<style scoped>

*{
  margin: 0;
  padding: 0;
}

body{
  background-image: url("../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.logo{
  position: relative;
  top: 25px;
  left: 100px;
}

.start-dog{
  position: absolute;
  top: 171px;
  height: 905px;
  width: 900px;
  left: 658px;
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
  margin-left:75px;
}

.logo-text p{
  color: white;
  height: 30px;
  width: 60px;
  font-size: 20px;
  position: relative;
  top: -40px;
  left: 173px;
}

.main-text {
  color: white;
  font-size: 64px;
  position: absolute;
  top: 230px;
  left: 95px;
}

.cel-text{
  color: white;
  font-size: 32px;
  position: absolute;
  top: 455px;
  left: 100px;
}

.button-note button{
  height: 40px;
  width: 330px;
  background-color: white;
  font-size: 24px;
  border-radius: 30px;
  border: white;
}

.button-note {
  position: absolute;
  top: 730px;
  left: 100px;
}

.who-services{
  background-color: white;
  height: 855px;
  width: 100%;
  position: absolute;
  top: 1075px;
}

.who-services-text{
  font-size: 48px;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

}

.wrapper {
  margin: 0 auto;
  max-width: 1440px;
}

.d-f {
  display: flex;
}

.f-d-r {
  flex-direction: row;
}

.j-c-c {
  justify-content: center;
}

.grid_icons {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 35px;
  position: relative;
  top: 165px;
}
.column1grid figure:not(:last-child),
.column2grid figure:not(:last-child) {
  margin-right: 95px;}
.wrapper figcaption{
  font-size: 20px;
  font-weight: bold;
}
footer{
  height: 300px;
  width: 100%;
  background-image: url("../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 1860px;
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
.footer-navbar a{
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

.footer-contact{
  position: absolute;
  top: 50px;
  left: 1160px;
}

.footer-contact p{
  font-size: 20px;
  color: #D9B8A1;
}

.contact-item {
  display: flex;
  align-items: center;
  padding-top: 25px
}
.footer-puppy{
  position: absolute;
  top: 23px;
  right: 100px;
}
</style>