<template>
  <v-app id="inspire">
    <Navbar> </Navbar>

    <v-content>
      <v-data-table
        :headers="headers"
        :items="this.$store.state.products"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Products</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.name" label="Product Name"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="editedItem.description"  auto-grow rows="1" label="Description"></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.stock" label="Stocks"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="editedItem.image_url" auto-grow rows="1" label="Image Url"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import alertify from 'alertifyjs';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
  data() {
    return {
      productName: null,
      description: null,
      category:null,
      price: null,
      stock: null,
      image_url: null,
      dialog: false,
      drawer: null,
      headers: [
            { text: 'Name', value: 'name' },
            { text: 'Description', value: 'description' },
            { text: 'Category', value: 'category' },
            { text: 'Price', value: 'price' },
            { text: 'Stocks', value: 'stock' },
            { text: 'Image', value: 'image_url'},
            { text: 'Actions', value: 'actions', sortable: false },
          ],
      items: [
        { icon: 'mdi-rhombus-split', text: 'All Products' },
        { icon: 'mdi-rhombus-medium', text: 'Your Product' },
        { icon: 'mdi-help-circle', text: 'Help' },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        image_url: '',
      },
      defaultItem: {
        name: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        image_url: '',
      },
    }
  },
  methods: {
    editItem (item) {
      const id = item.id
      this.editedIndex = this.$store.state.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      alertify.confirm('Delete product', 'Are you sure ?', () => {
        const id = item.id
        const index = this.$store.state.products.indexOf(item)
        this.$store.dispatch('deleteProduct', {id, index})
      }, () => {
        alertify.error('Cancel')
      });
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      //langsungg store ke db trus push hasilnya
      if (this.editedIndex > -1) {
        const id = this.editedItem.id
        const payload = {
          name: this.editedItem.name,
          description: this.editedItem.description,
          category: this.editedItem.category,
          price: this.editedItem.price,
          stock: this.editedItem.stock,
          image_url: this.editedItem.image_url,
        }
        this.$store.dispatch('updateProduct', {payload, id, index: this.editedIndex})
      } else {
        this.$store.dispatch('createProduct', this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
};
</script>
