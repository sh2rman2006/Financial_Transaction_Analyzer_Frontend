<script setup>
defineProps({
  transaction: Object,
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
  HOBBIES: "carbon:activity", // Исправлено на существующую иконку
  OTHER: "carbon:tag",
};

// Карта иконок для типов транзакций
const iconByType = {
  CREDIT: "carbon:increase",
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
  <div class="transaction-card">
    <div class="card-header">
      <!-- Иконка категории -->
      <Icon
        :name="iconByCategory[transaction.category] || 'carbon:tag'"
        size="28"
        class="icon-category"
      />
      <span class="category">{{ transaction.category }}</span>
    </div>

    <div class="card-body">
      <div class="description">
        <p>{{ transaction.description || "No description provided" }}</p>
      </div>
      <div
        class="amount"
        :class="{ credit: transaction.type === 'CREDIT', debit: transaction.type === 'DEBIT' }"
      >
        <Icon
          :name="iconByType[transaction.type] || 'carbon:tag'"
          size="20"
          class="icon-type"
        />
        {{ transaction.type === "CREDIT" ? "+" : "-" }}{{ transaction.amount.toFixed(2) }} $
      </div>
    </div>

    <div class="card-footer">
      <small class="date">{{ formatDate(new Date(transaction.date)) }}</small>
    </div>
  </div>
</template>

<style scoped>
.transaction-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 18px;
}

.category {
  color: #007bff;
}

.icon-category {
  color: #007bff;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.description {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  flex: 1;
  margin-bottom: 12px;
}

.amount {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.amount.credit {
  color: #28a745;
}

.amount.debit {
  color: #dc3545;
}

.card-footer {
  text-align: right;
  font-size: 14px;
  color: #555;
}

.date {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-top: 8px;
}

.icon-type {
  color: #555;
}
</style>
