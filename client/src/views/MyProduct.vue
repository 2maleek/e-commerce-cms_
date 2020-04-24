<template>
<div>
  <Navbar> </Navbar>
  <v-spacer></v-spacer>
  <v-item-group class="pa-5">
    <v-container>
      <v-row>
        <v-col
          v-for="product in this.$store.state.myProducts"
          :key="product.id"
          cols="12"
          md="3"
        >
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey' : ''"
              class="mx-auto"
              max-width="400"
              @click="toggle"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="product.image_url"
              >
              </v-img>

              <v-card-subtitle class="pb-0">Category: {{ product.category }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div><h5>{{ product.name }}</h5> </div>

                <div>Price: Rp.{{ product.price }}</div>
                <div><small>Stock: {{ product.stock }}</small> </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="editItem(product)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-spacer> </v-spacer>
                <v-btn
                  color="error"
                  text
                  @click="deleteItem(product)"
                >
                <v-icon>
                  mdi-delete
                </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Product</span>
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
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'AllProduct',
  components: {
    Navbar
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
    editItem (product) {
      const id = product.id
      this.editedIndex = this.$store.state.products.indexOf(product)
      this.editedItem = Object.assign({}, product)
      this.dialog = true
    },

    deleteItem (product) {
      alertify.confirm('Delete product', 'Are you sure ?', () => {
        const id = product.id
        const index = this.$store.state.products.indexOf(product)
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
  }
}
</script>
