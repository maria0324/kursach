<template>
  <div>
    <div class="navbar">
      <router-link to="/">Главная</router-link>
      <router-link to="/doctors">Врачи</router-link>
      <router-link to="/services">Услуги и цены</router-link>
      <router-link to="/about">О клинике</router-link>
      <router-link to="/contacts">Контакты</router-link>
      <router-link to="/login">Вход</router-link>

    </div>
    <div class="main-text">
      <p>Ветеринарный <br> центр BestF</p>
    </div>
    <div class="cel-text">
      <p>Наша цель: обеспечить <br> индивидуальный подход к каждому <br> пациенту, став гарантом долгой, <br> здоровой и счастливой жизни Вашего <br> питомца.</p>
    </div>
    <div class="button-note">
      <button >Записаться на прием</button>
    </div>
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

<script>

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

</style>


