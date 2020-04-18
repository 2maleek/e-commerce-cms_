<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">E-commerce CMS</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
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
    <v-dialog
      v-model="dialog"
      width="70vw"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                placeholder="Name"
                v-model="productName"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Description"
                v-model="description"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Category"
                v-model="category"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Price"
                v-model="price"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Stocks"
                v-model="stock"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="Image Url"
                v-model="image_url"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="createProduct"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  props: {
    source: String,
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
            { text: 'Image', value: 'image_url'}
          ],
      products: this.$store.state.products,
      items: [
        { icon: 'mdi-rhombus-split', text: 'All Products' },
        { icon: 'mdi-rhombus-medium', text: 'Your Product' },
        { icon: 'mdi-help-circle', text: 'Help' },
      ],
    }
  },
  methods: {
    createProduct() {
      const payload = {
        name: this.productName,
        description: this.description,
        category: this.category,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url,
      }
      this.$store.dispatch('createProduct', payload)
      this.dialog = false
    }
  }
};
</script>
