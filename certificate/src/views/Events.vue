<template>
  <div class="container">
    <listEvents area_id="0" />
  </div>
</template>
<script>
import listEvents from "../components/Event/listEvents.vue";
export default {
  name: "Events",
  components: {
    listEvents,
  },
};
</script>

