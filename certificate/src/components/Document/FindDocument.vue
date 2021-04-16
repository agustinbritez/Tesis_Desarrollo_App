<template>
  <div class="container">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Document</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <ViewDocument />
      </div>
      <div class="card-action red accent-2"></div>
    </div>

    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h3 class="tile">List Document</h3>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <table class="highlight centered">
          <thead>
            <tr>
              <th>Hash</th>
              <th>Exists</th>
              <th>State</th>
              <th class="hide-on-med-and-down">Reason State</th>
              <th>Event ID</th>
              <th class="hide-on-med-and-down">New Version</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="document in documentsArray"
              :key="document.idHash"
              class="row"
            >
              <td>{{ document.idHash }}</td>
              <td>{{ document.exists }}</td>
              <td >{{ document.state? document.state.name :  "" }}</td>
              <td class="hide-on-med-and-down">{{ document.reasonState || "" }}</td>
              <td>{{ document.event_id }}</td>
              <td class="hide-on-med-and-down">{{ document.newDocument || "" }}</td>
              <td>
                <div class="row" v-if=" document.exists">
                  <!-- <router-link
                    :to="{ name: 'DocumentView', params: { id: document.id } }"
                    ><i class="blue-text text-accent-4 material-icons"
                      >visibility</i
                    ></router-link
                  > -->

                  &nbsp;

                  <a
                    href="#"
                    @click.prevent="openModalEdit(document)"
                    class="modal-trigger green-text text-accent-4"
                  >
                    <i class="material-icons">edit</i> </a
                  >&nbsp;

                  <a
                    href="#"
                    @click.prevent="openDeleteElement(document.idHash)"
                    class="modal-trigger red-text text-accent-4"
                    ><i class="material-icons">delete_forever</i></a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-action red accent-2">
        <!-- <Pagination /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { inject, provide, ref, watchEffect } from "vue";
import Pagination from "../elements/Pagination.vue";
import ViewDocument from "./viewDocument.vue";
import { getDocuments } from "../../app/app.js";

export default {
  name: "FindDocument",
  components: {
    Pagination,
    ViewDocument,
    // EditDocument,
    // DeleteModal,
    // NewDocument,
  },
  data() {
    return {};
  },
  setup(props) {
    let documentsArray = ref([]);
    provide("documentsArray", documentsArray);
    const allHashes = inject("allHashes");
    watchEffect(async () => {
      // console.log(allHashes.value);
      documentsArray.value = await getDocuments(allHashes.value);
      // console.log(documentsArray.value);
    });
    return { allHashes, documentsArray };
  },
};
</script>