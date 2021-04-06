<template>
  <div class="">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Document Create</h1>
        <!-- filter -->
      </div>
      <div class="card-content">
        <div>
          <div class="row">
            <div class="input-field col s4" v-if="!knowEvent || event_id">
              <Multiselect
                id="area_id"
                @change="getEventOfArea()"
                v-model="area_id"
                :options="areasSelect"
                label="name"
                placeholder="Select Area"
                trackBy="name"
                :disabled="disabledInput"
                :searchable="true"
              />
            </div>
            <div class="input-field col s4" v-if="!knowEvent || event_id">
              <Multiselect
                id="event_id"
                v-model="event_id"
                :options="eventsSelect"
                label="name"
                placeholder="Select Event"
                trackBy="name"
                :disabled="disabledInput"
                :searchable="true"
              />
            </div>
            <div class="input-field col s2">
              <Multiselect
                id="state_id"
                v-model="state_id"
                :options="statesSelect"
                label="name"
                placeholder="Select State"
                trackBy="name"
                :disabled="disabledInput"
                :searchable="true"
              />
            </div>
            <div class="input-field col s2">
              <input type="text" name="" id="" v-model="reasonState" />
            </div>
          </div>
          <DropFile />
          <div class="row">
            <div class="col">
              <button class="btn" @click="checkDocuments">Verify</button>
            </div>
            <div class="col">
              <button class="btn" @click="saveDocuments">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-action red accent-2"></div>
    </div>
    <br />
  </div>
</template>

<script>
import { ref, provide } from "vue";
import * as AppWeb3 from "../../app/app.js";
import DropFile from "./DropFile.vue";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
    DropFile,
  },
  //si conoce el evento no muestra el select Area ni el select events
  props: {
    knowEvent: {
      type: Boolean,
      default: false,
    },
    event_id: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const uploadedFiles = ref([]);
    const allHashes = ref([]);
    provide("uploadedFiles", uploadedFiles);
    provide("allHashes", allHashes);
    return { uploadedFiles, allHashes };
  },
  data() {
    return {
      area_id: 0,
      state_id: 0,
      reasonState: "",
      event_id2: 0,
      reasonState: "",
      statesSelect: [],
      eventsSelect: [],
      areasSelect: [],
    };
  },
  methods: {
    async checkDocuments() {
      let arrayDocuments = await AppWeb3.checkDocuments(
        this.allHashes,
        this.uploadedFiles
      );
      this.uploadedFiles = arrayDocuments;
    },
    saveDocuments() {
      if (this.event_id > 0) {
        AppWeb3.addDocuments(
          this.allHashes,
          this.event_id,
          this.state_id,
          this.reasonState
        );
      }
    },
    async getStatesAll() {
      let states = await AppWeb3.getStatesAll();
      for (let index = 0; index < states.length; index++) {
        this.statesSelect.push(states[index]);
      }
    },
    async getEventOfArea() {
      let me = this;
      let events = await AppWeb3.getAllEvents(area_id);
      for (let index = 0; index < events.length; index++) {
        me.eventsSelect.push(events[index]);
      }
      me.eventsSelect = events;
    },
    async getAllAreasOfOwner() {
      let areas = await AppWeb3.getAllAreaOfOwner(0, -1);
      if (this.area_id == 0) {
        this.area_id = areas[0].id;
      }
      for (let index = 0; index < areas.length; index++) {
        this.areasSelect.push(areas[index]);
      }
      await this.getEventOfArea();
    },
  },
  async mounted() {
    await this.getStatesAll();
    await this.getAllAreasOfOwner();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
