<script setup>
definePageMeta({
  middleware: "auth-welcome-page",
});
const axios = useNuxtApp().$axios;

</script>

<template>
  <div>home</div>
</template>

<style scoped></style>
