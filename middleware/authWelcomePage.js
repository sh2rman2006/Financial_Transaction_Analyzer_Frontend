export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }

  const axios = useNuxtApp().$axios;
  console.log(sessionStorage.getItem("jwtToken"));

  try {
    await axios.get("/auth/protected", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    return;
  } catch (error) {
    return navigateTo("/welcome")
  }
  
});
