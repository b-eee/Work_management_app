export default function(inject) {
  // Set baseURL to something different
  this.$axios.defaults.baseURL(process.env.baseUrl);

  if (this.$cookies.get("token")) {
    this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$cookies.get(
      "token"
    )}`;
  }

  // Inject to context as $api
  inject("api", api);
}
