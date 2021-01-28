<template>
  <div class="container">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Areas</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <div class="container">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="owner"
                    class="inputCounter disabled"
                    type="text"
                    data-length="100"
                    v-model="areaView.owner"
                  />
                  <label for="owner" class="active">Area Owner </label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="name"
                    class="inputCounter"
                    type="text"
                    data-length="50"
                    v-model="areaView.name"
                  />
                  <label for="name" class="active">Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea
                    id="description"
                    class="materialize-textarea"
                    data-length="250"
                    v-model="areaView.description"
                  ></textarea>
                  <label for="description" class="active"> Description</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <Multiselect
                    v-model="state.id"
                    :options="satatesSelect"
                    label="name"
                    placeholder="Select your character"
                    trackBy="name"
                    :searchable="true"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="card-action red accent-2"></div>
    </div>
    <br />
  </div>
</template>

<script>
import { provide } from "vue";
import * as AppWeb3 from "../../app/app.js";
import { useRoute } from "vue-router";

export default {
  name: "Event",
  components: {},
  props: ["id"],
  setup(props) {
    // let router = useRoute();
    // let areaView = {};
    // let satatesSelect = await AppWeb3.getStatesAll();
    // const getArea = async () => {
    //   // let area = await AppWeb3.getArea(this.$route.query.id);
    //   let area = await AppWeb3.getArea(router.params.id);
    //   return area;
    // };
    // areaView =  await AppWeb3.getArea(router.params.id);
    // console.log(areaView.id + areaView.name);
    // return { areaView,satatesSelect };
  },
  data() {
    return {
      areaView: {},
      state: {},
      satatesSelect: [],
    };
  },
  async mounted() {
    let router = useRoute();
    this.satatesSelect = await AppWeb3.getStatesAll();
    this.areaView = await AppWeb3.getArea(router.params.id);
  },
  methods: {
    async getStatesAll() {
      this.satatesSelect = await AppWeb3.getStatesAll();
    },
  },
};
</script>