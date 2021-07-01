<template>
  <div class ="row justify-content-center mt-5">
    <div class="card" style="width: 25rem;">
      <h5 class="card-header">Signin</h5>
      <div class="card-body">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <a href="#" class="btn btn-primary mt-3" @click="token">Signin</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin"
}
</script>

<style scoped>

</style>