<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="https://www.unam.edu.ar/templates/yootheme/cache/UNAM-HOME-ac63afab.webp" /> -->
    <!-- <h1>{{organitation}}</h1> -->
    <h3>Certification System</h3>

    <router-link :to="{ name: 'FindDocument' }">
      <button class="btn pulse">certify documents</button></router-link
    >
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getOrganitation } from "../app/app.js";
import { inject } from "vue";

export default {
  name: "Home",
  components: {},
  setup(props) {
    let organitation = inject("organitation");
    return { organitation };
  },
  mounted() {
    getOrganitation().then((org) => {
      this.organitation = org;
    });
  },
};
</script>
<style scoped>
body {
  background-color: black;
}
</style>>
  

