<script setup>
definePageMeta({
  middleware: "auth-welcome-page",
});
useSeoMeta({
  title: `Главная`,
});
</script>

<template>
  <div class="main-container">
    <section class="hero">
      <div class="hero-content">
        <h1>Добро пожаловать в Financial Transaction Analyzer</h1>
        <p>
          Анализируйте финансовые транзакции легко и быстро с помощью нашего
          мощного инструмента.
        </p>
        <NuxtLink to="/" class="btn">Перейти в систему</NuxtLink>
      </div>
      <video class="hero-image" width="700" height="500" autoplay muted loop>
        <source src="/graphik.mp4" type="video/mp4" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    </section>

    <section class="features">
      <h2>Наши возможности</h2>
      <div class="features-grid">
        <div class="feature">
          <Icon name="carbon:analytics" />
          <h3>Подробный анализ транзакций</h3>
          <p>
            Получите глубокое понимание ваших финансов с помощью наших
            аналитических инструментов.
          </p>
        </div>
        <div class="feature">
          <Icon name="material-symbols:lock-outline" />
          <h3>Безопасность на первом месте</h3>
          <p>
            Все ваши данные защищены с помощью современных методов шифрования.
          </p>
        </div>
        <div class="feature">
          <Icon name="material-symbols:storage" />
          <h3>Сохранение в базе данных</h3>
          <p>
            Все ваши данные синхронизированы и всегда доступны на любом
            устройстве.
          </p>
        </div>
      </div>
    </section>

    <section class="footer">
      <p>&copy; 2024 Financial Transaction Analyzer. Все права защищены.</p>
    </section>
  </div>
</template>

<style scoped>
.main-container {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  background: #fafafa;
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #007bff, #00b0ff);
  padding: 60px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: white;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
}

.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.hero .btn {
  display: inline-block;
  padding: 15px 30px;
  background-color: #ffffff;
  color: #007bff;
  font-size: 18px;
  text-decoration: none;
  border-radius: 25px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.hero .btn:hover {
  background-color: #007bff;
  color: white;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.features {
  padding: 60px 20px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 40px;
}

.features h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
}

.features-grid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.feature {
  width: 250px;
  text-align: center;
  padding: 20px;
  background-color: #f4f7fc;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.feature h3 {
  font-size: 22px;
  margin-top: 20px;
  font-weight: 600;
}

.feature p {
  font-size: 16px;
  margin-top: 10px;
  color: #555;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
  margin-top: 40px;
  border-radius: 8px;
}

.footer p {
  font-size: 14px;
  margin: 0;
}

</style>
