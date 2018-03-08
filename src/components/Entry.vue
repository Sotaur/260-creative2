<template>
  <tr>
      <td>{{ this.label }}</td>
      <td>{{ this.data }}</td>
    </tr>
</template>

<script>
export default {
  name: "Entry",
  props:['label', 'data']
};
</script>

<style>

</style>
