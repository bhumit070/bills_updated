const router = require('express').Router();
const { getAllFirms, addNewFirm, getOneFirm, removeFirm } = require('../controllers/firm');


router.route('/firms').get(getAllFirms)
router.route('/firm/:firmId').get(getOneFirm)

router.route('/firm').post(addNewFirm)

router.route('/firm/:firmId').delete(removeFirm)

module.exports = router