<template>
<div>
  <listing-graph></listing-graph>
  <listing-form></listing-form>
  <user-pie></user-pie>
</div>
</template>

<script>
import ListingGraph from "./ListingGraph";
import UserPie from "./UserPie";
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