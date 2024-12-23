<script setup>
useSeoMeta({
  title: `welcome`,
});
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-message">
      <h1>Добро пожаловать в Систему анализа финансовых транзакций!</h1>
      <p>
        Мы рады видеть вас! Войдите в свою учетную запись или создайте новую для
        начала работы с нашим сервисом.
      </p>
      <div class="buttons">
        <NuxtLink to="/login" class="btn">
          <Icon name="carbon:user-avatar" />
          Войти
        </NuxtLink>
        <NuxtLink to="/signup" class="btn">
          <Icon name="carbon:user-profile" />
          Зарегистрироваться
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Общий фон страницы с красивым градиентом */
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #8e44ad, #3498db);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  font-family: "Roboto", sans-serif;
  color: white;
  text-align: center;
}

/* Контейнер с приветственным сообщением */
.welcome-message {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 3rem 2rem;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease;
}

/* Эффект для появления контента */
.welcome-message:hover {
  transform: translateY(-10px);
}

/* Стили для изображения */
.welcome-image {
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 6px solid white;
  transition: transform 0.3s ease;
}

.welcome-image:hover {
  transform: scale(1.1);
}

/* Заголовок */
h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #2c3e50;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

/* Текст приветствия */
p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #34495e;
}

/* Кнопки */
.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

/* Стиль кнопок */
.btn {
  display: flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Эффекты при наведении на кнопки */
.btn:hover {
  background-color: #2980b9;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.5s;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
}

.btn:hover:before {
  transform: translate(-50%, -50%) scale(1);
}

/* Анимация для градиента фона */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
