<template>
  <div>

    <div class="main-text">
      <p>Ветеринарный <br> центр <span class="orange-text">BestF</span></p>
    </div>
    <div class="cel-text">
      <p>Наша цель: обеспечить <br> индивидуальный подход к каждому <br> пациенту, став гарантом долгой, <br> здоровой и счастливой жизни Вашего <br> питомца.</p>
    </div>
    <p class="client-message"><span class="orange-text">Уважаемые клиенты!</span><br>Запись на прием возможна после<br> авторизации в разделе "Мои записи"</p>

    <img class="start-dog" src="../../public/img/start-dog.png" alt="dog">
    <section class="who-services">
      <div class="wrapper">
        <h3 class="who-services-text">Предоставляем услуги:</h3>
        <div class="grid_icons d-f j-c-c">
          <div class="column1grid d-f f-d-r">
            <figure>
              <img class alt="dog" src="../../public/img/dog.png"/>
              <figcaption class="d-f j-c-c">СОБАКАМ</figcaption>
            </figure>
            <figure>
              <img class alt="turtle" src="../../public/img/turtle.png"/>
              <figcaption class="d-f j-c-c">РЕПТИЛИЯМИ</figcaption>
            </figure>
            <figure>
              <img class alt="cow" src="../../public/img/cow.png"/>
              <figcaption class="d-f j-c-c">КРС</figcaption>
            </figure>
          </div>
          <div class="column2grid d-f f-d-r">
            <figure>
              <img class alt="cat" src="../../public/img/cat.png"/>
              <figcaption class="d-f j-c-c">КОШКАМ</figcaption>
            </figure>
            <figure>
              <img class alt="bird" src="../../public/img/bird.png"/>
              <figcaption class="d-f j-c-c">ПТИЦАМ</figcaption>
            </figure>
            <figure>
              <img class alt="fish" src="../../public/img/fish.png"/>
              <figcaption class="d-f j-c-c">РЫБАМ</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbRef, onValue, push } from 'firebase/database';

const router = useRouter();
const auth = getAuth();
const db = getDatabase();






</script>


<style>

*{
  margin: 0;
  padding: 0;
}

body{
  background-image: url("../../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
}



.start-dog{
  position: absolute;
  top: 171px;
  height: 905px;
  width: 900px;
  left: 958px;
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
  top: -20px;
  left: 173px;
}

.main-text {
  color: white;
  font-size: 64px;
  position: absolute;
  top: 255px;
  left: 95px;
}

.cel-text {
  color: white;
  font-size: 32px;
  position: absolute;
  top: 445px;
  left: 100px;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  padding: 20px; /* Добавим отступы, чтобы текст не прилегал к краям */
  border-radius: 30px; /* Радиус закругления углов фона */
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
  background-image: url("../../public/img/start-screen-gradient-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 1860px;
}

.footer-navbar a{
  text-decoration: none;
  padding-top: 15px;

  font-size: 20px;
  color: white;
  text-align: left;
}


.footer-contact p{
  font-size: 20px;
  color: #D9B8A1;
}

.appointment-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-top: 535px;
  margin-left: 100px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
}

.appointment-form button {
  display: block;
  width: calc(100% - 20px);
  margin: 20px 10px;
  padding: 10px;
  background-color: #3e3e3e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.appointment-form button:hover {
  background-color: #333;
}

.login-prompt {
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
}
.orange-text {
  color: #F7941E;
}

.client-message {
  color: white;
  font-size: 32px;
  position: absolute;
  top: 710px; /* Подбирайте значение, чтобы располагать текст в нужном месте */
  left: 100px;
}
</style>


