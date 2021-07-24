<script lang="ts">
import Vue from "vue";
import { Line } from "vue-chartjs";
export default Vue.extend({
  name: "Line",
  extends: Line,
  data() {
    return {
      options: {
        type: Object,
        default: () => {}
      }
    };
  },

  mounted() {
    // @ts-ignore
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
          }
        ]
      },
      {}
    );
  }
});
</script>
