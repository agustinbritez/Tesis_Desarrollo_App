<template>
  <div>
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo hide-on-med-and-down">Logo</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
        <ul id="nav-not-hidden" class="right">
          <li id="" v-if="account === ''">
            <a href="#" class="btn light-blue accent-3 connect-wallet" @click="connectAccount()"
              >Connect to a Wallet</a
            >
          </li>

          <li id="" v-if="account !== ''">
            <a href="#" class="btn connect-wallet" @click="verificationAccount()">Connected </a>
          </li>

          <li>
            <a href="#" class="dropdown-trigger" data-target="dropdown-setting"
              ><i class="material-icons">more_vert</i></a
            >
          </li>
        </ul>
        <ul id="nav-hidden" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
        <!-- <ul class=" tabs-transparent">
          <li class="tab"><router-link to="/">Home</router-link></li>
          <li class="tab"><router-link to="/about">About</router-link></li>
          <li class="tab"><a class="active" href="#test2">Test 2</a></li>
          <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
          <li class="tab"><a href="#">Test 4</a></li>
        </ul> -->
      </div>
      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="tab">
            <router-link :to="{ name: 'Event' }">Eventos</router-link>
          </li>
          <li class="tab"></li>
          <li class="tab"><a class="active" href="#test2">Test 2</a></li>
          <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
          <li class="tab"><a href="#">Test 4</a></li>
        </ul>
      </div>
    </nav>
    
    <ul id="dropdown-setting" class="dropdown-content">
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">three</a></li>
      <li>
        <a href="#!"><i class="material-icons">view_module</i>four</a>
      </li>
      <li>
        <a href="#!"><i class="material-icons">cloud</i>five</a>
      </li>
    </ul>

    <ul class="sidenav" id="mobile-demo">
      <a href="#" class="brand-logo">Logo</a>
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul>
  </div>
</template>

<script>
// const $ = require('jquery')
import SideNav from "@/components/SideNav.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { inject } from 'vue';
export default {
  name: "NavBar",
  data() {
    return {};
  },
  computed: {
    ...mapState(["account"]),
  },
  components: {
    SideNav,
  },
  methods: {
    ...mapMutations(["connectAccount", "verificationAccount"]),
  },
  mounted() {
    //vertifica si esta conectado la Cuenta
    document.getElementsByClassName('connect-wallet')[0].click() ;
    
  },
};
</script>