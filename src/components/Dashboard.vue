<template>
  <div class="row container" id="dashboard">
    <table class="col s6 m3 l6 offset-s1 offset-m3 offest-l3 striped">
        <tr v-for="stat in statistics" :key="stat.label"  is="Entry" :label="stat.label" :data="stat.data">
        </tr>
    </table>
    <div class="spacer"></div>
  </div>
  
</template>

<script>
import Entry from "./Entry";
export default {
  name: "Dashboard",
  computed: {
    listings: function() {
      let listing = this.$store.getters.listings;
      console.log(listing);
      return listing;
    },
    statistics() {
      console.log("Updating statistics...");
      const stats = [];
      try {
        stats.push(
          this.makeStatistic("Total number of listings", this.listings.length)
        );
      } catch (error) {
        console.log(error);
      }
      // console.log('Finding the most recent listing');
      try {
        stats.push(
          this.makeStatistic(
            "Most recent listing",
            this.listings
              .filter(listing => listing["age"] !== "Unknown")
              .reduce((least, currentListing) => {
                const currentTime = currentListing["age"];
                if (
                  currentTime &&
                  this.shorterTime(least, currentTime) == currentTime
                ) {
                  return currentTime;
                }
                return least;
              }, "1000000 years")
          )
        );
      } catch (err) {
        console.log(err);
      }

      try {
        stats.push(
          this.makeStatistic(
            "Oldest listing",
            this.listings.reduce((oldest, current) => {
              const currentTime = current["age"];
              if (
                currentTime &&
                this.shorterTime(currentTime, oldest) == oldest
              ) {
                return currentTime;
              }
              return oldest;
            }, "0 0")
          )
        );
      } catch (error) {
        console.error(error);
      }

      try {
        const prices = this.listings
          .map(listing => {
            if (listing["price"]) {
              return listing["price"];
            } else {
              return -1;
            }
          })
          .filter(price => price > 0);
        try {
          let averagePrice =
            prices.reduce((sum, next) => sum + next) / prices.length;
          averagePrice = Math.round(averagePrice * 100) / 100;
          stats.push(
            this.makeStatistic("Average price", "$" + averagePrice.toString())
          );
        } catch (error) {
          console.error(error);
        }
        try {
          let maxPrice = Math.round(Math.max(...prices) * 100) / 100;
          stats.push(this.makeStatistic("Max price", "$" + maxPrice));
        } catch (error) {
          console.error(error);
        }

        try {
          let minPrice = Math.min(...prices.filter(price => price > 10));
          stats.push(this.makeStatistic("Minimum price", "$" + minPrice));
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const squareFeet = this.listings
          .map(listing => {
            if (listing["sqFootage"]) {
              return parseFloat(listing["sqFootage"]);
            } else {
              return -1;
            }
          })
          .filter(sqft => sqft > 0);
        try {
          let averageSquareFeet =
            squareFeet.reduce((sum, next) => sum + next) / squareFeet.length;
          averageSquareFeet = Math.round(averageSquareFeet * 100) / 100;
          stats.push(
            this.makeStatistic(
              "Average square footage",
              averageSquareFeet.toString() + "'"
            )
          );
        } catch (error) {
          console.error(error);
        }

        try {
          let maxSquareFeet = Math.round(Math.max(...squareFeet) * 100) / 100;
          stats.push(
            this.makeStatistic(
              "Max square footage",
              maxSquareFeet.toString() + "'"
            )
          );
        } catch (error) {
          console.error(error);
        }

        try {
          let minSquareFeet = Math.round(Math.min(...squareFeet) * 100) / 100;
          stats.push(
            this.makeStatistic(
              "Minimum square footage",
              minSquareFeet.toString() + "'"
            )
          );
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
      return stats;
    }
  },
  components: { Entry },
  created() {
    console.log("Fetching listings...");
    if (
      this.$store.getters.listings &&
      this.$store.getters.listings.length === 0
    ) {
      this.$store.dispatch("getData");
    }
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
    }
  }
};
</script>

<style>
#dashboard {
  display: flex;
  align-items: center;
}

.spacer {
  padding-right: 20%;
}
</style>