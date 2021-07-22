<template>
  <div>
    <v-row justify="center">
      <v-col cols="3">
        <Doughnuts :chart-data="chartData"></Doughnuts>
      </v-col>
      <v-col cols="3">
        <LineChart></LineChart>
      </v-col>
      <v-col cols="3">
        <img style="width: 95%" src="../static/sample-img1.png" />
      </v-col>
      <v-col cols="3">
        <v-date-picker></v-date-picker>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="3">
        <img style="width: 100%;" src="../static/sample-img2.png" />
      </v-col>
      <v-col cols="3">
        <Bar></Bar>
      </v-col>
      <v-col cols="3">
        <Radar></Radar>
      </v-col>
      <v-col cols="3">
        <v-list-item-avatar tile size="250" color="grey"></v-list-item-avatar>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Doughnuts from "~/components/Doughnuts.vue";
import LineChart from "~/components/Line.vue";
import Bar from "~/components/Bar.vue";
import Radar from "~/components/Radar.vue";
import colors from "vuetify/es5/util/colors";

export default Vue.extend({
  components: { Doughnuts, LineChart, Bar },
  name: "Index",
  layout: "loggedin",

  data() {
    return {
      chartData: {
        datasets: [
          {
            data: [35, 58, 91, 68],
            backgroundColor: [
              colors.red.lighten1,
              colors.blue.lighten1,
              colors.yellow.lighten1,
              colors.green.lighten1
            ]
          }
        ],
        labels: ["red", "blue", "yellow", "green"]
      },
      chartDataValues: [35, 58, 91, 68],
      chartColors: [
        colors.red.lighten1,
        colors.blue.lighten1,
        colors.yellow.lighten1,
        colors.green.lighten1
      ],
      chartLabels: ["red", "blue", "yellow", "green"]
    };
  }
});
</script>

<style>
.v-picker__title .v-date-picker-title {
  line-height: 0;
}
</style>
