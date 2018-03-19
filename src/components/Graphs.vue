<template>
<div id="graphs-container">
  <div>
  <listing-graph></listing-graph>
  <listing-form></listing-form>
  </div>
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
    this.$store.dispatch("addUser");
  }
};
</script>

<style scoped>
#graph-container {
  display: flex;
  flex-direction: row;
}
</style>