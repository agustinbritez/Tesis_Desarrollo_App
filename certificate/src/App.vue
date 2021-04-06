<template>
  <div>
    <NavBar :color="''" :text_color="''" />
    <!-- router-view muestra el componente relacionado a la ruta actual en el NavBar estan como se llaman alas rutas -->
    <transition>
      <router-view />
    </transition>

    <PreLoad></PreLoad>
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import PreLoad from "./components/elements/PreLoad.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    PreLoad,
  },
  computed: {
    ...mapState(["account", "isLoading"]),
  },
  methods: {},
  data() {
    return {};
  },
  setup() {},
  mounted() {
    //Activar animaciones
    M.AutoInit();
    //animacion para setting
    var dropsdowns = document.querySelectorAll(".dropdown-trigger");
    var options = { coverTrigger: false };
    var instancesDropsdown = M.Dropdown.init(dropsdowns, options);
       var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
        
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body {
  background-color: lightblue;
}
</style>
