<template> <!-- TODO offcanvas component à terminé -->
  <div :class="offCanvasClass"
       data-bs-scroll="true"
       data-bs-backdrop="false"
       tabindex="-1"
       aria-labelledby="offcanvasScrollingLabel">
       :ref="ref"
    <div :class="offCanvasHeader">
      <h5>title</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div :class="offCanvasBody">
      <p>body</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OffCanvas",
  props: {
    offCanvasClass: {
      required: true,
      type: String,
      default: 'offcanvas offcanvas-start'
    },
    dataScroll: {
      required: false,
      type: Boolean,
      default: true
    },
    backdrop: {
      required: false,
      type: Boolean,
    },
    offCanvasHeader: {
      required: true,
      type: String,
      default: 'offcanvas-header'
    },
    offCanvasBody: {
      required: true,
      type: String,
      default: 'offcanvas-body'
    },
    ref: {
      required: false,
      type: String,
    }
  }
}
</script>

<style scoped>

</style>
