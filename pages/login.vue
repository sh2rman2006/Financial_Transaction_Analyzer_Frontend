<script setup>
import Cookies from "js-cookie";

useSeoMeta({
  title: `login`,
});

const axios = useNuxtApp().$axios;
const router = useRouter();

const loginForm = reactive({
  email: "",
  password: "",
});

const isSubmitBtnDisabled = ref(false);
const responseStatus = ref("");
// csrf
const csrfToken = ref(``);
const getCsrfToken = async () => {
  let response = await axios.get(`/csrf`);
  csrfToken.value = response.data.token;
};
// login
const submitLogin = async () => {
  isSubmitBtnDisabled.value = true;
  responseStatus.value = "";
  await getCsrfToken();
  await axios
    .post(`/auth/login`, loginForm, {
      headers: { "X-XSRF-TOKEN": csrfToken.value },
    })
    .then((response) => {
      Cookies.set(`jwtToken`, response.data.token);
      // sessionStorage.setItem(`jwtToken`, response.data.token);
      responseStatus.value = "";
      router.push("/");
    })
    .catch((e) => {
      console.error(e);
      if (e.response && e.response.status === 403) {
        responseStatus.value = "Неверный email или пароль";
      } else {
        responseStatus.value = "Произошла ошибка. Попробуйте позже.";
      }
    })
    .finally(() => {
      isSubmitBtnDisabled.value = false;
    });
};
</script>

<template>
  <div class="login-page">
    <div class="form-container">
      <h1 class="title">Войти</h1>
      <form @submit.prevent="submitLogin" class="login-form">
        <!-- Email -->
        <div class="input-group">
          <label for="email" class="label">Электронная почта</label>
          <input
            id="email"
            type="email"
            v-model.trim="loginForm.email"
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
            v-model.trim="loginForm.password"
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
          <Icon name="carbon:login" size="20" />
          Войти
        </button>
      </form>
      <p class="response" v-if="responseStatus">{{ responseStatus }}</p>
      <p class="switch-link">
        Нет аккаунта? <NuxtLink to="/signup">Зарегистрироваться</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
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
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.8);
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

.response {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  margin: 15px 0;
  color: red;
  text-align: center;
}
</style>
