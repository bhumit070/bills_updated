<template>
  <div class="mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <Firms
      v-show="!loading"
      class="mt-2 mb-2 w-25 ml-5 pl-5 hide-print"
      @firm-changed="handleFirmChange"
    />
    <b-button variant="primary" class="mt-2 mb-2 ml-5 hide-print">
      Print Bill
    </b-button>
    <div v-if="!loading && !bills.length" class="text-center mt-5 pt-5">
      <h3>No bills found</h3>
    </div>
    <div v-if="bills.length && !loading" class="bill-card">
      <b-card>
        <b-card-header>
          <div class="float-right pb-3">
            DATE:
            <span v-if="!dateEdit" @click="dateEdit = true">
              {{ getDate() }}
            </span>
            <div v-if="dateEdit">
              <b-input v-model="date" type="date"> </b-input>
              <b-button @click="dateEdit = false"> Select Date </b-button>
            </div>
          </div>
          <table v-if="firm">
            <tr>
              <td><b>FIRM</b></td>
              <td>{{ firm.name }}</td>
            </tr>
            <tr>
              <td><b>ADDRESS</b></td>
              <td>{{ firm.address }}</td>
            </tr>
            <tr>
              <td><b>PAN</b></td>
              <td>{{ firm.pan }}</td>
            </tr>
            <tr>
              <td><b>Bank Account Name</b></td>
              <td>{{ firm.bank_name }}</td>
            </tr>
            <tr>
              <td><b>Bank Account Number</b></td>
              <td>{{ firm.bank_account_number }}</td>
            </tr>
            <tr>
              <td><b>Bank Account IFSC Code</b></td>
              <td>{{ firm.bank_ifsc_code }}</td>
            </tr>
          </table>
          <div
            v-if="
              bills && bills.length && bills[0].buyer && bills[0].buyer.name
            "
            class="text-center"
          >
            <h3>{{ bills[0].buyer.name }}</h3>
          </div>
        </b-card-header>
        <b-card-body v-if="bills && bills.length">
          <b-table :items="bills" :fields="fields">
            <template #cell(name)="item">
              {{ item.item.seller.name }}
            </template>
            <template #cell(date)="item">
              {{ getDate(item.item.date) }}
            </template>
            <template #cell(commodity)="item">
              {{ item.item.grain.name }}
            </template>
          </b-table>
        </b-card-body>
        <b-card-footer>
          <div class="text-center" style="font-size: 20px">
            <b> Total: {{ totalAmount }} </b>
          </div>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { GET_FIRM_BY_ID } from '@/store/firms/actions.types'
export default {
  data: () => ({
    personId: null,
    loading: false,
    bills: [],
    selectedFirm: null,
    firm: null,
    dateEdit: false,
    date: `${new Date().getFullYear()}-03-31`,
    fields: [
      'date',
      'name',
      'commodity',
      'packing',
      'soda_rate',
      'bags',
      'dalali_rate',
      'amount',
    ],
  }),
  computed: {
    totalAmount() {
      return this.bills.reduce((acc, bill) => {
        return acc + bill.amount
      }, 0)
    },
  },
  watch: {
    async selectedFirm(newFirm) {
      if (newFirm) {
        await this.getBills()
        await this.getFirmInfo(newFirm)
      }
    },
  },
  async created() {
    const { id } = this.$route.params
    if (!id) {
      return this.$router.push('/')
    }
    this.personId = id
    await this.getBills()
  },

  methods: {
    async getBills() {
      try {
        this.bills = []
        this.loading = true
        const { data } = await axios.get(
          `/api/bills/${this.personId}/${this.selectedFirm}`
        )
        this.bills = data.bills.reverse()
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    handleFirmChange(val) {
      if (!val) {
        return false
      }
      this.selectedFirm = val
    },
    async getFirmInfo(id) {
      const firm = await this.$store.dispatch(GET_FIRM_BY_ID, id)
      this.firm = firm
    },
    getDate(date) {
      if (date) {
        return moment(date).format('DD-MM-YYYY')
      } else {
        return moment(this.date).format('DD-MM-YYYY')
      }
    },
  },
}
</script>

<style>
@media print {
  .hide-print {
    display: none !important;
  }
}
</style>