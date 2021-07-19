<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <slot name="header"></slot>
          <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <slot></slot>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button"
                  class="btn"
                  :class="buttonActionClass"
                  v-if="actionFunc && actionText"
                  @click="actionFunc">{{ actionText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      required: true,
      type: String,
    },
    actionFunc: {
      required: false,
      type: Function,
    },
    actionText: {
      required: false,
      type: String,
    },
    buttonActionClass: {
      required: false,
      type: String,
      default: 'btn-primary'
    }

  },
}
</script>

<style scoped>

</style>