<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="peoples"
      @change="$emit('update-person', selected)"
    ></b-form-select>
    <div class="mt-3"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: '',
  }),
  computed: {
    peoples() {
      const persons = this.$store.getters['peoples/getPeoples']
      if (persons && persons.length) {
        return persons.map((person) => ({
          text: person.name,
          value: person.id,
        }))
      } else {
        return []
      }
    },
  },
}
</script>