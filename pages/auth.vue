<template>
  <div class="container mt-5">
    <b-card class="d-flex justify-content-center mt-5">
      <b-card-title> Login to Admin System </b-card-title>
      <b-card-body>
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Admin Secret" label-for="admin secret">
            <b-form-input
              v-model="secret"
              required
              type="password"
            ></b-form-input>
          </b-form-group>
          <b-button block variant="primary" type="submit" :disabled="loading">
            Submit
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'blank',
  data: () => ({
    secret: '',
    loading: false,
  }),
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        await axios.post('/api/secret', {
          secret: this.secret,
        })
        localStorage.setItem('isLoggedIn', true)
        this.$router.push('/')
      } catch (error) {
        alert('Wrong secret')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>