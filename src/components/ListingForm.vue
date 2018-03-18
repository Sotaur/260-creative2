<template>
<form v-on:submit.prevent="addListing">
    <input type="text" v-model="priceText"> <label>Price</label>
    <input type="text" v-model="city"> <label>City</label>
    <input type="text" v-model="sqFtText"> <label>Square Footage</label>
    <input type="submit">
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
          let sqFt = parseFloat(sqFtText.replace(/,/g, ''));
          this.$store.dispatch("addListing", {
              city: city,
                sqFootage: sqft,
                price: price,
                age: ''
          });
      }
  }
}
</script>

<style>

</style>
