<template>
  <div>
    <table class="col s10 m6 l6 offset-s1 offset-m3 offest-l6 striped">
        <tr v-for="stat in statistics" :key="stat.label"  is="Entry" :label="stat.label" :data="stat.data">
        </tr>
    </table>
  </div>
  
</template>

<script>
import Entry from "./Entry";
export default {
  name: "Dashboard",
  data() {
    return {
      url: "http://18.219.39.127/api/listings",
      listings: "",
      statistics: {}
    };
  },
  components: { Entry },
  created() {
    console.log("Fetching listings...");
    fetch(this.url).then(
      function(response) {
        console.log("Got listings!");
        response.json().then(
          function(json) {
            this.listings = json["data"];
            this.calculateStatistics();
          }.bind(this)
        );
      }.bind(this)
    );
    return true;
  },
  methods: {
    shorterTime: function(leftTime, rightTime) {
      let leftArray = leftTime.split(" ");
      let rightArray = rightTime.split(" ");
      let leftUnit = this.unitToNumber(leftArray[1]);
      let leftNumber = parseInt(leftArray[0]);
      let rightUnit = this.unitToNumber(rightArray[1]);
      let rightNumber = parseInt(rightArray[0]);
      if (leftUnit == rightUnit) {
        if (rightNumber < leftNumber) {
          return leftTime;
        }
        return rightTime;
      } else if (leftUnit > rightUnit) {
        return rightTime;
      } else {
        return leftTime;
      }
    },
    unitToNumber: function(unit) {
      switch (unit) {
        case ("year", "years"):
          return 5;
        case ("day", "days"):
          return 4;
        case ("hour", "hours"):
          return 3;
        case ("minute", "minutes"):
          return 2;
        case ("second", "seconds"):
          return 1;
        default:
          return 0;
      }
    },
    makeStatistic: function(label, data) {
      return {
        label: label,
        data: data
      };
    },
    calculateStatistics: function() {
      console.log("Updating statistics...");
      const stats = [];
      stats.push(
        this.makeStatistic("Total number of listings", this.listings.length)
      );
      // console.log('Finding the most recent listing');

      stats.push(
        this.makeStatistic(
          "Most recent listing",
          this.listings.reduce((least, currentListing) => {
            const currentTime = currentListing["timeOnline"];
            if (this.shorterTime(least, currentTime) == currentTime) {
              return currentTime;
            }
            return least;
          }, "1000000 years")
        )
      );
      stats.push(
        this.makeStatistic(
          "Oldest listing",
          this.listings.reduce((oldest, current) => {
            const currentTime = current["timeOnline"];
            if (this.shorterTime(currentTime, oldest) == oldest) {
              return currentTime;
            }
            return oldest;
          }, "0 0")
        )
      );

      const prices = this.listings.map(listing => {
        return parseFloat(
          listing["price"].replace(/,/g, "").replace(/\$/g, "")
        );
      });

      let averagePrice =
        prices.reduce((sum, next) => sum + next) / prices.length;
      averagePrice = Math.round(averagePrice * 100) / 100;
      stats.push(
        this.makeStatistic("Average price", "$" + averagePrice.toString())
      );

      let maxPrice = Math.round(Math.max(...prices) * 100) / 100;
      stats.push(this.makeStatistic("Max price", "$" + maxPrice));

      let minPrice = Math.min(...prices.filter(price => price > 10));
      stats.push(this.makeStatistic("Minimum price", "$" + minPrice));

      const squareFeet = this.listings.map(listing =>
        parseInt(listing["sqft"])
      );

      let averageSquareFeet =
        squareFeet.reduce((sum, next) => sum + next) / squareFeet.length;
      averageSquareFeet = Math.round(averageSquareFeet * 100) / 100;
      stats.push(
        this.makeStatistic(
          "Average square footage",
          averageSquareFeet.toString() + "'"
        )
      );

      let maxSquareFeet = Math.round(Math.max(...squareFeet) * 100) / 100;
      stats.push(
        this.makeStatistic("Max square footage", maxSquareFeet.toString() + "'")
      );

      let minSquareFeet = Math.round(Math.min(...squareFeet) * 100) / 100;
      stats.push(
        this.makeStatistic(
          "Minimum square footage",
          minSquareFeet.toString() + "'"
        )
      );
      this.statistics = stats;
    }
  }
};
</script>
