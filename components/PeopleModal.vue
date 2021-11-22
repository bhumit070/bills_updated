<template>
  <div>
    <b-modal
      v-model="peopleModal"
      :title="peopleModalTitle"
      no-close-on-esc
      ok-only
      ok-title="Cancel"
      ok-variant="danger"
      :ok-disabled="loading"
      @ok="handlePeopleModalClose"
      @hidden="handlePeopleModalClose"
    >
      <div v-if="people">
        <b-form @submit.prevent="handlePeopleModalSubmit">
          <b-form-group label="Person Name:">
            <b-form-input
              v-model="people.name"
              type="text"
              placeholder="Enter Person name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Person Place:">
            <b-form-input
              v-model="people.place"
              type="text"
              placeholder="Enter Person's Place"
              required
            ></b-form-input>
          </b-form-group>

          <b-button :disabled="loading" type="submit" variant="primary"
            >Submit</b-button
          >
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
	
<script>
import {
  CLOSE_PEOPLE_MODAL,
  ADD_PEOPLE,
  UPDATE_PEOPLE,
  FETCH_PEOPLE,
} from '@/store/peoples/action.types'
export default {
  data: () => ({
    peopleModalTitle: 'Add People',
    people: null,
    loading: false,
  }),
  computed: {
    peopleModal: {
      get() {
        return this.$store.getters['peoples/getIsModalOpen']
      },
      set(value) {
        this.$store.commit(CLOSE_PEOPLE_MODAL, value)
      },
    },
    selectedPeople() {
      return this.$store.getters['peoples/getSelectedPeople']
    },
  },
  watch: {
    selectedPeople: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (!newVal) return
        this.people = { ...newVal }
      },
    },
  },
  methods: {
    showToast(msg, variant) {
      this.$bvToast.toast(msg, {
        variant,
      })
    },
    handlePeopleModalClose() {
      this.$store.commit(CLOSE_PEOPLE_MODAL)
    },
    async handlePeopleModalSubmit() {
      try {
        this.loading = true
        if (this.people.id) {
          await this.$store.dispatch(UPDATE_PEOPLE, this.people)
          this.handlePeopleModalClose()
        } else {
          await this.$store.dispatch(ADD_PEOPLE, this.people)
          this.handlePeopleModalClose()
        }
        this.$store.dispatch(FETCH_PEOPLE)
      } catch (error) {
        this.showToast('unable to edit people', 'danger')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>