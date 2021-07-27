<template>
  <div>
    <v-text-field
      v-model="keyword"
      label="search keyword"
    ></v-text-field>
    <div v-if="keyword" class="google-map">
      <iframe
        :src="
          `https://www.google.com/maps/embed/v1/place?key=${mapApiKey}
    &q=${keyword}`
        "
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen
      ></iframe>
    </div>
    <div v-else class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Index",
  layout: "loggedin",

  data() {
    return {
      keyword: "Hexabase",
      mapApiKey: process.env.mapApiKey
    };
  }
});
</script>

<style scoped>
.google-map {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
}

.google-map iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
