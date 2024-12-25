<script setup>
import Chart from "chart.js/auto";

useSeoMeta({
  title: `dashboard`,
});
definePageMeta({
  middleware: `auth`,
});

const transactionsStore = useTransactionsStore();
const axios = useNuxtApp().$axios;
const chartRef = ref(null);

const currentDate = ref(new Date());
const currentMonth = ref(currentDate.value.getMonth() + 1);
const currentYear = ref(currentDate.value.getFullYear());

// Получение транзакций
const getTransactionsByMonthAndYearAndYear = async (reqYear, reqMonth) => {
  const token = useCookie("jwtToken");
  try {
    const response = await axios.get("/transaction/getMonthHistory", {
      headers: { Authorization: `Bearer ${token.value}` },
      params: { year: reqYear, month: reqMonth },
    });
    transactionsStore.setTransactions(response.data);
    renderChart();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

// Общая сумма для каждого типа
const totalByType = computed(() => {
  const totals = {};
  transactionsStore.transactions.forEach((transaction) => {
    const type = transaction.type; // "CREDIT", "DEBIT", etc.
    if (!totals[type]) totals[type] = 0;
    totals[type] += transaction.amount;
  });
  return totals;
});

// Данные для диаграммы
const chartData = computed(() => {
  return {
    labels: Object.keys(totalByType.value).map(
      (type) => type.charAt(0) + type.slice(1).toLowerCase()
    ),
    datasets: [
      {
        data: Object.values(totalByType.value),
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"], // Цвета для типов
      },
    ],
  };
});

// Рендер диаграммы
const renderChart = () => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: "pie",
      data: chartData.value,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
};

onMounted(async () => {
  await getTransactionsByMonthAndYearAndYear(currentYear.value, currentMonth.value);
});
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <h1 class="title">Dashboard</h1>
      <nav class="nav">
        <NuxtLink to="/profile" class="nav-link">
          <Icon name="mdi-account" size="24" />
          Профиль
        </NuxtLink>
        <NuxtLink to="/getAll/page-0" class="nav-link">
          <Icon name="mdi-history" size="24" />
          Все транзакции
        </NuxtLink>
      </nav>
    </header>

    <section class="overview">
      <div class="stats">
        <div class="stat" v-for="(total, type) in totalByType" :key="type">
          <h3>{{ type.charAt(0) + type.slice(1).toLowerCase() }}</h3>
          <p class="total">${{ total.toFixed(2) }}</p>
        </div>
      </div>

      <div class="chart">
        <canvas ref="chartRef"></canvas>
      </div>
    </section>

    <section class="transactions-list">
      <h2>Транзакции за месяц</h2>
      <div class="cards-container">
        <TransactionCardDashboard
          v-for="transaction in transactionsStore.transactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 30px;
  font-family: "Poppins", sans-serif;
  background-color: #f4f4f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
}

.nav {
  display: flex;
}

.nav-link {
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0056b3;
}

.nav-link Icon {
  margin-right: 8px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}

.stat {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
}

.stat h3 {
  font-size: 18px;
  color: #666;
}

.total {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.chart {
  max-width: 400px;
  margin: 0 auto;
}

.cards-container {
  display: flex;
  flex-wrap: wrap; /* Для того, чтобы карточки могли перенести на новую строку */
  justify-content: center; /* Центрируем карточки по горизонтали */
  gap: 16px; /* Межкарточный отступ */
  padding: 0 20px; /* Отступы слева и справа */
}

.transactions-list h2 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
