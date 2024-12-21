export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return navigateTo(to.fullPath);
  }

  return navigateTo("/login");
});
