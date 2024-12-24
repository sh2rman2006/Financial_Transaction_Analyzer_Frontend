<script setup>
definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const route = useRoute();
const axios = useNuxtApp().$axios;

const transactions = reactive([]);
const totalPages = ref(0);
const currentPage = ref(+route.params.id);
const pageInput = ref(currentPage.value + 1); // Изначально вводим текущую страницу + 1

const getPageTransactions = async () => {
  const response = await axios.get("/transaction/pagination", {
    params: { size: 10, page: currentPage.value },
    headers: { Authorization: `Bearer ${useCookie("jwtToken").value}` },
  });
  transactions.splice(0, transactions.length, ...response.data.content);
  totalPages.value = response.data.page.totalPages;
};

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    router.push(`/getAll/page-${page}`);
    currentPage.value = page;
    getPageTransactions();
  }
};

const goToPageFromInput = () => {
  const page = parseInt(pageInput.value); // Преобразуем в целое число
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page - 1); // Уменьшаем на 1, так как страницы начинаются с 0
  } else {
    alert(`Please enter a valid page number between 1 and ${totalPages.value}`);
  }
};

onMounted(getPageTransactions);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(currentPage.value - 2, 0);
  const end = Math.min(currentPage.value + 2, totalPages.value - 1);
  for (let i = start; i <= end && pages.length < 5; i++) {
    pages.push(i + 1); // Индексация страниц начинается с 1
  }
  if (start > 0) {
    if (pages[0] > 1) pages.unshift("...");
  }
  if (end < totalPages.value - 1) {
    if (pages[pages.length - 1] < totalPages.value) pages.push("...");
    pages.push(totalPages.value);
  }

  return pages;
});
</script>

<template>
  <div class="transactions-container">
    <div class="transactions-list">
      <TransactionCard
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>

    <div class="pagination">
      <button
        v-if="currentPage > 0"
        class="page-button"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-button"
        :class="{ active: page - 1 === currentPage }"
        @click="page !== '...' && goToPage(page - 1)"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>

      <button
        v-if="currentPage < totalPages - 1"
        class="page-button"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>

      <!-- Input for page number -->
      <div class="page-input-container">
        <input
          v-model="pageInput"
          type="number"
          min="1"
          :max="totalPages"
          placeholder="Page"
          class="page-input"
        />
        <button @click="goToPageFromInput" class="go-button">Перейти</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions-container {
  padding: 16px;
  padding-bottom: 100px;
}

.transactions-list {
  display: flex;
  flex-direction: column;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.page-button {
  border: 1px solid #007bff;
  background: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: #007bff;
}

.page-button.active {
  background: #007bff;
  color: #fff;
}

.page-button:disabled {
  cursor: not-allowed;
  color: #ccc;
}

.page-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
}

.page-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #007bff;
  border-radius: 4px;
  width: 60px;
  text-align: center;
}

.go-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.go-button:hover {
  background-color: #0056b3;
}
</style>
