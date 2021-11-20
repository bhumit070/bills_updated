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
              <b-button variant="danger"> Delete </b-button>
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
export default {
  data: () => ({
    loading: false,
    firmModal: false,
    isFirmEdit: false,
    firmModalTitle: 'Add Firm',
    firms: [
      {
        id: new Date().getTime(),
        name: 'Shreeji Canvasing',
        pan: 'CQUPG!*$$G',
        address: 'b-18 lalgebinagar',
      },
    ],
    firmData: {
      name: '',
      pan: '',
      address: '',
    },
  }),
  methods: {
    handleFirmModalSubmit() {},
    handleModalOpen(firmId) {
      if (!firmId) {
        return (this.firmModal = true)
      }
      const firmData = this.firms.find((firm) => firm.id === firmId)
      this.firmData = firmData
      this.isFirmEdit = true
      this.firmModalTitle = `Edit ${firmData.name}`
      return (this.firmModal = true)
    },

    handleFirmModalClose() {
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