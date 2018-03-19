<template>
 <div class="graph-container">
   <form>
     <select v-model="groupBy" name="listingGraph">
         <option value="price">Price</option>
         <option value="city">City</option>
         <option value="sqFootage">Square Footage</option>
     </select>
     </form>
    <div class="graph container">
        <bar-chart v-if="allListings" :chart-data="chartData" :options="options" />
    </div>
 </div>  
</template>

<script>
import BarChart from "./BarChart";
export default {
  name: "ListingGraph",
  components: { BarChart },
  data() {
    return {
      groupBy: "price",
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
    this.getData();
  },
  computed: {
    chartData: function() {
      if (this.groupBy === "price") {
        let maxPrice = this.allListings.reduce((max, listing) => {
          if (max < listing.price) {
            return listing.price;
          }
          return max;
        }, 0);
        return this.getHistogrammedNumericalData(maxPrice, "Prices");
      } else if (this.groupBy === 'City') {
        return this.getCityData();
      } else if (this.groupBy === 'sqFootage') {
        let maxSqFt = this.allListings.reduce((max, listing) => {
          if (max < listing.sqFootage) {
            return listing.sqFootage;
          }
          return max;
        }, 0);
        return this.getHistogrammedNumericalData(maxSqFt, "Square Footage");
      }
    },
    allListings: function() {
      
      let listings = this.$store.getters.listings;
      listings = listings.concat(this.$store.getters.user.listings);
      return listings;
    }
  },
  methods: {
    getData: function() {
      this.$store.dispatch("getData");
    },
    getCityData: function() {
      let labels = [];
      let data = [];
      this.allListings.forEach(listing => {
        for (let i = 0; i < labels.length; i++) {
          if (listing.city === labels[i].city) {
            labels[i].number += 1;
            return;
          }
        }
        labels.push({
          number: 1,
          city: listing.city
        });
      });
      for (let label in labels) {
        data.push(labels[i].number);
      }
      return {
        labels: labels.map((label) => label.city),
        datasets: [
          {
            label: "Number of Listings per City",
            backgroundColor: '#f87979',
            data: data
          }
        ]
      }
    },
    getHistogrammedNumericalData: function(maxVal, title) {
       let labels = [];
      for (let num = 0; num < maxVal; num += 100) {
        let right = num + 100;
        let label = num.toString() + "-" + right.toString();
        labels.push({
          left: num,
          right: right,
          label: label,
          number: 0
        });
      }
      let data = [];
      this.allListings.forEach(listing => {
        for (let i = 0; i < labels.length; i++) {
          let price = listing.price;
          let label = labels[i];
          if (price > label.left && price <= label.right) {
            label.number += 1;
          }
        }
      });
      for (let label in labels) {
        data.push(labels[label].number);
      }
      console.log(data);
      return {
        labels: labels.map(label => label.label),
        datasets: [
          {
            label: "Histogram of " + title,
            backgroundColor: "#000000",
            data: data
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
 .graph {
   max-width: 900px;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .graph-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
 }
 bar-chart {
   width: 100%;
 }
</style>