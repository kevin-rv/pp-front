<template>
  <div class="row justify-content-center mt-5">
  <div class="card border border-secondary mb-3" style="max-width: 18rem;">
    <div class="card-header">Voulez vous ajoutez des contacts ? </div>
    <div class="card-body">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">Yes</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
        <label class="form-check-label" for="inlineRadio2">No</label>
      </div>
      <button class="btn-secondary">Next</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "FirstLoginAddContact"
}
</script>

<style scoped>

</style>