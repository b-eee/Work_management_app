<script lang="ts">
import Vue from "vue";
import { Doughnut } from "vue-chartjs";
export default Vue.extend({
  name: 'Doughnuts',
  extends: Doughnut,
  props: {
    chartData: {},
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options);
  }
});
</script>
