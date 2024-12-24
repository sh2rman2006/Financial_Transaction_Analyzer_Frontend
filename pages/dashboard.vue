<!-- <script setup>
import Chart from "chart.js/auto";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "dashboard",
});

const axios = useNuxtApp().$axios;
const monthlyTransactionsStore = useTransactionsStore();
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const getTransactionsAtLastMonth = async () => {
  const token = useCookie("jwtToken");
  await axios
    .get("/transaction/getMonthHistory", {
      headers: { Authorization: `Bearer ${token.value}` },
      params: {
        year: currentYear,
        month: currentMonth,
      },
    })
    .then((response) => {
      monthlyTransactionsStore.setTransactions(response.data);
    });
};

onMounted(getTransactionsAtLastMonth);

</script>

<template>
  <div></div>
</template>

<style scoped></style> -->
<script setup>
import Chart from "chart.js/auto";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "dashboard",
});

const axios = useNuxtApp().$axios;
const monthlyTransactionsStore = useTransactionsStore();
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

// Создаем ссылку на canvas для диаграммы
const chartRef = ref(null);

const getTransactionsAtLastMonth = async () => {
  const token = useCookie("jwtToken");
  await axios
    .get("/transaction/getMonthHistory", {
      headers: { Authorization: `Bearer ${token.value}` },
      params: {
        year: currentYear,
        month: currentMonth,
      },
    })
    .then((response) => {
      monthlyTransactionsStore.setTransactions(response.data);
      updateChart(); // Обновляем график после загрузки данных
    });
};

const updateChart = () => {
  // Подготовка данных для круговой диаграммы
  const data = {
    labels: ["Credit", "Debit", "Transfer", "Fee"],
    datasets: [
      {
        data: [
          monthlyTransactionsStore.countOfType("CREDIT"),
          monthlyTransactionsStore.countOfType("DEBIT"),
          monthlyTransactionsStore.countOfType("TRANSFER"),
          monthlyTransactionsStore.countOfType("FEE"),
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF4384", "#36A2BB", "#FFAD56", "#4BC0B0"],
      },
    ],
  };

  // Инициализация или обновление графика
  if (chartRef.value && chartRef.value.chart) {
    chartRef.value.chart.data = data;
    chartRef.value.chart.update();
  } else {
    new Chart(chartRef.value, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `${tooltipItem.label}: ${value}`;
              },
            },
          },
        },
      },
    });
  }
};

onMounted(() => {
  nextTick(() => {
    getTransactionsAtLastMonth();
  });
});
</script>

<template>
  <div>
    <canvas ref="chartRef" width="300" height="300"></canvas>
  </div>
</template>

<style scoped>
canvas {
  max-width: 500px; 
  max-height: 500px;
  min-height: 500px;
  min-width: 500px;
  margin: 0 auto; 
}
</style>
