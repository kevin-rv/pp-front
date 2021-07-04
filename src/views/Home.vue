<template>
  <div class="home">
   <p class="text-center mt-3">Bienvenue</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  mounted() {
    console.log(process.env.VUE_APP_PLANNING_API_ROOT)
  }
}
</script>
