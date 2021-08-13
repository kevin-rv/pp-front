<template>
  <div :class="messageClass()" role="alert" ref="alert">
    {{ message.message }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" ref="close"></button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Alert",
  data: () => ({}),
  props: {
    message: {
      required: true,
      type: Object,
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi', messages: 'messages'})
  },
  methods: {
    ...mapActions({removeMessage: 'removeMessage'}),
    messageClass: function () {
      return 'alert alert-dismissible fade show alert-' + this.message.type
    },
    onModalClosed: function () {
      this.removeMessage(this.message)
    },
  },
  mounted() {
    this.$refs.alert.addEventListener('closed.bs.alert', this.onModalClosed)
    setTimeout(() => {
      this.$refs.close.dispatchEvent(new MouseEvent('click'))
    }, this.message.timeout || 100000) // TODO CONTINUER GESTION ERREUR ET GERER LE TEMPS D'AFFICHAGE
  },
  beforeUnmount() {
    this.$refs.alert.removeEventListener('closed.bs.alert', this.onModalClosed)
  }
}
</script>
