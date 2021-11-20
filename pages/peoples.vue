<template>
  <div class="container mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <div v-if="!loading">
      <div class="w-100">
        <b-button variant="primary" rounded @click="handleOpenModal(false)"
          >Add Person</b-button
        >
      </div>
      <div v-if="peoples.length" class="mt-2">
        <div class="container">
          <div v-for="people in peoples" :key="people.id">
            <b-card class="mt-3" :title="people.name">
              <b-card-text>
                Name: {{ people.name }} <br />
                Pan: {{ people.place }} <br />
              </b-card-text>
              <b-button variant="success"> Add Bills </b-button>
              <b-button variant="warning"> View Bills </b-button>
              <b-button variant="primary" @click="handleOpenModal(people.id)">
                Edit
              </b-button>
              <b-button variant="danger" @click="removePerson(people.id)">
                Delete
              </b-button>
            </b-card>
          </div>
        </div>
      </div>
      <div v-if="!peoples.length">
        <div class="text-center">No Peoples Found!</div>
      </div>
    </div>
    <b-modal
      v-model="peopleModal"
      :title="peopleModalTitle"
      no-close-on-esc
      ok-only
      ok-title="Cancel"
      ok-variant="danger"
      @ok="handlePeopleModalClose"
      @hidden="handlePeopleModalClose"
    >
      <div>
        <b-form @submit.prevent="handlePeopleModalSubmit">
          <b-form-group label="Person Name:">
            <b-form-input
              v-model="peopleData.name"
              type="text"
              placeholder="Enter Person name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Person Place:">
            <b-form-input
              v-model="peopleData.place"
              type="text"
              placeholder="Enter Person's Place"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    peoples: [],
    loading: false,
    peopleModal: false,
    isEditPerson: false,
    peopleModalTitle: 'Add New Person',
    selectedPerson: null,
    peopleData: {
      name: '',
      place: '',
    },
  }),
  async created() {
    await this.getPeoples()
  },
  methods: {
    showToast(msg, variant) {
      this.$bvToast.toast(msg, {
        variant,
      })
    },
    handleOpenModal(personId) {
      if (!personId) {
        return (this.peopleModal = true)
      }
      const person = this.peoples.find((p) => p.id === personId)
      this.selectedPerson = person
      this.isEditPerson = true
      this.peopleData = {
        name: person.name,
        place: person.place,
      }
      this.peopleModalTitle = `Edit ${person.name}'s Details`
      this.peopleModal = true
    },
    handlePeopleModalClose() {
      this.peopleModalTitle = 'Add New Person'
      this.peopleModal = false
      this.peopleData = {
        name: '',
        place: '',
      }
      this.isEditPerson = false
    },
    async getPeoples() {
      try {
        this.loading = true
        const { data } = await axios.get('/api/people')
        this.peoples = data.people
      } catch (error) {
        this.showToast('unable to fetch people', 'danger')
      } finally {
        this.loading = false
      }
    },
    async handlePeopleModalSubmit() {
      if (!this.isEditPerson) {
        try {
          const { data } = await axios.post('/api/people', this.peopleData)
          this.peoples = [...this.peoples, data.person]
          this.handlePeopleModalClose()
        } catch (error) {
          this.showToast('unable to add people', 'danger')
        }
      } else {
        try {
          await axios.put(
            `/api/people/${this.selectedPerson.id}`,
            this.peopleData
          )
          await this.getPeoples()
          this.handlePeopleModalClose()
        } catch (error) {
          this.showToast('unable to edit people', 'danger')
        }
      }
    },
    async removePerson(personId) {
      try {
        await axios.delete(`/api/people/${personId}`)
        this.peoples = this.peoples.filter((p) => p.id !== personId)
      } catch (error) {
        this.showToast('unable to delete people', 'danger')
      }
    },
  },
}
</script>