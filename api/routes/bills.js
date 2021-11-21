const router = require('express').Router();
const { getBillsByBuyerId, getOneBill, createBills, removeBill, updateBill } = require('../controllers/bills');


router.route('/bills/:buyerId/:firmId').get(getBillsByBuyerId)
router.route('/bill/:billId').get(getOneBill)

router.route('/bills').post(createBills)

router.route('/bill/:billId').put(updateBill)

router.route('/bill/:billId').delete(removeBill)


module.exports = router;