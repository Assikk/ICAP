const baseUrl = 'http://83.222.9.16:7485/'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ICAP ADMIN',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vuelidate.js'},
    {src: '~/plugins/checkPermission.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: baseUrl,
  },
  auth: {
    axios: {
      baseUrl: baseUrl
    },
    strategies: {
      local: {
        url: baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
        token: {
          property: "access",
          maxAge: false,
          global: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: `${baseUrl}accounts/login/`,
          },
          logout: {
            url: `${baseUrl}accounts/logout/`,
          },
          user: {
            url: `${baseUrl}accounts/who-am-i/`,
          },
        },
        autoFetchUser: true
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      callback: '/login',
      home: "/",
    },
  },
  router: {
    middleware: ["auth"],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
