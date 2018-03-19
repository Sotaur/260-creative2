<template>
<form v-on:submit.prevent="addListing" class="container">
    <input type="text" v-model="priceText"> <label>Price</label>
    <input type="text" v-model="city"> <label>City</label>
    <input type="text" v-model="sqFtText"> <label>Square Footage</label>
    <br> <br>
    <input type="submit">
    <br> <br>
    <button v-on:click="resetListings()">Reset Listings</button>
</form>
</template>

<script>
export default {
  name: "ListingForm",
  data() {
      return {
          priceText: '',
          city: '',
          sqFtText: '',
      }
  },
  methods: {
      addListing() {
          let price = parseFloat(this.priceText.replace(/,/g, "").replace(/\$/g, ""));
          let sqFt = parseFloat(this.sqFtText.replace(/,/g, ''));
          this.$store.dispatch("addListing", {
                city: this.city,
                sqFootage: sqFt,
                price: price,
                age: ''
          });
          this.priceText = '';
          this.city = '';
          this.sqFtText = '';
      },
      resetListings() {
          this.$store.dispatch("resetListings");
      }
  }
}
</script>

<style scoped>
    .container {
        max-width: 300px;
    }
</style>
