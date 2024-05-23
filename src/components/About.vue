<script setup>

</script>

<template>
  <div class="about-container">
    <h1 class="title-about">О клинике BestF</h1>
    <div class="about-content-container">
      <div class="about-content">
        <p>
          Мы круглосуточно помогаем домашним животным: находим выход из трудных ситуаций и подбираем лучшие решения для питомца и владельца. С первого дня работы наш главный принцип — лечим животных по-человечески. Это значит, что процедуры выполняются с учетом интересов пациента.
        </p>
        <p>
          Наша сильная сторона — опытные врачи и современное оборудование. Более 15 лет практики в ветеринарии помогают врачам понять состояние здоровья питомца и назначить правильное лечение. Ультразвуковые аппараты УЗИ, рентген и ЭКГ помогают обнаружить патологии сердца и опухоли, а также оценить работу внутренних органов. В лаборатории выполняются анализы крови, мочи, кала и других органов. Для осмотра и операций мы используем только проверенные и безопасные методы. Приводите ваших питомцев в нашу клинику, и мы проведем все процедуры на высшем уровне.
        </p>
      </div>
      <div class="about-images">
        <img src="../../public/img/vet-clinic3.jpg" alt="Clinic Image 1">
        <img src="../../public/img/vet-clinic2.jpg" alt="Clinic Image 2">
        <img src="../../public/img/vet-clinic1.jpg" alt="Clinic Image 3">
      </div>
    </div>
    <h2 class="rules-title">Правила клиники</h2>
    <div class="rules">
      <div class="rule">
        <img src="../../public/img/checkmark.png" alt="Checkmark">
        <div class="rule-text">
          <h3>Правило 1</h3>
          <p>Не удаляем когти кошкам, прибылые пальцы, не подрезаем голосовые связки собакам, не купируем уши и хвосты, не исправляем прикусы.</p>
        </div>
      </div>
      <div class="rule">
        <img src="../../public/img/checkmark.png" alt="Checkmark">
        <div class="rule-text">
          <h3>Правило 2</h3>
          <p>Не усыпляем без медицинских показаний. Будем бороться за жизнь и здоровье питомца до конца.</p>
        </div>
      </div>
      <div class="rule">
        <img src="../../public/img/checkmark.png" alt="Checkmark">
        <div class="rule-text">
          <h3>Правило 3</h3>
          <p>Не используем нетрадиционные методы лечения и не проверенные препараты.</p>
        </div>
      </div>
      <div class="rule">
        <img src="../../public/img/checkmark.png" alt="Checkmark">
        <div class="rule-text">
          <h3>Правило 4</h3>
          <p>Не ставим вакцины и препараты владельцев. Мы не хотим подвергать животных рискам, так как должны быть уверены в правильной транспортировке и условиях хранения медикаментов.</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.about-container {
  padding: 50px 20px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

.title-about {
  margin-left: 100px;
  font-size: 48px;
  margin-bottom: 20px;
}

.about-content-container {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-bottom: 40px;
}

.about-content {
  width: 60%;
  margin-right: 20px;
}

.about-content p {
  font-size: 20px;
  margin-bottom: 20px;
}

.about-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.about-images img {
  margin-bottom: 20px;
}

.about-images img:nth-child(1),
.about-images img:nth-child(2) {
  width: 300px;
  height: 230px;
  margin-right: 20px;
}

.about-images img:nth-child(2) {
  margin-right: 0;
}

.about-images img:nth-child(3) {
  width: 620px;
  height: 280px;
}

.rules-title {
  font-size: 48px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.rules {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 630px;
  margin: 0 auto;
  padding: 20px;
}

.rule {
  display: flex;
  align-items: center;
}

.rule img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.rule-text {
  font-size: 20px;
}

.rule-text h3 {
  font-size: 20px;
  margin-bottom: 5px;
}

.rule-text p {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
