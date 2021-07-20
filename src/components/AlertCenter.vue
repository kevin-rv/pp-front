<template>
  <div>
    <alert v-for="(message, index) in messages" :key="index" :message="message"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Alert from "./Alert";

export default {
  name: "AlertCenter",
  components: {Alert},
  computed: {
    ...mapGetters({planningApi: 'planningApi', messages: 'messages'})
  },
}
</script>

<style scoped>

</style>