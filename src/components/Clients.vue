<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Clients</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="clients"
      :pagination.sync="pagination"
      :total-items="clientsCount"
      :loading="loading"
      class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'clients',
      'clientsCount'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  data: () => ({
    dialog: false,
    name: 'Clients',
    headers: [
      {
        text: 'Id',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    // totalDesserts: this.clientsCount,
    // desserts: this.clients,
    pagination: {},
    loading: true,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: ''
    },
    defaultItem: {
      id: 0,
      name: ''
    }
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    pagination: {
      handler () {
        // this.clients
        //   .then(data => {
        //     this.desserts = data.items
        //     this.totalDesserts = data.total
        //   })
      },
      deep: true
    }
  },

  methods: {
    ...mapActions([
      'setNewClient',
      'updateClient',
      'removeClient'
    ]),
    editItem (item) {
      this.editedIndex = this.clients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm(`Are you sure you want to delete the client ${item.name} item?`) && this.removeClient(item.id)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        await this.updateClient(this.editedItem)
      } else {
        await this.setNewClient(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
</style>
