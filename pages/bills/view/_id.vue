<template>
  <div class="mt-2">
    <div v-if="loading" class="text-center mt-5 pt-5">
      <b-spinner variant="primary" />
    </div>
    <Firms
      v-show="!loading"
      class="mt-2 mb-2 pl-5 hide-print mr-3"
      @firm-changed="handleFirmChange"
    />
    <b-button variant="primary" class="mt-2 mb-2 ml-5 hide-print" :disabled="!bills.length" @click="printBill">Print Bill</b-button>
    <div v-if="!loading && !bills.length && !selectedFirm" class="text-center mt-5 pt-5">
      <h3>Select firm to view Bills.</h3>
    </div>
    <div v-if="!loading && !bills.length && selectedFirm" class="text-center mt-5 pt-5">
      <h3>No bills found</h3>
    </div>
    <div v-if="bills.length && !loading" class="bill-card">
      <b-card class="ml-2 mr-2">
        <b-card-header>
          <div class="float-right pb-3">
            DATE:
            <span v-if="!dateEdit" @click="dateEdit = true">{{ getDate() }}</span>
            <div v-if="dateEdit">
              <b-input v-model="date" type="date"></b-input>
              <b-button @click="dateEdit = false">Select Date</b-button>
            </div>
          </div>
          <table v-if="firm">
            <tr>
              <td>
                <b>FIRM</b>
              </td>
              <td>{{ firm.name }}</td>
            </tr>
            <tr>
              <td>
                <b>ADDRESS</b>
              </td>
              <td>{{ firm.address }}</td>
            </tr>
            <tr>
              <td>
                <b>PAN</b>
              </td>
              <td>{{ firm.pan }}</td>
            </tr>
            <tr>
              <td>
                <b>Bank Account Name</b>
              </td>
              <td>{{ firm.bank_name }}</td>
            </tr>
            <tr>
              <td>
                <b>Bank Account Number</b>
              </td>
              <td>{{ firm.bank_account_number }}</td>
            </tr>
            <tr>
              <td>
                <b>Bank Account IFSC Code</b>
              </td>
              <td>{{ firm.bank_ifsc_code }}</td>
            </tr>
            <tr>
              <td>
                <b>Bill No.</b>
              </td>
              <td>{{ getBillNumber() }}</td>
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
          <div class="text-right">
            Location: 
            <b> 
                {{ bills[0].buyer.place }}
            </b>
          </div>
        </b-card-header>
        <b-card-body v-if="bills && bills.length">
          <b-table :items="bills" :fields="fields" bordered>
            <template #cell(number)="item">
              {{ item.item.number }}
            </template>
            <template #cell(name)="item">{{ item.item.seller && item.item.seller.name }}</template>
            <template #cell(date)="item">{{ getDate(item.item.date) }}</template>
            <template #cell(commodity)="item">{{ item.item.grain.name }}</template>
            <template #cell(action)="item">
              <b-button
                variant="danger"
                :disabled="deleteBillLoading"
                @click.stop="deleteBill(item.item.id)"
              >
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              </b-button>
            </template>
          </b-table>
        </b-card-body>
        <b-card-footer>
          <div class="text-center" style="font-size: 20px">
            <b>Total: {{ totalAmount }}</b>
          </div>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/order
import { GET_FIRM_BY_ID } from '@/store/firms/actions.types'
import axios from 'axios'
import moment from 'moment'
export default {
  data: () => ({
    personId: null,
    loading: false,
    bills: [],
    selectedFirm: null,
    firm: null,
    dateEdit: false,
    deleteBillLoading: false,
    date: `${new Date().getFullYear()}-03-31`,
    fields: [
      'number',
      'date',
      'name',
      'commodity',
      'packing',
      'soda_rate',
      'bags',
      'dalali_rate',
      'amount',
      'action'
    ],
  }),
  computed: {
    totalAmount() {
      return this.bills.reduce((acc, bill) => {
        return acc + bill.amount
      }, 0)
    },
    firms() {
      const firms = this.$store.getters['firms/allFirms']
      if (!firms || !firms.length) {
        return []
      }
      return firms.map((firm) => ({
        text: firm.name,
        value: firm.id,
      }))
    },
    peoples() {
      return this.$store.getters['peoples/getPeoples']
    }
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
    getBillNumber() {
      if(this.peoples && this.peoples.length) {
        const billId = this.bills[0].buyer.id
        const index = this.peoples.findIndex(person => person.id === billId)
        return Number(index) + 1
      } else {
        return 1
      }
    },
    printBill() {
      this.updateDocumentTitle()
      window.print()
    },
    updateDocumentTitle() {
      if(this.bills.length) {
        const firm = this.firms.find(firm => firm.value === this.selectedFirm)
        if(firm) {
          document.title = `${this.bills[0].buyer.name} - ${firm.text}`
        }
      }
    },
    async deleteBill(id) {
      this.deleteBillLoading = true
      try {
        const deleteConfirmation = confirm("Are you sure you want to delete this bill ?")
        if (deleteConfirmation) {
          await axios.delete(`/api/bill/${id}`)
          await this.getBills()
        }
      } catch (error) {
        alert("Failed to delete bill.")
      } finally {
        this.deleteBillLoading = false
      }
    },
    async getBills() {
      try {
        if (!this.personId || !this.selectedFirm) return
        this.bills = []
        this.loading = true
        const { data } = await axios.get(
          `/api/bills/${this.personId}/${this.selectedFirm}`
        )
        if(data.bills && data.bills.length) {
          const isPrint = this.$route.query.print
      
          data.bills = data.bills.map((bill,index) => {
            bill.number = index + 1
            return bill
          })
          this.bills = data.bills
          document.title = this.bills[0].buyer.name
          if(isPrint) {
            setTimeout(() => {
              this.printBill()
            }, 0);
          }
        } else {
          this.bills = data.bills
        }
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
  .table tr td:last-child { display: none !important; }
  .table tr th:last-child { display: none !important; }

}
</style>