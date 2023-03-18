const router = require('express').Router();
const { getBillsByBuyerId, getOneBill, createBills, removeBill, updateBill, getTotalBillAmount } = require('../controllers/bills');


router.route('/bills/:buyerId/:firmId').get(getBillsByBuyerId)
router.route('/bill/:billId').get(getOneBill)

router.route('/bills').post(createBills)

router.route('/bill/:billId').put(updateBill)

router.route('/bill/:billId').delete(removeBill)

router.route('/total-bill-amounts').get(getTotalBillAmount)

module.exports = router;