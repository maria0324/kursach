<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="form">
        <h2>Запись на прием</h2>
        <form @submit.prevent="submitForm">
          <label for="date-time">Дата и время</label>
          <input type="datetime-local" id="date-time" v-model="dateTime" required>

          <label for="pet">Выберите питомца</label>
          <select id="pet" v-model="pet" required>
            <option value="" disabled>Выберите питомца</option>
            <option value="dog">Собака</option>
            <option value="cat">Кошка</option>
            <option value="bird">Птица</option>
            <option value="reptile">Рептилия</option>
            <option value="fish">Рыба</option>
            <option value="cow">КРС</option>
          </select>

          <button type="submit">Записаться</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dateTime: '',
      pet: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submitForm() {
      // Handle form submission here
      console.log("Form submitted with:", this.dateTime, this.pet);
      this.close();
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-content .form {
  display: flex;
  flex-direction: column;
}

.modal-content .form label {
  margin-bottom: 8px;
}

.modal-content .form input,
.modal-content .form select,
.modal-content .form button {
  margin-bottom: 16px;
}

.modal-content .form button {
  align-self: flex-end;
}
</style>
