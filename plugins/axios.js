import axios from 'axios';

export default defineNuxtPlugin(() => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080', // Базовый URL для API
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
