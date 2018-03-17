<template>
 
</template>

<script>
import ListingGraph from './ListingGraph'
export default {
  name: "Graphs",
  components: { ListingGraph },
  data() {
    return {
      monthText: "1",
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              barPercentage: 0.5
            }
          ]
        }
      }
    };
  },
  created: function() {
    this.getItems();
  },
  computed: {
    month: function() {
      return parseInt(this.monthText);
    },
    chartData: function() {
      let labels = [];
      let data = [];
      // sort by date
      this.items.sort(function(a, b) {
        return b.completedDate - a.completedDate;
      });
      // setup data
      let completedCounts = {};
      for (let day = 1; day < 32; day++) {
        completedCounts[day] = 0;
      }
      this.items.forEach(item => {
        let day = new Date(item.completedDate).getDate();
        let month = new Date(item.completedDate).getMonth();
        console.log(month, this.month);
        if (month === this.month && item.completed) completedCounts[day] += 1;
      });
      for (let day in completedCounts) {
        labels.push(day.toString());
        data.push(completedCounts[day]);
      }
      return {
        labels: labels,
        datasets: [
          {
            label: "Completed Tasks per Day",
            backgroundColor: "#f87979",
            data: data
          }
        ]
      };
    },
    items: function() {
        return this.$store.getters.items;
    }
  },
  methods: {
    getItems: function() {
      this.$store.dispatch('getItems');
    },
    setMonth: function(event) {
      this.month = event;
      console.log(this.month);
    }
  }
};
</script>

<style scoped>


</style>