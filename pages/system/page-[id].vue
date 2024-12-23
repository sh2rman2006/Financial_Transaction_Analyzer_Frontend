<script setup>
const router = useRouter();
const route = useRoute();
const axios = useNuxtApp().$axios;

const transactions = reactive([]);
const totalPages = ref(``);
const getPageTransactions = async () => {
  let response = await axios.get("/transaction/pagination", {
    params: { size: 10, page: route.params.id },
    headers: { Authorization: `Bearer ${useCookie("jwtToken").value}` },
  });
  transactions.splice(0, transactions.length, ...response.data.content);
  totalPages.value = response.data.page.totalPages;
//   console.log(transactions);
//   console.log(totalPages.value);
};

onMounted(getPageTransactions);
</script>

<template>
  <div></div>
</template>

<style scoped></style>
