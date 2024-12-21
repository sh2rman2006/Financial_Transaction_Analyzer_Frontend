<script setup>
const axios = useNuxtApp().$axios;
// csrf
const csrfToken = ref(``);
const getCsrfToken = async () => {
  let response = await axios.get(`/csrf`);
  csrfToken.value = response.data.token;
};
// registration
const registrationForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const isSubmitBtnDisabled = ref(false);

const submitRegistration = async () => {
  isSubmitBtnDisabled.value = true;
  await getCsrfToken();
  await axios
    .post(`/auth/signup`, registrationForm, {
      headers: {
        "X-XSRF-TOKEN": csrfToken.value,
      },
    })
    .then((response) => (isVerifyForm.value = true));
};
// verify
const isVerifyForm = ref(false);
const verifyCode = ref(``);
const submitVerify = async () => {
  await getCsrfToken();
  await axios.post(
    `/auth/verify`,
    {
      email: registrationForm.email,
      verificationCode: verifyCode,
    },
    { headers: { "X-XSRF-TOKEN": csrfToken.value } }
  );
};
</script>

<template>
  <div class="registration-page">
    <div class="form-container">
      <!-- registration form -->
      <div class="registration" v-if="false">
        <h1 class="title">Создать аккаунт</h1>
        <form @submit.prevent="submitRegistration" class="registration-form">
          <!-- First Name -->
          <div class="input-group">
            <label for="firstName" class="label">Имя</label>
            <input
              id="firstName"
              type="text"
              v-model.trim="registrationForm.firstName"
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
              v-model.trim="registrationForm.lastName"
              required
              placeholder="Введите фамилию"
              class="input-field"
            />
          </div>

          <!-- Email -->
          <div class="input-group">
            <label for="email" class="label">Электронная почта</label>
            <input
              id="email"
              type="email"
              v-model.trim="registrationForm.email"
              required
              placeholder="Введите электронную почту"
              class="input-field"
            />
          </div>

          <!-- Password -->
          <div class="input-group">
            <label for="password" class="label">Пароль</label>
            <input
              id="password"
              type="password"
              v-model.trim="registrationForm.password"
              required
              placeholder="Введите пароль"
              class="input-field"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitBtnDisabled"
            :class="{ disabled: isSubmitBtnDisabled }"
            class="submit-btn"
          >
            <Icon name="carbon:user" size="20" />
            Зарегистрироваться
          </button>
        </form>
        <p class="switch-link">
          Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
        </p>
      </div>

      <!-- verify form -->
      <div class="verify" v-if="true">
        <h1 class="title">Подтвердите почту</h1>
        <form class="verify-form" @submit.prevent="submitVerify">
          <div class="input-group">
            <label for="verifyInput" class="label">Код</label>
            <input
              id="verifyInput"
              type="text"
              v-model.trim="verifyCode"
              required
              placeholder="Введите код"
              class="input-field"
            />
          </div>

          <button type="submit" class="submit-btn">Подтвердить</button>
        </form>
      </div>
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

.submit-btn.disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
  transition: 0.3s;
  &:hover {
    background-color: #818b90;
  }
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
