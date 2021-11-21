<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="grains"
      @change="$emit('grain-changed', selected)"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    selected: null,
  }),
  computed: {
    grains() {
      const grains = this.$store.getters['grains/grains']
      if (!grains || !grains.length) {
        return []
      }
      return grains.map((grain) => ({
        text: grain.name,
        value: grain.id,
      }))
    },
  },
  mounted() {
    if (this.bill.grain_id) {
      this.selected = this.bill.grain_id
    }
  },
}
</script>