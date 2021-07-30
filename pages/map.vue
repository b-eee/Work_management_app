<template>
  <div>
    <div class="google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.155277066845!2d139.77218531544662!3d35.69779633667034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ea7088c2431%3A0x88c18d925f59141!2z44OT44O844OG44Kv44OO44Ot44K444O85qCq5byP5Lya56S-!5e0!3m2!1sen!2sjp!4v1625322451746!5m2!1sen!2sjp"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Index",
  layout: "loggedin"
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
