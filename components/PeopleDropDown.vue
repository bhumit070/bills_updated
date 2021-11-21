<template>
  <div>
    <ModelSelect
      v-model="selected"
      placeholder="Select Party Name"
      :options="peoples"
    />
  </div>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'

export default {
  components: {
    ModelSelect,
  },
  props: {
    bill: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    selected: '',
  }),

  computed: {
    peoples() {
      const persons = this.$store.getters['peoples/getPeoples']
      if (persons && persons.length) {
        return persons.map((person) => ({
          text: `${person.name} \t ${person.place}`,
          value: person.id,
        }))
      } else {
        return []
      }
    },
  },

  watch: {
    selected(val) {
      if (!val) return
      this.$emit('update-person', val)
    },
  },
  mounted() {
    if (this.bill.seller_id) {
      this.selected = this.bill.seller_id
    }
  },
}
</script>