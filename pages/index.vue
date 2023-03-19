<template>
  <div class="container mt-5">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <div v-if="!loading" class="text-center">
      <h1>Welcome To Billing</h1>
      <h2>Total Amount Of Bills Created <b style="color: green;"> {{ billAmount }} </b> </h2>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      loading: false,
      billAmount: 0,
    };
  },

  async created() {
    await this.fetchBillAmount()
  },

  methods: {
    async fetchBillAmount() {
      try {
        if (!process.browser) {
          return;
        }
        this.loading = true
        const response = await axios.get('/api/total-bill-amounts')
        this.billAmount = response.data.totalBillAmount || 0
      } catch (error) {
        this.$bvToast.toast('Error loading total bill amount.', {
          variant: 'danger',
        })
      } finally {
        this.loading = false
      }
    }
  },
}
</script>