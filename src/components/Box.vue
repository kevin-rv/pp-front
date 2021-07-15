<template>
  <div class="card"
       :class="cardClass"
       :style="cardStyle"
  >
    <div class="card-header text-center"><h5>{{daysOfMonth}}</h5> </div>
    <h6>{{days}}</h6>
    
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    daysOfMonth: {
      required: false,
      type: String,
    },
    days: {
      required: false,
      type: Number,
    },
    cardClass: {
      required: true,
      type: String,
    },
    cardStyle: {
      required: true,
      type: String,
    },
  }
}
</script>

<style scoped>

</style>