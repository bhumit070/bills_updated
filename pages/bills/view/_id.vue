<template>
  <div class="container mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <Firms v-show="!loading" @firm-changed="handleFirmChange" />
    <div v-if="!loading && !bills.length" class="text-center mt-5 pt-5">
      <h3>No bills found</h3>
    </div>
    <div v-if="bills.length && !loading">
      <div class="container">
        <pre>

        {{ bills }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    personId: null,
    loading: false,
    bills: [],
    selectedFirm: null,
  }),
  watch: {
    async selectedFirm(newFirm) {
      if (newFirm) {
        await this.getBills()
      }
    },
  },
  async created() {
    const { id } = this.$route.params
    if (!id) {
      return this.$router.push('/')
    }
    this.personId = id
    await this.getBills()
  },

  methods: {
    async getBills() {
      try {
        this.bills = []
        this.loading = true
        const { data } = await axios.get(
          `/api/bills/${this.personId}/${this.selectedFirm}`
        )
        this.bills = data.bills
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    handleFirmChange(val) {
      if (!val) {
        return false
      }
      this.selectedFirm = val
    },
  },
}
</script>