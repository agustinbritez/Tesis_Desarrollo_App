<template>
  <div>
    <nav class="nav-extended" :class="{color,text_color}">
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
            <ButtonSetting/>
          </li>
        </ul>
        <ul id="nav-hidden" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
          <SearchGlobal/>
      </div>

      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="tab">
            <router-link :to="{ name: 'Event' }">Eventos</router-link>
          </li>
          <li class="tab">
            <router-link :to="{ name: 'Areas' }">Areas</router-link>
          </li>
          <li class="tab"></li>
          <li class="tab"><a class="" href="#test2">Test 2</a></li>
          <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
          <li class="tab"><a href="#">Test 4</a></li>
        </ul>
      </div>
    </nav>
    
   

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
import SearchGlobal from './elements/SearchGlobal.vue';
import ButtonSetting from './elements/ButtonSetting.vue';

export default {
  name: "NavBar",
  data() {
    return {};
  },
  props:{
    color:String,
    text_color:String,
  },
  computed: {
    ...mapState(["account"]),
  },
  components: {
    SideNav,
    SearchGlobal,
    ButtonSetting,
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
<style>
  
</style>