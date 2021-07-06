<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Modifier votre Contact</h5>
          <input placeholder="name" v-model="name" > <br>
          <input placeholder="phoneNumber" v-model="phoneNumber"> <br>
          <input  placeholder="home" v-model="home"> <br>
          <input type="date" placeholder="birthday" v-model="birthday"> <br>
          <input placeholder="email" v-model="email"> <br>
          <input placeholder="relationship" v-model="relationship"> <br>
          <input placeholder="work" v-model="work"> <br>
          <button type="button" class="btn btn-primary mb-3 bi bi-check" @click="submit"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UpdateContact",
  data() {
    return {
      name: '',
      phoneNumber: '',
      home: '',
      birthday: null,
      email: '',
      relationship: '',
      work: '',
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    submit() {
      this.planningApi.updateContact(this.$route.params.id,this.name, this.phoneNumber, this.home, this.birthday, this.email, this.relationship, this.work)
          .then(() => {
            this.$router.push({name: 'MenuContacts'})
          })
          .catch(message => {
            console.log(message)
          })
    }
  }
}
</script>

<style scoped>

</style>