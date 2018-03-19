<template>
  <div id="pie-container">
    <pie-chart v-if="userStats" :chart-data="chartData" :options="options" />
  </div>
</template>

<script>
import PieChart from './PieChart';
export default {
  name: "UserPie",
  components: { PieChart },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
  },
  computed: {
    userStats() {
      return this.$store.getters.userStatistics;
    },
    chartData() {
      return {
        labels: ["Users", "Sellers"],
        datasets: [
          {
            data: [this.userStats.user, this.userStats.seller],
            backgroundColor: ['#123456','#64dd17']
          }
        ]
      };
    }
  }
};
</script>

<style>
#pie-container {
    max-width: 700px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>
