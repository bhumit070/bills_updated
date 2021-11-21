<template>
  <div class="container mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <div v-if="!loading">
      <div class="w-100">
        <b-button variant="primary" rounded @click="handleModalOpen(false)"
          >Add Firm</b-button
        >
      </div>
      <div v-if="firms.length">
        <div class="container">
          <div v-for="firm in firms" :key="firm.id">
            <b-card class="mt-3" :title="firm.name">
              <b-card-text>
                Name: {{ firm.name }} <br />
                Pan: {{ firm.pan }} <br />
                Address: {{ firm.address }}
              </b-card-text>
              <b-button variant="primary" @click="handleModalOpen(firm.id)">
                Edit
              </b-button>
              <b-button variant="danger" @click="handleRemoveFirm(firm.id)">
                Delete
              </b-button>
            </b-card>
          </div>
        </div>
      </div>
      <div v-if="!firms.length">
        <div class="text-center">No Firms Found!</div>
      </div>
    </div>

    <b-modal
      v-model="firmModal"
      :title="firmModalTitle"
      no-close-on-esc
      ok-only
      ok-title="Cancel"
      ok-variant="danger"
      @ok="handleFirmModalClose"
      @hidden="handleFirmModalClose"
    >
      <div>
        <b-form @submit.prevent="handleFirmModalSubmit">
          <b-form-group label="Firm Name:">
            <b-form-input
              v-model="firmData.name"
              type="text"
              placeholder="Enter Firm name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Firm PAN:">
            <b-form-input
              v-model="firmData.pan"
              type="text"
              placeholder="Enter Firm Pan Card"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Firm Address:">
            <b-form-input
              v-model="firmData.address"
              type="text"
              placeholder="Enter Firm Address"
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
import { ADD_FIRM, FETCH_FIRMS } from '@/store/firms/actions.types'
export default {
  data: () => ({
    loading: false,
    firmModal: false,
    isFirmEdit: false,
    firmModalTitle: 'Add Firm',
    selectedFirm: null,
    firmData: {
      name: '',
      pan: '',
      address: '',
    },
  }),
  computed: {
    firms() {
      return this.$store.getters['firms/allFirms']
    },
  },
  async created() {
    await this.getAllFirms()
  },
  methods: {
    showToast(msg, variant) {
      this.$bvToast.toast(msg, {
        variant,
      })
    },
    async getAllFirms() {
      try {
        this.loading = true
        await this.$store.dispatch(FETCH_FIRMS)
      } catch (error) {
        this.$bvToast.toast('Error loading firms', {
          variant: 'danger',
        })
      } finally {
        this.loading = false
      }
    },
    async handleFirmModalSubmit() {
      if (!this.isFirmEdit) {
        try {
          const payload = {
            isEdit: this.isFirmEdit,
            data: this.firmData,
          }
          this.$store.dispatch(ADD_FIRM, payload)
          this.handleFirmModalClose()
        } catch (error) {
          this.showToast('error adding firm', 'danger')
        }
      } else {
        const payload = {
          isEdit: this.isFirmEdit,
          data: {
            id: this.firmData.id,
            name: this.firmData.name,
            pan: this.firmData.pan,
            address: this.firmData.address,
          },
        }
        await this.$store.dispatch(ADD_FIRM, payload)
        await this.getAllFirms()
        this.handleFirmModalClose()
      }
    },
    async handleRemoveFirm(firmId) {
      try {
        await axios.delete(`/api/firm/${firmId}`)
        this.getAllFirms()
      } catch (error) {
        this.showToast('Error deleting firm', 'danger')
      }
    },
    handleModalOpen(firmId) {
      if (!firmId) {
        return (this.firmModal = true)
      }
      const firmData = this.firms.find((firm) => firm.id === firmId)
      this.selectedFirm = { ...firmData }
      this.firmData = { ...firmData }
      this.isFirmEdit = true
      this.firmModalTitle = `Edit ${firmData.name}`
      return (this.firmModal = true)
    },

    handleFirmModalClose() {
      this.selectedFirm = null
      this.firmData = {
        name: '',
        pan: '',
        address: '',
      }
      this.firmModal = false
      this.isFirmEdit = false
    },
  },
}
</script>

<style>
</style>