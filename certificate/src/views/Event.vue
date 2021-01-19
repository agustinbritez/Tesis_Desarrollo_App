<template>
  <div class="container">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Eventos</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <table class="highlight centered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>ID Area</th>
              <th>Start Event</th>
              <th>End Event</th>
              <th>Cant Documents</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="event in eventsArray" :key="event.id">
              <td>{{ event.id }}</td>
              <td>{{ event.name }}</td>
              <td>{{ event.description }}</td>
              <td>{{ event.area_id }}</td>
              <td>{{ event.startEvent || 'undate' }}</td>
              <td>{{ event.endEvent || 'undate' }}</td>
              <td>{{ event.cantDocument }}</td>
              <td>
                <a href="#" class="blue-text text-accent-4"
                  ><i class="material-icons">visibility</i></a
                >&nbsp;
                <a
                  href="#"
                  @click.prevent="openModal(event)"
                  class="modal-trigger green-text text-accent-4"
                >
                  <i class="material-icons">edit</i> </a
                >&nbsp;
                <a href="#" class="red-text text-accent-4"
                  ><i class="material-icons">delete_forever</i></a
                >
              </td>
            </tr>
          </tbody>
        </table>
        <EditEvent :modalName="modalEdit" :eventEdit="eventEdit" />

      </div>
      <div class="card-action red accent-2">
        <Pagination />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { inject, provide, ref, watchEffect } from "vue";
import { mapState } from "vuex";
import Pagination from "../components/elements/Pagination.vue";
import * as AppWeb3 from "../app/app.js";
import EditEvent from "../components/Event/EditEvent.vue";
export default {
  name: "Event",
  components: {
    Pagination,
    EditEvent,
  },
  data() {
    return {
      modalEdit: "modalEdit",
      eventEdit: {}
    };
  },
  setup() {
    // const area_id = inject('area_id');
    const area_id = ref(1);
    provide("area_id", area_id);

    const eventsArray = ref([]);
    provide("eventsArray", eventsArray);
    const pagination = ref({
      total: 0,
      current_page: 1,
      per_page: 1,
      //id elments
      from: 0,
      to: 10,
    });

    provide("pagination", pagination);


    const listEvents = async function () {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      let events = await AppWeb3.getAllEvents(
        area_id.value,
        account.value,
        pagination.value.from,
        pagination.value.to
      );
      // console.log(this.account);
      eventsArray.value = events;
      // events.forEach(element => {
      //   console.log(element.name);

      // });
      return events;
    };

    // const c= this.listEvents();
    watchEffect(() => {
      console.log("watch " + pagination.value.current_page);
      listEvents();
    });

    return { listEvents, eventsArray, pagination, area_id };
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    async addEvent(name) {
      let result = await AppWeb3.addEvent(name, this.account);
      return result;
    },
    async getLengthEvents(_area_id) {
      let result = await AppWeb3.getLengthEventsOfArea(_area_id);
      return result;
    },
    async getEventsPages(_area_id) {
      let cantEvent = await this.getLengthEvents(_area_id);
      this.pagination.total = await parseInt(cantEvent / this.pagination.to);
      console.log("pagination " + this.pagination.total);
    },
    openModal(_eventEdit) {
      this.eventEdit = _eventEdit;
      var elem = document.getElementById(this.modalEdit);
      // console.log('eventEdit2'+this.eventEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      modalInstance.open();
    },
  },
  mounted() {
    this.eventsArray = this.listEvents();
    this.getEventsPages(this.area_id);
  },
  updated() {
    // this.listEvents();
  },
};
</script>