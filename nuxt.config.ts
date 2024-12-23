// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@pinia/nuxt"],
  css: ["normalize.css"],
  fonts: {
    families: [
      { name: `Roboto`, provider: `google` },
      { name: `Inter`, provider: `google` },
      { name: `Poppins`, provider: `google` },
      { name: `Lato`, provider: `google` },
    ],
  },
});
