<template>
  <v-alert
    border="left"
    close-text="Close Alert"
    color="warning"
    dark
    dismissible
  >
  {{message}}
  </v-alert>
</template>

<script>
export default {
  props: ['message']
}
</script>
