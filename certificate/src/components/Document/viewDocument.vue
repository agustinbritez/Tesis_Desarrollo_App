<template>
  <div class="">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Document Create</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        
      </div>
      <div class="card-action red accent-2"></div>
    </div>
    <br />
  </div>
</template>

<script>
import { ref,provide } from 'vue';
import DropFile from "./DropFile.vue";
export default {
  components: {
    DropFile,
  },
  setup() {
    const uploadedFiles = ref([]);
    provide("uploadedFiles", uploadedFiles);
    return { uploadedFiles };
  },
  methods: {
     
  },
};
</script>