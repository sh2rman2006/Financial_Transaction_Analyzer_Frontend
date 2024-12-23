export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("jwtToken");
  if (token.value) {
    try {
      const response = await $fetch("http://localhost:8080/auth/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      return;
    } catch (error) {
      return navigateTo("/welcome");
    }
  }
  return navigateTo("/welcome");
});
