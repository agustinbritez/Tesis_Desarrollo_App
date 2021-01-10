<template>
  <div>
    <NavBar />
    <!-- router-view muestra el componente relacionado a la ruta actual en el NavBar estan como se llaman alas rutas -->
    <router-view />
    <button @click="alert(this.AppWeb3.getOrganitation())">button</button>
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
import { provide, ref } from "vue";
import * as AppWeb3 from "./app/app.js";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {},
  setup() {},
  mounted() {
    //Activar animaciones
    M.AutoInit();
    //animacion para setting
    var dropsdowns = document.querySelectorAll(".dropdown-trigger");
    var options = { coverTrigger: false };
    var instances = M.Dropdown.init(dropsdowns, options);


      let events =  AppWeb3.getAllEvents(
        1,
        "0x255A43ac4ed05F4139607B33523a591ACE5a4031",
        0,
        10
      );
      
    

    //funcionan eran para pruebas
    // console.log(this.setOrganitation('Agus2'));
    //  let result= AppWeb3.getOrganitation();
    // getOrganitation();
    // async function getOrganitation () {
    // 	let result= await AppWeb3.getOrganitation();
    // 	console.log(result);
    // };

    // let result= this.getOrganitation();
    // console.log(result);
    // console.log('xxx');
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
