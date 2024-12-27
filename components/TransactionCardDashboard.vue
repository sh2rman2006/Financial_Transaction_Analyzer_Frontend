<script setup>
defineProps({
  transaction: Object, // Получаем транзакцию как пропс
});

// Карта иконок для категорий
const iconByCategory = {
  SALARY: "carbon:money",
  SAVINGS: "carbon:wallet",
  GROCERIES: "carbon:shopping-cart",
  RENT: "carbon:building",
  UTILITIES: "carbon:light",
  TRANSPORTATION: "carbon:car-front",
  ENTERTAINMENT: "carbon:game-console",
  RESTAURANTS: "carbon:restaurant",
  CLOTHING: "carbon:shopping-bag",
  HEALTHCARE: "carbon:health-cross",
  EDUCATION: "carbon:education",
  GIFTS: "carbon:gift",
  TRAVEL: "carbon:plane",
  SUBSCRIPTIONS: "carbon:document",
  HOBBIES: "carbon:activity",
  OTHER: "carbon:tag",
};

// Карта иконок для типов транзакций
const iconByType = {
  CREDIT: "carbon:add",
  DEBIT: "carbon:subtract",
  TRANSFER: "carbon:arrows-horizontal",
  FEE: "carbon:chart-pie",
};

// Форматирование даты
const formatDate = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};
</script>

<template>
  <div class="category-card">
    <div class="icon-container">
      <!-- Иконка категории сверху -->
      <Icon :name="iconByCategory[transaction.category]" size="30" />
    </div>
    <div class="info-container">
      <h3>{{ transaction.category }}</h3>
      <p class="transaction-type">
        <Icon :name="iconByType[transaction.type]" size="16" />
        {{ transaction.type }}
      </p>
      <p class="amount">${{ transaction.amount.toFixed(2) }}</p>
      <p class="date">{{ formatDate(new Date(transaction.date)) }}</p>
    </div>
  </div>
</template>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column; /* элементы располагаются вертикально */
  align-items: center; /* выравнивание по центру */
  padding: 12px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 12px 0;
  /* width: 100%; */
}

.icon-container {
  margin-bottom: 8px; /* отступ между иконкой и данными */
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* выравнивание текста по центру */
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.transaction-type {
  font-size: 12px;
  color: #777;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.transaction-type Icon {
  margin-right: 6px;
}

.amount {
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 6px;
}

.date {
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 768px) {
  .category-card {
    padding: 10px;
  }
  .icon-container {
    margin-bottom: 6px;
  }
}
</style>
