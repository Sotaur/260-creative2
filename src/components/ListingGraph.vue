<template>
 <div>
     <select v-model="groupBy" name="listingGraph">
         <option value="price">Price</option>
         <option value="city">City</option>
         <option value="sqFootage">Square Footage</option>
     </select>
    <input>
    <div class="graph">
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
      allListings: [],
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
      let listings = this.$store.listings;
      listings.concat(this.$store.user.listings);
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
      for (let num = 0; num < max; num += 100) {
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
        data.push(label.number);
      }
      return {
        labels: labels,
        datasets: [
          {
            label: "Histogram of " + title,
            backgroundColor: "#f87979",
            data: data
          }
        ]
      };
    }
  }
};
</script>

<style scoped>

</style>