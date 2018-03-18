<template>
<div>
  <listing-graph></listing-graph>
  <listing-form></listing-form>
</div>
</template>

<script>
import ListingGraph from "./ListingGraph";
import ListingForm from "./ListingForm";
export default {
  name: "Graphs",
  components: { ListingGraph, ListingForm, UserPie },
  created: function() {
    this.$store.dispatch('addUser');
  }
};
</script>

<style scoped>

</style>