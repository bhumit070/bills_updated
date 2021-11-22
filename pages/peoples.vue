<template>
  <div class="container mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <div v-if="!loading">
      <div class="w-100">
        <b-button
          variant="primary"
          :disabled="deleteLoading"
          rounded
          @click="handleOpenModal(false)"
          >Add Person</b-button
        >
      </div>
      <div v-if="!loading" class="mt-3 mb-2">
        <b-form-input
          v-model="searchText"
          type="text"
          placeholder="Enter Person's name to Search"
        ></b-form-input>
      </div>
      <div v-if="filteredPeoples.length" class="mt-2">
        <div class="container">
          <div v-for="people in filteredPeoples" :key="people.id">
            <b-card class="mt-3" :title="people.name">
              <b-card-text>
                Name: {{ people.name }} <br />
                Place: {{ people.place }} <br />
              </b-card-text>
              <b-button
                variant="success"
                :disabled="deleteLoading"
                @click="$router.push(`/bills/add/${people.id}`)"
              >
                Add Bills
              </b-button>
              <b-button
                variant="warning"
                :disabled="deleteLoading"
                @click="$router.push(`/bills/view/${people.id}`)"
              >
                View Bills
              </b-button>
              <b-button
                :disabled="deleteLoading"
                variant="primary"
                @click="handleOpenModal(people)"
              >
                Edit
              </b-button>
              <b-button
                :disabled="deleteLoading"
                variant="danger"
                @click="removePerson(people.id)"
              >
                Delete
              </b-button>
            </b-card>
          </div>
        </div>
      </div>
      <div v-if="!filteredPeoples.length">
        <div class="text-center">No Peoples Found!</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { FETCH_PEOPLE, TOGGLE_PEOPLE_MODAL } from '@/store/peoples/action.types'
export default {
  data: () => ({
    peoples: [],
    loading: false,
    peopleModal: false,
    isEditPerson: false,
    deleteLoading: false,
    peopleModalTitle: 'Add New Person',
    selectedPerson: null,
    peopleData: {
      name: '',
      place: '',
    },
    searchText: '',
  }),
  computed: {
    filteredPeoples() {
      const peoples = this.$store.getters['peoples/getPeoples']
      if (!this.searchText) return peoples
      const persons = peoples.filter((people) => {
        return people.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
      return persons.length ? persons : []
    },
  },
  async created() {
    await this.getPeoples()
  },
  methods: {
    showToast(msg, variant) {
      this.$bvToast.toast(msg, {
        variant,
      })
    },
    handleOpenModal(person) {
      this.$store.dispatch(TOGGLE_PEOPLE_MODAL, person)
    },
    async getPeoples(val) {
      try {
        if (!val && this.filteredPeoples && this.filteredPeoples.length) return
        this.loading = true
        await this.$store.dispatch(FETCH_PEOPLE)
      } catch (error) {
        this.showToast('unable to fetch people', 'danger')
      } finally {
        this.loading = false
      }
    },
    async removePerson(personId) {
      try {
        this.deleteLoading = true
        await axios.delete(`/api/people/${personId}`)
        await this.getPeoples(true)
      } catch (error) {
        this.showToast('unable to delete people', 'danger')
      } finally {
        this.deleteLoading = false
      }
    },
  },
}
</script>