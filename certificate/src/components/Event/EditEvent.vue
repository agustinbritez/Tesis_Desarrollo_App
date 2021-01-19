<template>
  <div>
    <!-- Modal Structure -->
    <!-- <a class="waves-effect waves-light btn modal-trigger" :href="'#'+modalName"
      >Modal</a
    > -->

    <!-- Modal Structure -->
    <div :id="modalName" class="modal">
      <div class="modal-content">
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="name"
                  class="inputCounter"
                  type="text"
                  data-length="50"
                  :value="eventEdit.name"
                />
                <label for="name" :class="{'active': eventEdit.id }">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="description"
                  class="materialize-textarea"
                  data-length="250"
                  v-text="eventEdit.description"
                ></textarea>
                <label for="description" :class="{'active': eventEdit.id }" > Description</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="startEvent" type="date" class="form-control" :value="eventEdit.startEvent" />
                <label for="startEvent">Start Event</label>
              </div>
              <div class="input-field col s6">
                <input id="endEvent" type="date" class="form-control" :value="eventEdit.endEvent"/>
                <label for="endEvent">End Event</label>
              </div>
            </div>

            <!-- <div class="row">
              <div class="input-field col s12" ref="selectArea">
                <select class="select" v-model="selectAreaId">
                  <option value="" disabled selected>Choose your option</option>
                  <option
                    :v-for="option in areasSelect"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </select>
                <label>Materialize Select</label>
              </div>
            </div> -->
            <div class="row">
              <div class="input-field col s6">
                <Multiselect
                  v-model="eventEdit.area_id"
                  :options="areasSelect"
                  label="name"
                  placeholder="Select your character"
                  trackBy="name"
                  :searchable="true"
                />
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Agree</a
        >
      </div>
    </div>
    <button @click="getAllAreasOfOwner()">entrar</button>
    <button @click="ver()">ver</button>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import * as AppWeb3 from "../../app/app.js";
import { mapState } from "vuex";
import { provide, ref, watchEffect } from "vue";

export default {
  name: "EditEvent",
  props: ["modalName", "eventEdit"],
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
  setup() {},
  methods: {
    ver() {
      console.log(this.selectAreaId);
    },

    async getAllAreasOfOwner() {
      let areas = await AppWeb3.getAllAreaOfOwner();
      // this.areasSelect = [];
      // this.areasSelect = ["Batman2", "Robin2", "Joker2"];
      for (let index = 0; index < areas.length; index++) {
        areas[index].value = areas[index].id;
        this.areasSelect.push(areas[index]);
      }
      // this.areasSelect.push('Batman');
      // areasSelect.value = [];
      // console.log(areas);
      // return areas;
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
