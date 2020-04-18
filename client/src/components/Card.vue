<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="image_url"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ productName }}
    </v-card-title>

    <v-card-subtitle>
      Price: {{price}}
    </v-card-subtitle>

    <v-card-subtitle>
      Stocks: {{stock}}
    </v-card-subtitle>

    <v-card-subtitle>
      Category: {{category}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>Delete</v-btn>

      <v-btn
        color="purple"
        text
      >
        Update
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{description}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: [ 'show', 'productName', 'description', 'category', 'stock', 'price', 'image_url' ],
}
</script>
