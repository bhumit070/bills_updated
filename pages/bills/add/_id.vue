<template>
  <div class="mt-2">
    <div class="container">
      <Firms @firm-changed="handleFirmChange" />
    </div>
    <div class="container mt-2">
      <div v-for="(bill, index) in bills" :key="bill.bill_id">
        <b-card :title="`Bill Number ${index + 1}`" class="mt-2">
          <b-card-body>
            <b-form>
              <b-form-group label="Enter Date:">
                <b-form-input
                  v-model="bills[index].date"
                  type="date"
                  placeholder="Enter Date"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Packing:">
                <b-form-input
                  v-model="bills[index].packing"
                  type="text"
                  placeholder="Enter Packing"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Soda Rate:">
                <b-form-input
                  v-model="bills[index].soda_rate"
                  type="text"
                  placeholder="Enter Soda Rate"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Bags:">
                <b-form-input
                  v-model="bills[index].bags"
                  type="text"
                  placeholder="Enter Bags"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Dalali Rate:">
                <b-form-input
                  v-model="bills[index].dalali_rate"
                  type="text"
                  placeholder="Enter Dalali Rate"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Amount:">
                <b-form-input
                  v-model="bills[index].amount"
                  type="text"
                  placeholder="Enter Amount"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Enter Party Name:">
                <!-- <b-form-input
                  v-model="bills[index].seller_id"
                  type="text"
                  placeholder="Enter Party name"
                  required
                ></b-form-input> -->
                <PeopleDropDown @update-person="updateSeller($event, index)" />
              </b-form-group>
            </b-form>
          </b-card-body>
          <b-card-footer>
            <b-button
              variant="danger"
              :disabled="bills.length === 1"
              @click="handleRemoveBill(index)"
            >
              Remove This bill</b-button
            >
          </b-card-footer>
        </b-card>
      </div>
      <div class="mt-4">
        <b-button block variant="primary" @click="handleAddNewBill">
          Add New Bill
        </b-button>
        <b-button block variant="success" :disabled="!bills.length">
          Submit All Bills
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: null,
    bills: [],
    selectedFirm: null,
  }),
  mounted() {
    const { id } = this.$route.params
    if (!id) {
      return this.$router.push('/')
    }
    this.personId = id
    const data = this.getEmptyBillData()
    this.bills = [...this.bills, data]
  },
  methods: {
    handleFirmChange(firmId) {
      if (!firmId) {
        return
      }
      this.selectedFirm = firmId
    },
    handleAddNewBill() {
      const emptyData = this.getEmptyBillData()
      this.bills = [...this.bills, emptyData]
    },
    getEmptyBillData() {
      return {
        bill_id: this.bills.length,
        date: null,
        packing: null,
        soda_rate: null,
        bags: null,
        dalali_rate: null,
        amount: null,
        seller_id: null,
        buyer_id: this.personId,
        grain_id: null,
        firm_id: this.selectedFirm,
      }
    },
    handleRemoveBill(billIndex) {
      this.bills = this.bills.filter((bill) => bill.bill_id !== billIndex)
    },
    updateSeller(sellerId, index) {
      this.bills[index].seller_id = sellerId
    },
  },
}
</script>