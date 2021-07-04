<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Créer votre Planning</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Name</label>
              <input type="text">
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3 bi bi-check"></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePlanning"
}
</script>

<style scoped>

</style>