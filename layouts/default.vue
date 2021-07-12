<template>
  <v-app id="app">
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['auth'],
})
</script>

<style>
.modal {
  overflow: hidden;
}
</style>
