<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" link @click="item.action">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">E-commerce CMS</span>
      </v-toolbar-title>

      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        v-if="page !== 'produtcs'"
        v-on:keyup.enter="filterProduct"
      />-->
      <v-spacer />
      <!-- <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>-->
      <v-btn @click="logout" small color="error">Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      items: [
        {
          icon: "mdi-table-large",
          text: "Data Table Product",
          action: this.showDataTable
        },
        {
          icon: "mdi-rhombus-split",
          text: "View All Product",
          action: this.showAllProduct
        }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    },
    showAllProduct() {
      this.$router.push("/products");
    },
    showMyProduct() {
      this.$router.push("/myproducts");
    },
    showDataTable() {
      this.$router.push("/");
    },
    filterProduct() {
      console.log("Mauk pak engo");
    }
  }
};
</script>
