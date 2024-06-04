<script setup>

</script>

<template>
  <div class="services-container">
    <h1 class="title-services">Услуги и цены</h1>
    <div class="services-section">
      <h2>Прием специалистов</h2>
      <ul>
        <li>
          Терапевтический прием: <span>1000 Р</span>
        </li>
        <li>
          Кардиологический прием: <span>1000 Р</span>
        </li>
        <li>
          Первичный прием (неотложный): <span>450 Р</span>
        </li>
      </ul>
    </div>
    <div class="services-section">
      <h2>Лабораторная диагностика</h2>
      <ul>
        <li>
          Общий анализ крови: <span>1200 Р</span>
        </li>
        <li>
          Биохимическое исследование крови<br> (5 показателей): <span>1800 Р</span>
        </li>
        <li>
          Биохимическое исследование кров<br> (12 показателей): <span>2500 Р</span>
        </li>
        <li>
          Биохимический анализ крови: <span>800 Р</span>
        </li>
      </ul>
    </div>
    <div class="services-section">
      <h2>УЗИ - диагностика</h2>
      <ul>
        <li>
          УЗИ одного органа (глаз, почка и т.д.): <span>500 Р</span>
        </li>
        <li>
          УЗИ органов брюшной полости: <span>1500 Р</span>
        </li>
        <li>
          УЗИ мочеполовой системы: <span>800 Р</span>
        </li>
        <li>
          УЗИ сердца: <span>1000 Р</span>
        </li>
      </ul>
    </div>
    <div class="services-section">
      <h2>Социальные операции</h2>
      <ul>
        <li>
          Стерилизация: <span>2700 Р</span>
        </li>
        <li>
          Чипирование: <span>1500 Р</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.services-container {
  padding: 50px 20px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

.title-services {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
}

.services-section {

  margin: 0 auto;
  max-width: 800px;
}

.services-section h2 {
  font-size: 32px;
  color: black;
  border-bottom: 2px solid #F7941E;
  display: inline-block;
  margin-bottom: 15px;
}

.services-section ul {
  list-style: none;
  padding: 0;
}

.services-section ul li {
  font-size: 32px;
  margin-bottom: 10px;
}

.services-section ul li span {
  font-weight: bold;
}
</style>
