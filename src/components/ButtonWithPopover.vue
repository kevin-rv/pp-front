<template>
  <button
      ref="popover"
      type="button"
      data-bs-toggle="popover"
      class="btn"
      :class="iconClass + ' ' + buttonClass + ' ' + extraClass"
      :title="title"
      :data-bs-content="content"
  >{{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "ButtonWithPopover",
  props: {
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    buttonText: {
      required: false,
      type: String,
      default: '',
    },
    iconClass: {
      required: false,
      type: String,
      default: ''
    },
    buttonClass: {
      required: false,
      type: String,
      default: 'btn-primary'
    },
    extraClass: {
      required: false,
      type: String,
      default: ''
    }
  },
  mounted() {
    new this.$bootstrap.Popover(this.$refs.popover, {html:true})
  },
  updated() {
    new this.$bootstrap.Popover(this.$refs.popover, {html:true})
  }
}
</script>

<style scoped>

</style>