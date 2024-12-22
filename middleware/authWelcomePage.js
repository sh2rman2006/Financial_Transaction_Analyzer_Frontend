export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data, error } = await useFetch(
    "http://localhost:8080/auth/protected"
  );
  console.log(error);
  console.log(error.value);

  if (error) {
    return navigateTo("/welcome");
  }

  return navigateTo(to.fullPath);
});
