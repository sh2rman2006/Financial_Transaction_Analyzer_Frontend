<script setup>
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
</script>

<template>
  <div class="registration-page">
    <div class="form-container">
      <h1 class="title">Создать аккаунт</h1>
      <form @submit.prevent="" class="registration-form">
        <!-- First Name -->
        <div class="input-group">
          <label for="firstName" class="label">Имя</label>
          <input
            id="firstName"
            type="text"
            v-model="form.firstName"
            required
            placeholder="Введите имя"
            class="input-field"
          />
        </div>

        <!-- Last Name -->
        <div class="input-group">
          <label for="lastName" class="label">Фамилия</label>
          <input
            id="lastName"
            type="text"
            v-model="form.lastName"
            required
            placeholder="Введите фамилию"
            class="input-field"
          />
        </div>

        <!-- Email -->
        <div class="input-group">
          <label for="email" class="label">Элекстронная почта</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Введите элекстронную почту"
            class="input-field"
          />
        </div>

        <!-- Password -->
        <div class="input-group">
          <label for="password" class="label">Пароль</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Введите пароль"
            class="input-field"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">
          <Icon name="carbon:user" size="20" />
          Зарегистрироваться
        </button>
      </form>
      <p class="switch-link">
        Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f7fc;
  font-family: "Roboto", sans-serif;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #5c6bc0;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #5c6bc0;
  color: white;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn:hover {
  background-color: #4e58a3;
}

.switch-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.switch-link a {
  color: #5c6bc0;
  text-decoration: none;
}

.switch-link a:hover {
  text-decoration: underline;
}
</style>
