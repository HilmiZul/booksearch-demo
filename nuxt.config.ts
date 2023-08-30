export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/style.css",
  ],
  modules: ["dayjs-nuxt"],
  app: {
    head: {
      title: "📚 Book Search Tools.",
      script: ["https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"]
    }
  }
})
