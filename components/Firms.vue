<template>
  <div>
    <b-form-select v-model="selected" :options="firms" @change="handleChange" />
  </div>
</template>

<script>
import { FETCH_FIRMS } from '@/store/firms/actions.types'
export default {
  data: () => ({
    selected: null,
  }),

  computed: {
    firms() {
      const firms = this.$store.getters['firms/allFirms']
      if (!firms || !firms.length) {
        return []
      }
      this.$emit('firm-changed', firms[0].id)
      return firms.map((firm) => ({
        text: firm.name,
        value: firm.id,
      }))
    },
  },
  async created() {
    if (!this.firms || !this.firms.length)
      await this.$store.dispatch(FETCH_FIRMS)
    this.selected =
      (this.firms[0] && this.firms[0].value) ||
      (this.firms[0] && this.firms[0].id)
    this.$emit('firm-changed', this.selected)
  },
  methods: {
    handleChange() {
      if (!this.selected) return
      this.$emit('firm-changed', this.selected)
    },
  },
}
</script>