import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - work_management_app",
    title: "work_management_app",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { 'http-equiv': "Content-Security-Policy", content: "default-src 'self';style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net/ data:;script-src 'self' 'unsafe-inline' 'unsafe-eval';"}
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  env: {
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL,
    app_id: process.env.APP_ID,
    db_id: process.env.DB_ID
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/vee-validate", "@/plugins/vuetify"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],

  axios: {
    baseURL: process.env.BASE_URL
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ],
    transpile: ["vee-validate/dist/rules"]
  },

  router: {
    middleware: "auth"
  }
};
