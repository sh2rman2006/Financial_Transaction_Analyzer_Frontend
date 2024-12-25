<script setup>
import Cookies from "js-cookie";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Профиль",
});

const router = useRouter();
const axios = useNuxtApp().$axios;

const user = reactive({});
const getProfile = async () => {
  let response = await axios.get("/user/me", {
    headers: { Authorization: `Bearer ${useCookie("jwtToken").value}` },
  });
  Object.assign(user, response.data);
};
onMounted(getProfile);

const logout = () => {
  Cookies.remove("jwtToken");
  router.push("/login");
};

const goToDashboard = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div class="profile-container">
    <div class="profile-card">
      <!-- Иконка вместо изображения профиля -->
      <Icon name="carbon:user" size="80" class="profile-icon" />

      <!-- Информация о пользователе -->
      <div class="profile-info" v-if="user">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p>{{ user.email }}</p>
      </div>

      <!-- Кнопки действий -->
      <div class="profile-actions">
        <button @click="logout" class="logout-button">Выйти</button>
        <button @click="goToDashboard" class="dashboard-button">
          Вернуться на Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.profile-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.profile-icon {
  margin-bottom: 20px;
}

.profile-info {
  margin-bottom: 30px;
}

.profile-info h2 {
  margin: 0;
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
}

.profile-info p {
  color: gray;
  margin-top: 8px;
  font-family: "Roboto", sans-serif;
}

.profile-actions {
  margin-top: 20px;
}

.logout-button,
.dashboard-button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
}

.logout-button {
  background-color: #007bff;
  color: white;
}

.logout-button:hover {
  background-color: #0056b3;
}

.dashboard-button {
  background-color: #28a745;
  color: white;
}

.dashboard-button:hover {
  background-color: #218838;
}
</style>
