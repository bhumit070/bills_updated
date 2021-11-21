const router = require('express').Router();
const { getGrains, addGrain, deleteGrain } = require('../controllers/grains');


router.route('/grains').get(getGrains)

router.route('/grain').post(addGrain)

router.route('/grains/:id').delete(deleteGrain)

module.exports = router;