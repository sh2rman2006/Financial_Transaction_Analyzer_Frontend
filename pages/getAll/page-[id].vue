<script setup>
const router = useRouter();
const route = useRoute();
const axios = useNuxtApp().$axios;

const transactions = reactive([]);
const totalPages = ref(0);
const currentPage = ref(+route.params.id);

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

onMounted(getPageTransactions);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(currentPage.value - 2, 0);
  const end = Math.min(currentPage.value + 2, totalPages.value - 1);
  for (let i = start; i <= end && pages.length < 5; i++) {
    pages.push(i + 1);
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
</style>
