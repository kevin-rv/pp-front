<template>
  <div>
    <div v-for="(message, index) in messages" :key="index" :class="messageClass(message)" role="alert">
      {{message}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span></button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Alert",
  computed: {
    ...mapGetters({planningApi: 'planningApi', messages: 'messages'})
  },
  methods: {
    ...mapActions ({updateAllMessage: 'updateMessage'}),
    messageClass: function (message) {
      return 'alert alert-' + message.type
    }
  },
}
</script>

<style scoped>

</style>