<template>
  <div>
    <!-- Modal Structure -->
    <!-- <a class="waves-effect waves-light btn modal-trigger" :href="'#'+modalName"
      >Modal</a
    > -->

    <!-- Modal Structure -->
    <div :id="modalName" class="modal">
      <div class="modal-content">
        <h5>{{ nameModal }}</h5>
        <hr />
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="name"
                  class="inputCounter"
                  type="text"
                  data-length="50"
                  v-model="eventEdit.name"
                />
                <label for="name" :class="{ active: activeInput }">Name</label>
              </div>
              <div class="input-field col s6">
                <Multiselect
                  v-model="eventEdit.area_id"
                  :options="areasSelect"
                  label="name"
                  placeholder="Select your Area"
                  trackBy="name"
                  :searchable="true"
                />
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="description"
                  class="materialize-textarea"
                  data-length="250"
                  v-model="eventEdit.description"
                ></textarea>
                <label for="description" :class="{ active: activeInput }">
                  Description</label
                >
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input
                  id="startEvent"
                  type="datetime-local"
                  class="form-control"
                  v-model="eventEdit.startEvent"
                />
                <label for="startEvent" class="active">Start Event</label>
              </div>

              <div class="input-field col s6">
                <input
                  id="endEvent"
                  type="datetime-local"
                  class="form-control"
                  v-model="eventEdit.endEvent"
                />
                <label for="endEvent" class="active">End Event</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col s2">
            <a
              href="#!"
              @click.prevent="editOrNew()"
              class="waves-effect waves-green darken-1 btn-flat"
              >Save</a
            >
          </div>
          <div class="col s2 offset-s6">
            <a href="#!" class="modal-close waves-effect waves-red btn-flat"
              >Cancel</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import * as AppWeb3 from "../../app/app.js";
import { mapState } from "vuex";
import { inject, provide, ref, watchEffect } from "vue";

export default {
  name: "EditEvent",
  props: ["modalName", "activeInput", "nameModal"],
  components: { Multiselect },
  data() {
    return {
      selectAreaId: null,
      areasSelect: [],
    };
  },
  computed: {
    ...mapState(["account"]),
  },
  setup() {
    const eventEdit = inject("eventEdit");
    const load = inject("load");

    return { eventEdit, load };
  },
  methods: {
    ver() {
      console.log(this.selectAreaId);
    },

    async getAllAreasOfOwner() {
      let cantAreas = await AppWeb3.getLengthAreaOfOwner();
      let areas = await AppWeb3.getAllAreaOfOwner(0, cantAreas);

      for (let index = 0; index < areas.length; index++) {
        areas[index].value = areas[index].id;
        this.areasSelect.push(areas[index]);
      }
    },
    async editOrNew() {
      ///if activeInput is false == new event
      if (this.activeInput) {
        //edit
        await AppWeb3.editEvent(
          this.eventEdit.id,
          this.eventEdit.name,
          this.eventEdit.description,
          this.eventEdit.startEvent,
          this.eventEdit.endEvent,
          this.eventEdit.area_id,
          this.eventEdit.state_id
        );
      } else {
        //new
        console.log(this.eventEdit.startEvent);
        await AppWeb3.addEvent(
          parseInt(this.eventEdit.area_id),
          this.eventEdit.name,
          this.eventEdit.description,
          this.eventEdit.startEvent,
          this.eventEdit.endEvent
        );
      }

      this.load = !this.load;
      var elem = document.getElementById(this.modalName);
      var modalInstance = M.Modal.getInstance(elem);
      modalInstance.close();
    },
  },
  mounted() {
    var elems = document.querySelectorAll("#" + this.modalName);
    // console.log(this.eventEdit.name);
    var instances = M.Modal.init(elems);
    // console.log(instances);
    var inputName = document.getElementById("name");
    var inputDescription = document.getElementById("description");
    var selects = document.querySelectorAll(".select");
    M.CharacterCounter.init(inputName);
    M.CharacterCounter.init(inputDescription);
    var selects = M.FormSelect.init(selects);

    this.getAllAreasOfOwner();
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

