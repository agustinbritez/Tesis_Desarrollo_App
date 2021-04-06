<template>
  <div class="container">
    <div class="card red lighten-4">
      <div class="card-title red accent-2">
        <h1 class="tile">Documents</h1>
        <!-- filter -->
        <div></div>
      </div>
      <div class="card-content">
        <div class="row">
          <button
            class="btn left waves-effect waves-light"
            @click="openModalNew()"
          >
            new (+)
          </button>
        </div>
        <table class="highlight centered">
          <thead>
            <tr>
              <th>Hash</th>
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
              :key="document.id"
              class="row"
            >
              <td>{{ document.id }}</td>
              <td>{{ document.state.name }}</td>
              <td class="hide-on-med-and-down">{{ document.reasonState }}</td>
              <td>{{ document.event_id }}</td>
              <td class="hide-on-med-and-down">{{ document.newDocument }}</td>
              <td>
                <div class="row">
                  <router-link
                    :to="{ name: 'DocumentView', params: { id: document.id } }"
                    ><i class="blue-text text-accent-4 material-icons"
                      >visibility</i
                    ></router-link
                  >

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
                    @click.prevent="openDeleteElement(document.id)"
                    class="modal-trigger red-text text-accent-4"
                    ><i class="material-icons">delete_forever</i></a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <EditDocument
          :modalName="modalEdit"
          :actionEdit="actionEdit"
          :nameModal="nameModal"
        />

      </div>
      <div class="card-action red accent-2">
        <Pagination />
      </div>
    </div>
    <br />
    <DeleteModal
      :modalName="modalDelete"
      :menssage="menssage"
      nameModal="Event"
      :element_id="element_id"
    />
  </div>
</template>

<script>
import { provide, ref, watchEffect } from "vue";
import { mapState } from "vuex";
import Pagination from "../elements/Pagination.vue";
import * as AppWeb3 from "../../app/app.js";
import EditDocument from "./EditDocument.vue";
import NewDocument from "./DropFile.vue";

import { useRoute } from "vue-router";
import DeleteModal from "../elements/DeleteModal.vue";

export default {
  name: "ListDocument",
  components: {
    Pagination,
    EditDocument,
    DeleteModal,
    NewDocument

  },
 props:{
   event_id:{
     type:Number,
     default:1
   },
   
 }
 ,
  data() {
    return {
      modalDelete: "modalDelete",
      //ID of modal
      modalEdit: "editDocument",

      actionEdit: true,
      nameModal: "",
      menssage: "¿Do you want to delete it?",
      element_id: 0,
    };
  },
  setup(props) {
 
    
    let documentEdit = ref({});
    provide("documentEdit", documentEdit);

    let documentsArray = ref([]);
    provide("documentsArray", documentsArray);

    
    let pagination = ref({
      total: 0,
      current_page: 1,
      per_page: 1,
      //id elments
      from: 0,
      to: 10,
    });

    provide("pagination", pagination);
    let loadList = ref(false);

    provide("loadList", loadList);

    let deleteElement = ref(0);
    provide("deleteElement", deleteElement);

    const listDocuments = async function () {
      console.log(props.event_id);
      let array = await AppWeb3.getAllDocuments(
        props.event_id,
        pagination.value.from,
        pagination.value.to
      );
      console.log(array);

      documentsArray.value = array;
      return array;
    };

    // const c= this.listDocuments();
    watchEffect(() => {
      console.log("watch " + pagination.value.current_page);
      console.log("loadList " + loadList.value);
      listDocuments();
    });

    const deleteElementSelect = async () => {
      await AppWeb3.deleteDocument(deleteElement.value);
    };

    watchEffect(async () => {
      console.log("deleteElement " + deleteElement.value);
      if (deleteElement.value > 0) {
        await deleteElementSelect();
        await listDocuments();
      }
    });

    return {
      deleteElement,
      loadList,
      documentEdit,
      listDocuments,
      documentsArray,
      pagination
      
    };
  },
  methods: {
  
    async getDocumentsPages() {
      let cant = await AppWeb3.getCantDocumentEvent(this.event_id);
      this.pagination.total = await parseInt(cant / this.pagination.to);
      console.log("pagination " + this.pagination.total);
    },
    openModalEdit(documentEdit) {
      this.documentEdit.id = documentEdit.id;
      this.documentEdit.state_id = documentEdit.state_id;
      this.documentEdit.reasonState = documentEdit.reasonState;
      this.documentEdit.event_id = documentEdit.event_id;
      this.documentEdit.newDocument = documentEdit.newDocument;

      var elem = document.getElementById(this.modalEdit);
      // console.log('documentEdit2'+this.documentEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.actionEdit = true;
      this.nameModal = "Edit Document";
      modalInstance.open();
    },
    openModalNew() {
    
     

      var elem = document.getElementById('newDocument');
      // console.log('documentEdit2'+this.documentEdit);
      var modalInstance = M.Modal.getInstance(elem);
      // console.log(modalInstance);
      this.nameModal = "New Document";
      this.actionEdit = false;
      modalInstance.open();
    },
    openDeleteElement(_id) {
      var elem = document.getElementById(this.modalDelete);
      var modalInstance = M.Modal.getInstance(elem);
      this.element_id = _id;
      modalInstance.open();
    },
  },
  mounted() {
    this.documentsArray = this.listDocuments();
    this.getDocumentsPages();
   
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

  },
  
  updated() {
    // this.listDocuments();
  },
};
</script>