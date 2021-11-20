const router = require('express').Router();

const { getAllPeople, addPerson, updatePerson, removePerson, getOnePerson } = require('../controllers/people');

router.route('/people').get(getAllPeople);
router.route('/people/:personId').get(getOnePerson)
router.route('/people').post(addPerson)

router.route('/people/:personId').put(updatePerson)

router.route('/people/:personId').delete(removePerson)

module.exports = router;