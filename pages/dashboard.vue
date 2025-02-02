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
const getTransactionsByYearAndMonth = async (reqYear, reqMonth) => {
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
// change date
const isNextButtonAble = computed(() => {
  let now = new Date();
  if (
    currentMonth.value == now.getMonth() + 1 &&
    currentYear.value == now.getFullYear()
  ) {
    return false;
  }
  return true;
});

const toNextMonth = () => {
  currentMonth.value =
    currentMonth.value + 1 == 13 ? 1 : currentMonth.value + 1;
  currentYear.value =
    currentMonth.value == 1 ? currentYear.value + 1 : currentYear.value;
  getTransactionsByYearAndMonth(currentYear.value, currentMonth.value);
};

const toPreviosMonth = () => {
  currentMonth.value =
    currentMonth.value - 1 == 0 ? 12 : currentMonth.value - 1;
  currentYear.value =
    currentMonth.value == 12 ? currentYear.value - 1 : currentYear.value;
  getTransactionsByYearAndMonth(currentYear.value, currentMonth.value);
};

const monthsMap = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
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
let chartInstance = null; // Глобальная переменная для хранения экземпляра диаграммы

const renderChart = () => {
  // Убедитесь, что canvas существует
  if (!chartRef.value) {
    console.error("chartRef is not defined or not mounted");
    return;
  }

  // Если экземпляр диаграммы существует, уничтожаем его
  if (chartInstance instanceof Chart) {
    chartInstance.destroy();
  }

  // Создаем новый экземпляр диаграммы
  try {
    chartInstance = new Chart(chartRef.value, {
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
  } catch (error) {
    console.error("Ошибка при создании диаграммы:", error);
  }
};

onMounted(async () => {
  await getTransactionsByYearAndMonth(currentYear.value, currentMonth.value);
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
          <p class="total">${{ Math.round(total.toFixed(2)) }}</p>
        </div>
      </div>

      <div class="chart">
        <canvas ref="chartRef"></canvas>
      </div>

      <div class="non-info" v-if="transactionsStore.transactions.length == 0">
        <Icon name="heroicons:inbox-stack" size="48" />
        <h2>Нет транзакций за этот период</h2>
      </div>

      <div class="change-date">
        <button @click="toPreviosMonth">К прошлому</button>
        <h2>{{ monthsMap[currentMonth - 1] }} {{ currentYear }}</h2>
        <button @click="toNextMonth" v-show="isNextButtonAble">
          К следующему
        </button>
        <div class="placeholder" v-if="!isNextButtonAble"></div>
      </div>
    </section>

    <section
      class="transactions-list"
      v-if="transactionsStore.transactions.length > 0"
    >
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

  &:hover {
    color: #0056b3;
  }
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 16px;
  padding: 0 20px;
}

.transactions-list h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.change-date {
  margin: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.change-date > * {
  text-align: center;
}

.placeholder {
  pointer-events: none;
}

.change-date button {
  white-space: nowrap;
  padding: 0.8em 1.2em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #002255;
  }
}

.change-date h2 {
  font-size: 1.2em;
  min-width: 100px;
  white-space: nowrap;
}

.change-date h2 {
  font-size: 1.2em;
  min-width: 100px;
  white-space: nowrap;
}

.change-date h2 {
  min-width: 100px;
  white-space: nowrap;
}

.non-info {
  text-align: center;
}
</style>
