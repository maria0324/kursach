<template>
  <div class="contacts-container">
    <h1>Контакты клиники</h1>
    <div class="contacts-info">
      <h3>Обращайтесь по номеру:</h3>
      <p>+89 51 152 3212</p>
      <h3>Пишите на почту:</h3>
      <p>bestf@mail.ru</p>
      <h3>Мы находимся по адресу:</h3>
      <p>г. Томск, ул.Герцена 78</p>
    </div>
    <div class="contacts-map">
      <img src="../../public/img/map.png" alt="Map" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contacts-container {
  padding: 50px 20px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  text-align: center;
}

.contacts-container h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.contacts-info {
  display: inline-block;
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
}

.contacts-info p {
  margin-bottom: 10px;
  color: #F7941E;
}

.contacts-map {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.contacts-map img {
  width: 80%;
  max-width: 800px;
  height: auto;
  border: 1px solid #ccc;
}
</style>
