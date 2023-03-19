<template>
  <div class="mt-2">
    <div class="container d-flex">
      <b-button class="w-25 mr-3" variant="primary" @click="openAddPeopleModal">Add People</b-button>
      <Firms class="w-75" @firm-changed="handleFirmChange" />
    </div>
    <div class="container mt-2">
      <div v-for="(bill, index) in bills" :key="bill.bill_id">
        <b-card :title="`Bill Number ${index + 1}`" class="mt-2">
          <b-card-body>
            <b-form>
              <b-form-group label="Enter Date:">
                <b-form-input v-model="bills[index].date" type="date" placeholder="Enter Date" required></b-form-input>
                <small v-if="bills[index][getErrorKey('date')]" class="text-danger">{{
                  bills[index][getErrorKey('date')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Party Name:">
                <PeopleDropDown :index="index" :bill="bill" @update-person="updateSeller($event, index)" />
                <small v-if="bills[index][getErrorKey('seller_id')]" class="text-danger">{{
                  bills[index][getErrorKey('seller_id')]
                }}</small>
              </b-form-group>

              <b-form-group label="Select Grain Type:">
                <grain-dropdown :bill="bill" @grain-changed="updateGrain($event, index)" />
                <small v-if="bills[index][getErrorKey('grain_id')]" class="text-danger">{{
                  bills[index][getErrorKey('grain_id')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Packing:">
                <b-form-input v-model="bills[index].packing" type="text" placeholder="Enter Packing"
                  required></b-form-input>
                <small v-if="bills[index][getErrorKey('packing')]" class="text-danger">{{
                  bills[index][getErrorKey('packing')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Soda Rate:">
                <b-form-input v-model="bills[index].soda_rate" type="text" placeholder="Enter Soda Rate"
                  required></b-form-input>
                <small v-if="bills[index][getErrorKey('soda_rate')]" class="text-danger">{{
                  bills[index][getErrorKey('soda_rate')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Bags:">
                <b-form-input v-model="bills[index].bags" type="text" placeholder="Enter Bags" required></b-form-input>
                <small v-if="bills[index][getErrorKey('bags')]" class="text-danger">{{
                  bills[index][getErrorKey('bags')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Dalali Rate:">
                <b-form-input v-model="bills[index].dalali_rate" type="text" placeholder="Enter Dalali Rate"
                  required></b-form-input>
                <small v-if="bills[index][getErrorKey('dalali_rate')]" class="text-danger">{{
                  bills[index][getErrorKey('dalali_rate')]
                }}</small>
              </b-form-group>

              <b-form-group label="Enter Amount:">
                <b-form-input v-model="bills[index].amount" type="text" placeholder="Enter Amount"
                  required></b-form-input>
                <small v-if="bills[index][getErrorKey('amount')]" class="text-danger">{{
                  bills[index][getErrorKey('amount')]
                }}</small>
              </b-form-group>
            </b-form>
          </b-card-body>
          <b-card-footer>
            <b-button variant="danger" :disabled="bills.length === 1" @click="handleRemoveBill(index)">
              Remove This bill</b-button>
          </b-card-footer>
        </b-card>
      </div>
      <div class="mt-4">
        <b-button block variant="primary" :disabled="loading" @click="handleAddNewBill">
          Add New Bill
        </b-button>
        <b-button block variant="success" :disabled="!bills.length || loading" @click="submitBills">
          Submit All Bills
        </b-button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import GrainDropdown from '~/components/GrainDropdown.vue'
import { TOGGLE_PEOPLE_MODAL } from '@/store/peoples/action.types'
export default {
  components: { GrainDropdown },
  data: () => ({
    id: null,
    bills: [],
    selectedFirm: null,
    loading: false,
  }),
  mounted() {
    const { id } = this.$route.params
    if (!id) {
      return this.$router.push('/')
    }
    this.personId = id
    const bills = JSON.parse(localStorage.getItem('bills'))
    if (bills && bills.length) {
      this.bills = bills
    } else {
      const data = this.getEmptyBillData()
      this.bills = [...this.bills, data]
    }
  },
  methods: {
    handleFirmChange(firmId) {
      if (!firmId) {
        return
      }
      this.selectedFirm = firmId
      this.bills = this.bills.map((bill) => {
        return {
          ...bill,
          firm_id: firmId,
        }
      })
    },

    validateNumber(value, isInt = false) {
      return !(Number(value) && (isInt ? parseInt(value) : parseFloat(value)))
    },
    getErrorKey(key) {
      return `error_${key}`
    },
    validateBill(lastBill, lastBillIndex) {
      // eslint-disable-next-line
      const { amount, bags, buyer_id, dalali_rate, date, firm_id, grain_id, packing, seller_id, soda_rate } = lastBill
      let error = ''
      if (!amount || this.validateNumber(amount)) {
        const message = "Please enter valid amount. \n"
        error += message
        lastBill[this.getErrorKey('amount')] = message
      }
      if (!bags || this.validateNumber(bags, true)) {
        const message = "Please enter valid bags. \n"
        error += message
        lastBill[this.getErrorKey('bags')] = message
      }
      // eslint-disable-next-line
      if (!buyer_id) {
        const message = "Please enter Buyer. \n"
        error += message
        lastBill[this.getErrorKey('buyer_id')] = message
      }
      // eslint-disable-next-line
      if (!dalali_rate || this.validateNumber(dalali_rate)) {
        const message = "Please enter valid dalali rate. \n"
        error += message
        lastBill[this.getErrorKey('dalali_rate')] = message
      }
      if (!date) {
        const message = "Please enter date. \n"
        error += message
        lastBill[this.getErrorKey('date')] = message
      }
      // eslint-disable-next-line
      if (!firm_id) {
        const message = "Please enter firm id. \n"
        error += message
        lastBill[this.getErrorKey('firm_id')] = message
      }
      // eslint-disable-next-line
      if (!grain_id) {
        const message = "Please enter grain id. \n"
        error += message
        lastBill[this.getErrorKey('grain_id')] = message
      }
      if (!packing || this.validateNumber(packing)) {
        const message = "Please enter valid packing. \n"
        error += message
        lastBill[this.getErrorKey('packing')] = message
      }
      // eslint-disable-next-line
      if (!seller_id) {
        const message = "Please enter seller id. \n"
        error += message
        lastBill[this.getErrorKey('seller_id')] = message
      }
      // eslint-disable-next-line
      if (!soda_rate || this.validateNumber(soda_rate)) {
        const message = "Please enter valid soda rate. \n"
        error += message
        lastBill[this.getErrorKey('soda_rate')] = message
      }
      return error
    },
    removeErrorFromBill(bill) {
      for (const key in bill) {
        if (key.startsWith('error_')) {
          bill[key] = false
        }
      }
    },
    setBillOnIndex(bill, index) {
      this.bills = this.bills.map((_bill, _index) => {
        if (index === _index) {
          return bill
        }
        return _bill
      })
    },
    handleAddNewBill() {
      const lastBill = this.bills.at(-1)
      const lastBillIndex = this.bills.length - 1
      const error = this.validateBill(lastBill, lastBillIndex)
      if (error) {
        this.bills[lastBillIndex] = lastBill
        this.setBillOnIndex(lastBill, lastBillIndex)
        return
      } else {
        this.removeErrorFromBill(lastBill)
        this.setBillOnIndex(lastBill, lastBillIndex)
      }
      localStorage.setItem('bills', JSON.stringify(this.bills))
      const emptyData = this.getEmptyBillData()
      this.bills = [...this.bills, emptyData]
    },
    getEmptyBillData(isEmpty) {
      const previousBill = this.bills[this.bills.length - 1]
      const payload = {
        bill_id: this.bills.length,
        date: isEmpty
          ? ''
          : previousBill && previousBill.date
            ? previousBill.date
            : '',
        packing: '',
        soda_rate: '',
        bags: '',
        dalali_rate: '',
        amount: '',
        seller_id: isEmpty
          ? ''
          : (previousBill && previousBill.seller_id) || null,
        grain_id: isEmpty
          ? ''
          : (previousBill && previousBill.grain_id) || null,
        buyer_id: this.personId,
        firm_id: this.selectedFirm,
      }
      for (const key in payload) {
        payload[this.getErrorKey(key)] = false
      }
      return payload;
    },
    handleRemoveBill(billIndex) {
      this.bills = this.bills.filter((bill) => bill.bill_id !== billIndex)
    },
    updateSeller(sellerId, index) {
      this.bills[index].seller_id = sellerId
    },
    updateGrain(grainId, index) {
      this.bills[index].grain_id = grainId
    },
    async submitBills() {
      try {
        const error = this.validateBill(this.bills.at(-1))
        if (error) {
          return alert(error)
        }
        const x = confirm('Are you sure you want to submit all bills?')
        if (!x) return
        this.loading = true
        const bills = this.bills.map((bill) => {
          delete bill.bill_id
          return bill
        })
        await axios.post('/api/bills', { bills })
        localStorage.clear('bills')
        const data = this.getEmptyBillData(true)
        this.bills = [data]
      } catch (error) {
        alert('failed to add bills')
      } finally {
        this.loading = false
      }
    },
    openAddPeopleModal() {
      this.$store.dispatch(TOGGLE_PEOPLE_MODAL, false)
    },
  },
}
</script>