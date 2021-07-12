<template>
  <div class="row justify-content-center mt-5">
  <div class="card border-secondary mb-3 border-start" style="max-width: 20rem;">
    <div class="card-header">Information Utilisateur</div>
    <div class="card-body text-secondary">
      <div class="control-group">
        <!-- Username -->
        <label class="control-label"  for="username">Username</label>
        <div class="controls">
          <input type="text" id="username" name="username" placeholder="name" class="input-xlarge" v-model="name">
        </div>
      </div>

      <div class="control-group">
        <!-- Birthday -->
        <label class="control-label"  for="birthday">Birthday</label>
        <div class="controls">
          <input type="text" id="birthday" name="birthday" placeholder="birthday" class="input-xlarge" v-model="birthday">
        </div>
      </div>


      <div class="control-group">
        <!-- phoneNumber -->
        <label class="control-label"  for="phoneNumber">PhoneNumber</label>
        <div class="controls">
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="phoneNumber" class="input-xlarge" v-model="phoneNumber">
        </div>
      </div>

      <div class="control-group">
        <!-- Home -->
        <label class="control-label"  for="home">home</label>
        <div class="controls">
          <input type="text" id="home" name="home" placeholder="home" class="input-xlarge" v-model="home">
        </div>
      </div>

      <div class="control-group">
        <!-- work -->
        <label class="control-label"  for="work">work</label>
        <div class="controls">
          <input type="text" id="work" name="work" placeholder="work" class="input-xlarge" v-model="work">
        </div>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <button class="btn-secondary">Next</button>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "firstLoginUpdateUser"
}
</script>

<style scoped>

</style>