<template>
  <div class="container mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <div class="w-100">
      <b-button variant="primary" rounded>Add Person</b-button>
    </div>
    <div v-if="peoples.length">
      <div class="container">
        <div v-for="people in peoples" :key="people.id">
          <b-card class="mt-3" :title="people.name">
            <b-card-text>
              Name: {{ people.name }} <br />
              Pan: {{ people.place }} <br />
            </b-card-text>
            <b-button variant="success"> Add Bills </b-button>
            <b-button variant="warning"> View Bills </b-button>
            <b-button variant="primary"> Edit </b-button>
            <b-button variant="danger"> Delete </b-button>
          </b-card>
        </div>
      </div>
    </div>
    <div v-if="!peoples.length">
      <div class="text-center">No Peoples Found!</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    peoples: [
      {
        id: Date.now(),
        name: 'test',
        place: 'test',
      },
    ],
    loading: false,
  }),
  methods: {
    async getPeoples() {
      this.loading = true
      const { data } = await axios.get('/api/peoples')
      console.log('persons are', data)
    },
  },
}
</script>