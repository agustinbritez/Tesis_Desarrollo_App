<template>
  <div class="container">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Eventos</h1>
      </div>
      <div class="card-content">
        <table class="highlight centered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>ID Area</th>
              <th>Cant Documents</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="event in eventsArray" :key="event.id">
              <td>{{ event.id }}</td>
              <td>{{ event.name }}</td>
              <td>{{ event.description }}</td>
              <td>{{ event.area_id }}</td>
              <td>{{ event.cantDocument }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-action red accent-2">hika</div>
    </div>
  <button @click="getAllEvents">buttonx</button>
    <br />
  </div>
</template>

<script>
import { provide, ref, watchEffect } from "vue";
import { mapState } from "vuex";
import * as AppWeb3 from "../app/app.js";
export default {
  name: "Event",
  setup() {
    const eventsArray = ref([]);
    provide("eventsArray", eventsArray);

    // watchEffect(()=>{
    //   console.log(eventsArray.length);
    // });
    
    return {eventsArray}
  },
  data() {
    return {
      // eventsArray: []
    }
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    async getAllEvents() {
      let events = await AppWeb3.getAllEvents(
        1,
        "0x255A43ac4ed05F4139607B33523a591ACE5a4031",
        0,
        10
      );
      this.eventsArray=events;
      events.forEach(element => {
        console.log(element.name);
        
      });
      return events;
    },
    async setEvent(name) {
      let result = await AppWeb3.setEvent(name, this.account);
      return result;
    },
  },
  mounted() {
    // this.eventsArray = this.getAllEvents();
  },
  updated() {},
};
</script>